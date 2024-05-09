import { useCallback, useContext, useEffect, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import { Captions, Counter, Download, Fullscreen, Zoom } from 'yet-another-react-lightbox/plugins';

import { ApiGen_Mayan_DocumentDetail } from '@/models/api/generated/ApiGen_Mayan_DocumentDetail';
import { ApiGen_Mayan_FilePage } from '@/models/api/generated/ApiGen_Mayan_FilePage';

import { DocumentViewerContext } from './context/DocumentViewerContext';
import { createFileDownload } from './DownloadDocumentButton';
import { useDocumentProvider } from './hooks/useDocumentProvider';

interface LoadedPages extends ApiGen_Mayan_FilePage {
  loadedDocumentImageDataUrl?: string;
}

interface PreviewPageState {
  pages: LoadedPages[];
  document: ApiGen_Mayan_DocumentDetail | null;
}

export const DocumentPreviewContainer: React.FunctionComponent<
  React.PropsWithChildren<unknown>
> = () => {
  const { showDocumentPreview, previewDocumentId, setShowDocumentPreview, setPreviewDocumentId } =
    useContext(DocumentViewerContext);
  const {
    retrieveDocumentDetail,
    downloadDocumentFilePageImage,
    getDocumentFilePageList,
    downloadWrappedDocumentFileLatest,
  } = useDocumentProvider();
  const [documentFilePageState, setDocumentFilePageState] = useState<PreviewPageState>({
    pages: [],
    document: null,
  });
  const [currentPage, setCurrentPage] = useState<number>(0);

  const loadDocumentPageImage = useCallback(
    async (documentId: number, documentFileId: number, documentFilePageId: number) => {
      //todo: handle image failure
      return URL.createObjectURL(
        await downloadDocumentFilePageImage(documentId, documentFileId, documentFilePageId),
      );
    },
    [downloadDocumentFilePageImage],
  );

  const loadPagesForDocumentId = useCallback(async () => {
    const data = await retrieveDocumentDetail(previewDocumentId);
    if (data?.payload?.file_latest) {
      const pages = await getDocumentFilePageList(previewDocumentId, data.payload.file_latest.id);

      //todo: handle various doc failures.
      if (pages?.length > 0) {
        const documentPageImage = await loadDocumentPageImage(
          previewDocumentId,
          data.payload.file_latest.id,
          pages[0].id,
        );
        const lightboxPages = pages.map(page => ({ ...page } as LoadedPages));
        lightboxPages[0].loadedDocumentImageDataUrl = documentPageImage;
        setDocumentFilePageState({
          pages: lightboxPages,
          document: data.payload,
        });
      }
    }
  }, [getDocumentFilePageList, loadDocumentPageImage, previewDocumentId, retrieveDocumentDetail]);

  useEffect(() => {
    if (previewDocumentId) {
      loadPagesForDocumentId();
    }
  }, [previewDocumentId, loadPagesForDocumentId]);

  useEffect(() => {
    const page = documentFilePageState.pages[currentPage + 1];
    // lazy load the next page, but do not replace lazy loaded data.
    if (previewDocumentId && page && !page.loadedDocumentImageDataUrl) {
      loadDocumentPageImage(previewDocumentId, page.document_file_id, page.id).then(imageUrl => {
        page.loadedDocumentImageDataUrl = imageUrl;
      });
    }
  }, [currentPage, documentFilePageState.pages, loadDocumentPageImage, previewDocumentId]);

  return (
    <Lightbox
      index={currentPage}
      open={documentFilePageState.pages.length > 0 && showDocumentPreview}
      slides={documentFilePageState.pages.map((page, index) => ({
        src: page.loadedDocumentImageDataUrl ?? '/public/hourglass-solid.svg',
        alt: page.loadedDocumentImageDataUrl ? `` : 'Loading...',
        description: `Page ${index + 1}/${documentFilePageState.pages.length}`,
      }))}
      animation={{ fade: 500, swipe: 750 }}
      on={{
        view: async ({ index: currentIndex }) => {
          setCurrentPage(currentIndex);
        },

        exited: () => {
          setPreviewDocumentId(null);
          setShowDocumentPreview(false);
          setDocumentFilePageState({
            pages: [],
            document: null,
          });
          setCurrentPage(0);
        },
      }}
      download={{
        download: () => {
          downloadWrappedDocumentFileLatest(previewDocumentId).then(file =>
            createFileDownload(file),
          );
        },
      }}
      plugins={[Captions, Counter, Fullscreen, Zoom, Download]}
    />
  );
};

export default DocumentPreviewContainer;
