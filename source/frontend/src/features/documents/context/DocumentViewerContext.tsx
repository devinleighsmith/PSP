import { createContext, ReactChild, ReactNode, useState } from 'react';

export interface IDocumentViewerContext {
  setPreviewDocumentId: (documentId: number) => void;
  setShowDocumentPreview: (document: boolean) => void;
  showDocumentPreview: boolean;
  previewDocumentId: number | null;
}

export const DocumentViewerContext = createContext<IDocumentViewerContext>({
  setPreviewDocumentId: () => {
    throw Error('setDisplayModal function not defined');
  },
  setShowDocumentPreview: () => {
    throw Error('setDisplayModal function not defined');
  },
  showDocumentPreview: false,
  previewDocumentId: null,
});

export const DocumentViewerContextProvider = (props: {
  children: ReactChild | ReactChild[] | ReactNode;
}) => {
  const [previewDocumentId, setPreviewDocumentId] = useState<number | null>(null);
  const [showDocumentPreview, setShowDocumentPreview] = useState<boolean>(false);

  return (
    <DocumentViewerContext.Provider
      value={{
        setPreviewDocumentId: setPreviewDocumentId,
        setShowDocumentPreview: setShowDocumentPreview,
        previewDocumentId,
        showDocumentPreview,
      }}
    >
      {props.children}
    </DocumentViewerContext.Provider>
  );
};
