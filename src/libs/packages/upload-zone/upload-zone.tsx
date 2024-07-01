import { CloseIcon, List, Stack, Text } from '@mantine/core';
import type { DropzoneProps, FileWithPath } from '@mantine/dropzone';
import { Dropzone } from '@mantine/dropzone';
import { useTranslation } from 'next-i18next';
import { type FC } from 'react';

import MainTitle from '@/libs/components/Base/typography/MainTitle';
import AlertIcon from '@/libs/icons/alert-icon';

import { openInfoModal } from '../modals';
import { handleRejection } from './handle-error-messages';
import { ALLOWED_MIME_TYPES, type Files } from './type';
import UploadIcon from './upload-icon';
import UploadedFile from './uploaded-file';
import useFileManager from './use-file-manager';
import useUploadFiles from './use-upload-files';
import { formatMaxSize, transformFile } from './utils';

interface UploadZoneProps
  extends Omit<DropzoneProps, 'onDrop' | 'onReject' | 'accept' | 'maxSize'> {
  label?: string;
  subLabel?: string;
  onUploadEnd: (files: Attachment[]) => void;
  accept?: 'docs' | 'images';
  maxSizeInMb?: number;
  hideUploadedFiles?: boolean;
  /**
   * the type of the model that the files will be attached to (e.g. 'Bank Account')
   */
  modelType: string;
}

const UploadZone: FC<UploadZoneProps> = ({
  onUploadEnd,
  accept = 'images',
  maxSizeInMb = 1,
  hideUploadedFiles = false,
  id,
  ...props
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
    modelType: props.modelType,
  });

  const onDrop = (files: FileWithPath[]) => {
    const state = files.reduce((acc, file) => {
      acc[file.name] = transformFile(file);
      return acc;
    }, {} as Files);
    setFiles(prev => {
      if (props.multiple) {
        return {
          ...prev,
          ...state,
        };
      }
      return state;
    });
    const filesToUpload = files.map(transformFile);

    uploadFiles(filesToUpload);
  };
  return (
    <Stack>
      <Dropzone
        loading={isUploading}
        onDrop={onDrop}
        id={id}
        className="cursor-pointer"
        onReject={rejectedFiles => {
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
        }}
        maxSize={formatMaxSize(maxSizeInMb)}
        classNames={{
          root: 'border-2 border-dashed border-gray-400 rounded-lg bg-gray-50/50 relative',
        }}
        accept={ALLOWED_MIME_TYPES[accept]}
        {...props}
      >
        <Stack
          style={{ pointerEvents: 'none' }}
          className="flex min-h-[220px] flex-col items-center justify-center gap-4 text-center"
        >
          <Dropzone.Accept>
            <UploadIcon className="text-brand-primary-500" />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <CloseIcon className="h-14 w-14 text-brand-danger" />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <UploadIcon />
          </Dropzone.Idle>

          <div>
            <Text size="xl" className="font-medium text-brand-primary-500">
              {props.label || t('dragAndDropFilesHere')}
            </Text>
            <Text size="sm" c="dimmed" mt={7}>
              {t('clickToBrowse')}
            </Text>
            <Text size="sm" c="dimmed" mt={7}>
              {props.subLabel || `${t('maxFileSize')} ${maxSizeInMb} MB`}
            </Text>
          </div>
        </Stack>
      </Dropzone>

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

export default UploadZone;
