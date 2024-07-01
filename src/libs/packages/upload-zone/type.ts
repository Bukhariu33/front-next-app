import type { FileWithPath } from '@mantine/dropzone';
import { MIME_TYPES, PDF_MIME_TYPE } from '@mantine/dropzone';

export interface File extends Omit<Attachment, 'key'> {
  key?: string;
  status: 'uploaded' | 'error' | 'uploading';
  error?: string;
  path: string;
  raw: FileWithPath;
}

// file name is unique
export type Files = Record<string, File>;

const DOCS_MIMI_TYPES = [
  ...PDF_MIME_TYPE,
  // ...MS_WORD_MIME_TYPE,
  // ...MS_EXCEL_MIME_TYPE,
  // MIME_TYPES.csv,
];

const ALLOWED_IMAGE_MIME_TYPES = [
  MIME_TYPES.png,
  // MIME_TYPES.webp,
  // MIME_TYPES.avif,
  MIME_TYPES.jpeg,
];

export const ALLOWED_MIME_TYPES = {
  docs: DOCS_MIMI_TYPES,
  images: ALLOWED_IMAGE_MIME_TYPES,
};
