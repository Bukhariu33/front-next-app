import { useState } from 'react';

import { type File, type Files } from './type';

function useFileManager({
  onRemove,
}: {
  onRemove: (files: Attachment[]) => void;
}) {
  const [files, setFiles] = useState<Files>({});

  const removeFile = (name: string) => {
    setFiles(prev => {
      const newState = { ...prev };
      delete newState[name];
      const attachments = Object.values(newState).map(file => ({
        key: file.key ?? '',
        name: file.name,
        type: file.type,
        size: file.size,
        localPath: file.path,
      }));
      onRemove(attachments);
      return newState;
    });
  };

  const updateFile = (name: string, updatedFile: Partial<File>) => {
    // this shouldn't exist but typescript is complaining and just in case
    const notFound: File = {
      name: 'Unknown',
      size: 0,
      status: 'error',
      error: 'Unknown error',
      type: 'unknown' as any,
      path: '',
      raw: updatedFile?.raw as any,
    };
    setFiles(prev => ({
      ...prev,
      [name]: {
        ...(prev[name] || notFound),
        ...updatedFile,
      },
    }));
  };

  return {
    files,
    setFiles,
    removeFile,
    updateFile,
  };
}

export default useFileManager;
