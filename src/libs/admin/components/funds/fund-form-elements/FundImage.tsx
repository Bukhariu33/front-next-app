import { Stack, Text } from '@mantine/core';
import { useFormikContext } from 'formik';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import InputErrorMessage from '@/libs/components/Base/inputs/input-error-message';
import SelectInput from '@/libs/components/Base/inputs/select-input';
import useAdminSettings from '@/libs/hooks/useAdminSettings';
import FileViewer from '@/libs/packages/upload-zone/file-viewer';
import UploadZone from '@/libs/packages/upload-zone/upload-zone';
import type { FrequentPayoutFundsValidationType } from '@/libs/validations/admin/fund-form-validation';

import Card from './Card';

const FundImage: FC<{
  mode?: 'create' | 'edit';
}> = ({ mode = 'create' }) => {
  const { t } = useTranslation(['error', 'common', 'fund']);
  const { data: settings, isLoading } = useAdminSettings();
  const { setFieldValue, getFieldProps, touched, errors, values } =
    useFormikContext<FrequentPayoutFundsValidationType>();

  if (!settings) return null;

  return (
    <Card title="fundImage">
      <Stack className="gap-[1.88rem]">
        <SelectInput
          namespace="fund"
          data-cy-input="fundImageDimension"
          label="chooseImageDimension"
          placeholder="chooseImageDimension"
          isLoading={isLoading}
          data={settings?.imageDimensionOptions}
          {...getFieldProps('imageDimension')}
          onChange={value => {
            return setFieldValue('imageDimension', value);
          }}
          errorMessage={
            touched?.imageDimension && errors?.imageDimension
              ? errors?.imageDimension
              : undefined
          }
        />
        <Stack className="gap-[8px]">
          <Text className="text-lg font-medium leading-[1.33333]">
            {t('common:uploadFile')}
          </Text>
          <UploadZone
            modelType="fundImages"
            accept="images"
            multiple
            label={t('common:uploadYourImageHere')}
            hideUploadedFiles={mode === 'edit'}
            onUploadEnd={files => {
              return setFieldValue(
                'fundImages',
                files.map(file => file.key),
              );
            }}
            id="fundImages"
          />
        </Stack>
        <InputErrorMessage
          message={t(touched?.fundImages && (errors.fundImages as any), {
            ns: ['error', 'common', 'fund'],
          })}
        />
        {mode === 'edit' &&
          values.fundImages?.map((key, i) => (
            <FileViewer
              file={{
                key: key ?? '',
                name: `Fund's Image ${i + 1}`,
                size: 0,
                type: 'image',
              }}
              key={key}
              onRemove={removedKey => {
                const fundImages = values.fundImages?.filter(
                  k => k !== removedKey,
                );
                setFieldValue('fundImages', fundImages);
              }}
            />
          ))}
      </Stack>
    </Card>
  );
};

export default FundImage;
