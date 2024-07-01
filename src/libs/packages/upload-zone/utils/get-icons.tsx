import { Loader } from '@mantine/core';

import Image from '@/libs/components/Base/Image';
import InputErrorMessage from '@/libs/components/Base/inputs/input-error-message';
import CheckMarkCircleIcon from '@/libs/icons/checkmark-circle-icon';

import { PdfIcon } from '../file-icons';
import type { UploadedFileProps } from '../uploaded-file';

const getFileIcon = (type: UploadedFileProps['type'], path?: string) => {
  switch (type) {
    case 'pdf':
      return <PdfIcon />;
    case 'image':
      return (
        <Image
          alt="image"
          src={path ?? ''}
          width={40}
          height={40}
          className="rounded-lg"
        />
      );
    case 'doc':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="48px"
          height="48px"
        >
          <path
            fill="#2196F3"
            d="M41,10H25v28h16c0.553,0,1-0.447,1-1V11C42,10.447,41.553,10,41,10z"
          />
          <path
            fill="#FFF"
            d="M25 15.001H39V17H25zM25 19H39V21H25zM25 23.001H39V25.001H25zM25 27.001H39V29H25zM25 31H39V33.001H25z"
          />
          <path fill="#0D47A1" d="M27 42L6 38 6 10 27 6z" />
          <path
            fill="#FFF"
            d="M21.167,31.012H18.45l-1.802-8.988c-0.098-0.477-0.155-0.996-0.174-1.576h-0.032c-0.043,0.637-0.11,1.162-0.197,1.576l-1.85,8.988h-2.827l-2.86-14.014h2.675l1.536,9.328c0.062,0.404,0.111,0.938,0.143,1.607h0.042c0.019-0.498,0.098-1.051,0.223-1.645l1.97-9.291h2.622l1.785,9.404c0.062,0.348,0.119,0.846,0.17,1.511h0.031c0.02-0.515,0.073-1.035,0.16-1.563l1.503-9.352h2.468L21.167,31.012z"
          />
        </svg>
      );
    case 'xls':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="48px"
          height="48px"
        >
          <path
            fill="#4CAF50"
            d="M41,10H25v28h16c0.553,0,1-0.447,1-1V11C42,10.447,41.553,10,41,10z"
          />
          <path
            fill="#FFF"
            d="M32 15H39V18H32zM32 25H39V28H32zM32 30H39V33H32zM32 20H39V23H32zM25 15H30V18H25zM25 25H30V28H25zM25 30H30V33H25zM25 20H30V23H25z"
          />
          <path fill="#2E7D32" d="M27 42L6 38 6 10 27 6z" />
          <path
            fill="#FFF"
            d="M19.129,31l-2.411-4.561c-0.092-0.171-0.186-0.483-0.284-0.938h-0.037c-0.046,0.215-0.154,0.541-0.324,0.979L13.652,31H9.895l4.462-7.001L10.274,17h3.837l2.001,4.196c0.156,0.331,0.296,0.725,0.42,1.179h0.04c0.078-0.271,0.224-0.68,0.439-1.22L19.237,17h3.515l-4.199,6.939l4.316,7.059h-3.74V31z"
          />
        </svg>
      );
    default:
      return <div>Unknown</div>;
  }
};

const getStatusIcon = (status: UploadedFileProps['status'], error?: string) => {
  switch (status) {
    case 'uploaded':
      return (
        <CheckMarkCircleIcon className="mt-1 h-5  w-5 fill-brand-success" />
      );
    case 'error':
      return <InputErrorMessage message={error} />;
    case 'uploading':
      return <Loader size="xs" area-label="Uploading" />;
    default:
      return <div>Unknown</div>;
  }
};

export { getFileIcon, getStatusIcon };
