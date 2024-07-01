import { Stack } from '@mantine/core';
import { useFormikContext } from 'formik';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import InputErrorMessage from '@/libs/components/Base/inputs/input-error-message';
import FileViewer from '@/libs/packages/upload-zone/file-viewer';
import UploadButton from '@/libs/packages/upload-zone/upload-files-button';
import { isValidAttachment } from '@/libs/packages/upload-zone/utils';
import type { FrequentPayoutFundsValidationType } from '@/libs/validations/admin/fund-form-validation';

import Card from './Card';

const FundAttachments: FC<{
  mode?: 'create' | 'edit';
}> = ({ mode = 'create' }) => {
  const { t } = useTranslation(['error', 'common', 'fund']);
  const { setFieldValue, touched, errors, values } =
    useFormikContext<FrequentPayoutFundsValidationType>();

  const errorMessage =
    touched?.attachments && errors?.attachments
      ? errors?.attachments
      : undefined;
  return (
    <Card title="fundAttachments">
      <Stack className="gap-[8px]">
        <UploadButton
          modelType="fundAttachments"
          id="fundAttachments"
          accept="docs"
          onUploadEnd={files => {
            return setFieldValue('attachments', [
              ...(Array.isArray(values.attachments) ? values.attachments : []),
              ...files,
            ]);
          }}
          maxSizeInMb={10}
          hideUploadedFiles={mode === 'edit'}
        />
        {mode === 'edit' &&
          values.attachments?.map(
            file =>
              isValidAttachment(file) && (
                <FileViewer
                  file={file}
                  key={file.key}
                  onRemove={key => {
                    const attachments = values.attachments?.filter(
                      attachment => attachment.key !== key,
                    );
                    setFieldValue('attachments', attachments);
                  }}
                />
              ),
          )}
        <InputErrorMessage
          message={t(errorMessage as any, {
            ns: ['error', 'common', 'fund'],
          })}
        />
      </Stack>
    </Card>
  );
};

export default FundAttachments;
