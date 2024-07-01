import { CloseButton, Text } from '@mantine/core';
import type { FC } from 'react';

import { cn } from '@/utils/cn';

import type { File } from './type';
import { getFileIcon, getStatusIcon } from './utils';

export interface UploadedFileProps extends File {
  status: 'uploaded' | 'error' | 'uploading';
  onRemove: (key: string) => void;
  error?: string;
}

const UploadedFile: FC<UploadedFileProps> = ({
  name,
  status,
  type,
  onRemove,
  error,
  path,
}) => {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-between gap-2 rounded-md border border-solid border-[#BEBEC1] bg-[#FAFAFA] p-4',
        {
          'border-[#F9A8A8] bg-[#FDE8E8]': status === 'error',
        },
      )}
    >
      <div className="flex items-center justify-center gap-4">
        {getFileIcon(type, path)}
        <Text className="max-w-[80px] overflow-hidden  text-ellipsis whitespace-nowrap text-sm font-semibold text-gray-700 sm:max-w-[200px]">
          {name}
        </Text>

        <div>{getStatusIcon(status, error)}</div>
      </div>
      <CloseButton
        className="bg-gray-100 text-gray-900
          hover:bg-gray-200 hover:text-gray-700"
        onClick={() => onRemove(name)}
        area-label="Remove"
      />
    </div>
  );
};

export default UploadedFile;
