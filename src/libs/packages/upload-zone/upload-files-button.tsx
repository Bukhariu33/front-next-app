import { FileButton, List, Stack, Text } from '@mantine/core';
import type { FileRejection, FileWithPath } from '@mantine/dropzone';
import { useTranslation } from 'next-i18next';
import { type FC } from 'react';

import Button from '@/libs/components/Base/Buttons/Button';
import MainTitle from '@/libs/components/Base/typography/MainTitle';
import AlertIcon from '@/libs/icons/alert-icon';
import AttachIcon from '@/libs/icons/attach-icon';
import { cn } from '@/utils/cn';

import { openInfoModal } from '../modals';
import classes from './button.module.css';
import { handleRejection } from './handle-error-messages';
import { ALLOWED_MIME_TYPES, type Files } from './type';
import UploadedFile from './uploaded-file';
import useFileManager from './use-file-manager';
import useUploadFiles from './use-upload-files';
import { formatMaxSize, transformFile } from './utils';

interface UploadButtonProps {
  onUploadEnd: (files: Attachment[]) => void;
  modelType: string;
  accept?: 'docs' | 'images';
  maxSizeInMb?: number;
  multiple?: boolean;
  classNames?: {
    wrapper?: string;
    button?: string;
    resetButton?: string;
  };
  id?: string;
  hideUploadedFiles?: boolean;
}

const UploadButton: FC<UploadButtonProps> = ({
  onUploadEnd,
  accept = 'images',
  maxSizeInMb = 1,
  multiple = true,
  classNames,
  id,
  hideUploadedFiles = false,
  modelType,
}) => {
  const {
    removeFile,
    setFiles,
    updateFile,
    files: uploadedFiles,
  } = useFileManager({
    onRemove: onUploadEnd,
  });
  const { t } = useTranslation();

  const { isUploading, uploadFiles } = useUploadFiles({
    onUploadEnd,
    setFiles,
    updateFile,
    modelType,
  });
  const validateFiles = (file: FileWithPath[]) => {
    const rejectedFiles: FileRejection[] = [];
    const acceptedFiles: FileWithPath[] = [];
    file.forEach(f => {
      if (f.size <= formatMaxSize(maxSizeInMb)) {
        acceptedFiles.push(f);
      } else {
        rejectedFiles.push({
          file: f,
          errors: [
            {
              code: 'file-too-large',
              message: '',
            },
          ],
        });
      }
    });

    return { acceptedFiles, rejectedFiles };
  };

  const handleInvalidFiles = (rejectedFiles: FileRejection[]) => {
    const errors = handleRejection(rejectedFiles, t);
    const messages = [...new Set(errors.map(error => error.error))];
    openInfoModal({
      id: 'upload-zone-error',
      namespace: 'common',
      body: '' as any,
      children: (
        <List>
          {messages.map(message => (
            <List.Item
              icon={<AlertIcon />}
              className="text-sm font-medium text-brand-danger"
              key={message}
            >
              {message}
            </List.Item>
          ))}
        </List>
      ),
    });
  };

  const onDrop = (_files: FileWithPath[]) => {
    const { acceptedFiles, rejectedFiles } = validateFiles(_files);
    if (rejectedFiles.length > 0) {
      return handleInvalidFiles(rejectedFiles);
    }

    const state = acceptedFiles.reduce((acc, file) => {
      acc[file.name] = transformFile(file);

      return acc;
    }, {} as Files);
    setFiles(prev => {
      if (multiple) {
        return {
          ...prev,
          ...state,
        };
      }
      return state;
    });
    const filesToUpload = acceptedFiles.map(transformFile);

    return uploadFiles(filesToUpload);
  };

  return (
    <Stack>
      <FileButton
        onChange={onDrop}
        accept={ALLOWED_MIME_TYPES[accept] as any}
        multiple
        inputProps={id ? { id } : undefined}
      >
        {props => (
          <div className={cn('flex  items-center gap-4 ', classNames?.wrapper)}>
            <Button
              {...props}
              loading={isUploading}
              namespace="common"
              text="uploadFile"
              variant="unstyled"
              className={cn(
                `w-[350px] ${classes.buttonUpload} text-left placeholder:text-left`,
                classNames?.button,
              )}
              classNames={{
                inner: 'text-left',
                label: 'text-left w-full text-brand-accent-500',
              }}
              rightSection={<AttachIcon />}
            />
          </div>
        )}
      </FileButton>
      {!hideUploadedFiles && (
        <>
          <MainTitle
            order={3}
            text={t('uploadedFiles')}
            className="text-lg text-brand-accent-500 lg:text-xl xl:text-2xl"
          />
          <Stack>
            {Object.values(uploadedFiles).map(f => (
              <UploadedFile
                key={f.key || f.name}
                {...f}
                onRemove={removeFile}
              />
            ))}
            {Object.values(uploadedFiles).length === 0 && (
              <Text size="sm" c="dimmed" mt={7}>
                {t('noUploadedFiles')}
              </Text>
            )}
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default UploadButton;
