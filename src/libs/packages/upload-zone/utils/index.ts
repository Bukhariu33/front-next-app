import type { FileWithPath } from '@mantine/dropzone';
import { MIME_TYPES } from '@mantine/dropzone';
import type { AxiosError } from 'axios';
import axios from 'axios';

import { axiosInternal } from '@/libs/configs/axios';
import type { APIResponseSignedUrl } from '@/pages/api/media/upload';

import type { File } from '../type';

const getSignedUrl = async (
  file: File,
  modelType: string,
): Promise<APIResponseSignedUrl['data']> => {
  const { data } = await axiosInternal.post<APIResponseSignedUrl>(
    '/media/upload',
    {
      modelType,
      fileName: file.name,
      mimeType: file.raw.type,
      sizeInBytes: file.size,
    },
  );

  return data.data;
};

type GetSignedUrl = (file: File) => Promise<APIResponseSignedUrl['data']>;

const uploadToS3 = async (
  _file: File['raw'],
  s3Payload: APIResponseSignedUrl['data'],
) => {
  const { data } = await axios.postForm(s3Payload.url, {
    ...s3Payload.fields,
    file: _file,
  });
  return data;
};

const uploadFiles = async (
  attachments: File[],
  _getSignedUrl: GetSignedUrl,
  updateFile: (name: string, data: Partial<File>) => void,
) => {
  const uploadedFiles: Attachment[] = [];
  // call upload api to upload file to s3 via signed url
  const upload = async (attachment: File) => {
    try {
      const signUrlPayload = await _getSignedUrl(attachment);
      await uploadToS3(attachment.raw, signUrlPayload);
      updateFile(attachment.name, {
        key: signUrlPayload.fields.key,
        status: 'uploaded',
      });
      uploadedFiles.push({
        key: signUrlPayload.fields.key,
        name: attachment.name,
        type: attachment.type,
        size: attachment.size,
        localPath: attachment.path,
      });
    } catch (err: any) {
      updateFile(attachment.name, {
        status: 'error',
        error: (err as AxiosError<APIError>).response?.data?.message,
        localPath: attachment?.path,
      });
    }
    return attachment;
  };

  await Promise.all(attachments.map(upload));

  return uploadedFiles;
};

export const getFileType = (type: string): File['type'] => {
  switch (type) {
    case MIME_TYPES.pdf:
      return 'pdf';
    case MIME_TYPES.jpeg:
    case MIME_TYPES.png:
    case MIME_TYPES.webp:
    case MIME_TYPES.avif:
      return 'image';
    case MIME_TYPES.csv:
    case MIME_TYPES.xls:
    case MIME_TYPES.xlsx:
      return 'xls';
    case MIME_TYPES.doc:
    case MIME_TYPES.docx:
      return 'doc';
    default:
      return 'unknown' as any;
  }
};
const transformFile = (file: FileWithPath): File => {
  const imageURL = URL.createObjectURL(file);
  return {
    name: file.name,
    status: 'uploading' as const,
    type: getFileType(file.type),
    size: file.size,
    path: imageURL,
    raw: file,
  };
};

const FALLBACK_SIZE = 1024 * 1024 * 10;
const formatMaxSize = (maxSize: number) => {
  return Number.isNaN(Number(maxSize)) ? FALLBACK_SIZE : maxSize * 1024 * 1024;
};

const isValidAttachment = (attachment: any): attachment is Attachment => {
  return (
    attachment?.key !== undefined &&
    attachment?.name !== undefined &&
    attachment?.size !== undefined &&
    attachment?.type !== undefined
  );
};
export * from './get-icons';
export {
  formatMaxSize,
  getSignedUrl,
  isValidAttachment,
  transformFile,
  uploadFiles,
};
