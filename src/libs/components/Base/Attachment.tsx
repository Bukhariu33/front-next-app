import { Flex, Text } from '@mantine/core';
import type { FC } from 'react';

import DownloadIcon from '@/icons/DownloadIcon';
import ExcelIcon from '@/icons/excel-icon';
import MsWordIcon from '@/icons/ms-word-icon';
import PdfIcon from '@/icons/pdf-icon';

const Attachment: FC<{ name: string; fileSrc: string; fileType: string }> = ({
  name,
  fileSrc,
  fileType,
}) => {
  const renderIcon = () => {
    switch (fileType) {
      case 'application/pdf':
        return <PdfIcon />;
      case 'application/msword':
        return <MsWordIcon />;
      case 'application/vnd.ms-excel':
        return <ExcelIcon />;
      default:
        return null;
    }
  };

  return (
    <Flex className="flex-wrap items-center gap-[19.17px] rounded-[1.2rem] border border-solid border-transparent p-[1.2rem] focus-within:border-brand-primary-main hover:cursor-pointer hover:border-brand-primary-main">
      {renderIcon()}
      <Text className="w-max-content text-[1.4375rem]">{name}</Text>
      <a
        href={fileSrc}
        download
        className="outline-none"
        aria-label="download attachment"
      >
        <DownloadIcon />
      </a>
    </Flex>
  );
};

export default Attachment;
