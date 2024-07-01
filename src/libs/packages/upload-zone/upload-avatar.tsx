import { Box, CloseButton } from '@mantine/core';
import { type FC, useState } from 'react';

import Image from '@/libs/components/Base/Image';
import { cn } from '@/utils/cn';

import UploadZone from './upload-zone';

type ImageAttachment = Pick<
  Attachment,
  'key' | 'name' | 'size' | 'localPath'
> & {
  type: 'image';
};

interface UploadAvatarProps {
  onUploadEnd: (files: ImageAttachment[]) => void;
  modelType?: string;
  className?: string;
  id?: string;
}

const getImageUrl = (key: string) => key;
const UploadAvatar: FC<UploadAvatarProps> = ({
  onUploadEnd,
  className,
  id,
  modelType = 'avatar',
}) => {
  const [uploadedAvatar, setUploadedAvatar] = useState<ImageAttachment>();
  return (
    <Box className={cn('relative overflow-hidden rounded-xl', className)}>
      {uploadedAvatar?.localPath && (
        <CloseButton
          className="absolute right-5 top-5 z-20 bg-white/80 hover:bg-white/90"
          size="lg"
          onClick={() => setUploadedAvatar(undefined)}
        />
      )}
      <div className="relative">
        <UploadZone
          modelType={modelType}
          accept="images"
          id={id}
          hideUploadedFiles
          disabled={!!uploadedAvatar}
          onUploadEnd={files => {
            setUploadedAvatar(files[0] as ImageAttachment);
            onUploadEnd(files as ImageAttachment[]);
          }}
        />
        {uploadedAvatar?.localPath && (
          <Image
            className="z-10 h-full max-w-full bg-white/80 object-cover"
            src={getImageUrl(uploadedAvatar.localPath)}
            alt={uploadedAvatar.name}
            fill
          />
        )}
      </div>
    </Box>
  );
};

export default UploadAvatar;
