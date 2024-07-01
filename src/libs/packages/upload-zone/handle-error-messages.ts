import type { FileRejection } from '@mantine/dropzone';
import type { TFunction } from 'i18next';

import type { TranslationKey } from '@/libs/types/utils/withTranslation';

import { getFileType } from './utils';

enum ErrorCode {
  FileInvalidType = 'file-invalid-type',
  FileTooLarge = 'file-too-large',
  FileTooSmall = 'file-too-small',
  TooManyFiles = 'too-many-files',
}

type ErrorMap = Record<ErrorCode, TranslationKey<'common'>>;

const errorMap: ErrorMap = {
  'file-invalid-type': 'FileInvalidType',
  'file-too-large': 'FileTooLarge',
  'file-too-small': 'FileTooSmall',
  'too-many-files': 'TooManyFiles',
};

const extractFileTypes = (error: string, t: TFunction): string[] => {
  const mimeTypes = error.split('must be')[1];
  if (mimeTypes?.includes(',')) {
    return mimeTypes.split(',').map(type => t(getFileType(type.trim())));
  }

  return mimeTypes ? [t(getFileType(mimeTypes.trim()))] : ['unknown'];
};

export const handleRejection = (
  rejectedFiles: FileRejection[],
  t: TFunction,
) => {
  const errorMessages: {
    fileName: string;
    fileType: string;
    error: string;
  }[] = [];

  rejectedFiles.forEach(rejectedFile => {
    rejectedFile.errors.forEach(error => {
      const extractedFileTypes = extractFileTypes(error.message, t);

      const allowedFileTypes = new Set(extractedFileTypes);

      allowedFileTypes.delete('unknown' as any); // to remove unknown type

      const translatedError = t(errorMap[error.code as ErrorCode], {
        type: allowedFileTypes.size > 0 ? [...allowedFileTypes].join(', ') : '',
      });
      errorMessages.push({
        error: translatedError,
        fileName: rejectedFile.file.name,
        fileType: getFileType(rejectedFile.file.type),
      });
    });
  });

  return errorMessages;
};
