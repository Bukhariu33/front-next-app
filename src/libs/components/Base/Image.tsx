import type { ImageProps } from 'next/image';
import NextImage from 'next/image';
import type { FC } from 'react';
import { string } from 'yup';

import { cn } from '@/utils/cn';

const isUrl = string().url();

const isPublicFolderUrl = (url: string) => url?.startsWith('/');
const isLocalUrl = (url: string) => url?.startsWith('blob:');

const Image: FC<ImageProps> = props => {
  const { src } = props;
  const url =
    isUrl.isValidSync(src as string) ||
    isPublicFolderUrl(src as string) ||
    isLocalUrl(src as string)
      ? src
      : '/images/placeholder.png';

  const isFallback = url === '/images/placeholder.png';
  return (
    <NextImage
      {...props}
      src={url}
      className={cn({
        'object-cover': isFallback,
      })}
    />
  );
};

export default Image;
