import { TableSort } from 'components/Table/TableSort';
import { FileTypes } from 'constants/fileTypes';
import { defaultFormFilter, IFormFilter } from 'interfaces/IFormResults';
import orderBy from 'lodash/orderBy';
import { Api_FileForm } from 'models/api/Form';
import React, { useCallback, useContext } from 'react';

import { SideBarContext } from '../../context/sidebarContext';
import { useFormRepository } from '../hooks/useFormRepository';
import { IFormListViewProps } from './FormListView';

export interface IFormListViewContainerProps {
  fileId: number;
  defaultFilters?: IFormFilter;
  fileType: FileTypes;
  View: React.FunctionComponent<React.PropsWithChildren<IFormListViewProps>>;
}

/**
 * Page that displays template forms.
 */
export const FormListViewContainer: React.FunctionComponent<
  React.PropsWithChildren<IFormListViewContainerProps>
> = ({ fileId, defaultFilters, fileType, View }: IFormListViewContainerProps) => {
  const {
    addFileForm: { execute: addForm },
    getFileForms: { execute: getFileForms, response: forms },
    deleteFileForm: { execute: deleteForm },
  } = useFormRepository();
  const [formFilter, setFormFilter] = React.useState<IFormFilter>(defaultFormFilter);
  const [sort, setSort] = React.useState<TableSort<Api_FileForm>>({});
  const { staleFile, setStaleFile } = useContext(SideBarContext);

  const fetchData = useCallback(async () => {
    await getFileForms(fileType, fileId);
  }, [getFileForms, fileId, fileType]);

  React.useEffect(() => {
    if (forms === undefined || staleFile) {
      fetchData();
      setStaleFile(false);
    }
  }, [fetchData, staleFile, setStaleFile, forms]);

  const sortedFilteredForms = React.useMemo(() => {
    if (!!forms && forms?.length > 0) {
      let formItems = [...forms];

      if (formFilter) {
        formItems = formItems.filter(form => {
          return !formFilter.formTypeId || form.formTypeCode?.id === formFilter.formTypeId;
        });
      }
      if (sort) {
        const sortFields = Object.keys(sort);
        if (sortFields?.length > 0) {
          const keyName = sortFields[0] as keyof Api_FileForm;
          const sortDirection = sort[keyName];

          let sortBy: string;
          switch (keyName) {
            case 'formTypeCode':
              sortBy = 'formTypeCode.name';
              break;

            default:
              sortBy = keyName;
              break;
          }

          return orderBy(formItems, sortBy, sortDirection);
        }
      }
      return formItems;
    }

    return [];
  }, [forms, sort, formFilter]);

  const saveForm = async (formTypeId: string) => {
    const fileForm: Api_FileForm = {
      id: null,
      fileId: fileId,
      formTypeCode: {
        id: formTypeId,
        name: null,
      },
    };
    await addForm(FileTypes.Acquisition, fileForm);
    setStaleFile(true);
  };
  return (
    <View
      saveForm={saveForm}
      sort={sort}
      setSort={setSort}
      formFilter={formFilter}
      setFormFilter={setFormFilter}
      forms={sortedFilteredForms ?? []}
      onDelete={async (fileFormId: number) => {
        await deleteForm(FileTypes.Acquisition, fileFormId);
        setStaleFile(true);
      }}
    />
  );
};

export default FormListViewContainer;
