import type { Dispatch, SetStateAction } from 'react';

import { useMutation } from '@/libs/hooks/use-mutation';

import type { File, Files } from './type';
import {
  getSignedUrl as _getSignedUrl,
  uploadFiles as _uploadFiles,
} from './utils';

interface Props {
  onUploadEnd: (files: Attachment[]) => void;
  setFiles: Dispatch<SetStateAction<Files>>;
  updateFile: (name: string, updatedFile: Partial<File>) => void;
  modelType: string;
}

function useUploadFiles({
  onUploadEnd,
  updateFile,
  setFiles,
  modelType,
}: Props) {
  const { mutateAsync: getSignedUrl } = useMutation({
    mutationFn: (file: File) => {
      return _getSignedUrl(file, modelType);
    },
    onError: () => {
      setFiles({});
    },
  });

  const { mutate: uploadFiles, isLoading } = useMutation({
    mutationFn: (files: File[]) => {
      return _uploadFiles(files, getSignedUrl, updateFile);
    },
    onSuccess(uploadResult) {
      onUploadEnd(uploadResult);
    },
    onError: () => {
      setFiles(uploadedF => {
        // otherFiles will be with status 'error'
        const newState = Object.values(uploadedF).reduce((acc, file) => {
          acc[file.name] = {
            ...file,
            status: file.status === 'uploaded' ? 'uploaded' : 'error',
            error: file.status === 'uploaded' ? undefined : file.error,
          };
          return acc;
        }, {} as Files);
        return newState;
      });
    },
  });

  return {
    uploadFiles,
    isUploading: isLoading,
  };
}

export default useUploadFiles;
