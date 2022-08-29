import { Api_File } from 'models/api/File';
import * as React from 'react';
import { useState } from 'react';

export interface ISideBarContext {
  file?: Api_File;
  setFile: (file?: Api_File) => void;
  fileLoading: boolean;
  setFileLoading: (loading: boolean) => void;
}

export const SideBarContext = React.createContext<ISideBarContext>({
  file: undefined,
  setFile: (file?: Api_File) => {
    throw Error('setFile function not defined');
  },
  fileLoading: false,
  setFileLoading: (loading: boolean) => {
    throw Error('setFileLoading function not defined');
  },
});

export const SideBarContextProvider = (props: {
  children: React.ReactChild | React.ReactChild[] | React.ReactNode;
  file?: Api_File;
}) => {
  const [file, setFile] = useState<Api_File | undefined>(props.file);
  const [fileLoading, setFileLoading] = useState<boolean>(false);

  return (
    <SideBarContext.Provider
      value={{
        setFile: setFile,
        file: file,
        setFileLoading: setFileLoading,
        fileLoading: fileLoading,
      }}
    >
      {props.children}
    </SideBarContext.Provider>
  );
};
