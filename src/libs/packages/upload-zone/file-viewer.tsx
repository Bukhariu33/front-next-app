import { CloseButton, Text } from '@mantine/core';
import type { FC } from 'react';

import { getFileIcon } from './utils';

interface FileViewerProps {
  onRemove: (key: string) => void;
  file: Attachment;
}

const FileViewer: FC<FileViewerProps> = ({
  file: { key, name, type },
  onRemove,
}) => {
  const getImageLink = () => {
    return key;
  };
  return (
    <div className="flex w-full items-center justify-between gap-2 rounded-md border border-solid border-[#BEBEC1] bg-[#FAFAFA] p-4">
      <div className="flex items-center justify-center gap-4">
        {getFileIcon(type, getImageLink())}
        <Text className="max-w-[80px] overflow-hidden  text-ellipsis whitespace-nowrap text-sm font-semibold text-gray-700 sm:max-w-[200px]">
          {name}
        </Text>
      </div>
      <CloseButton
        className="bg-gray-100 text-gray-900
          hover:bg-gray-200 hover:text-gray-700"
        onClick={() => onRemove(key)}
        area-label="Remove"
      />
    </div>
  );
};

export default FileViewer;
