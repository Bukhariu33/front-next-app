import { CloseButton, Stack } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { type FC, useState } from 'react';

import Image from '@/libs/components/Base/Image';
import Input from '@/libs/components/Base/inputs/input';
import InputErrorMessage from '@/libs/components/Base/inputs/input-error-message';
import type { FormsProps } from '@/libs/hooks/useForms';
import UploadAvatar from '@/libs/packages/upload-zone/upload-avatar';
import type { FundTeamValidationType } from '@/libs/validations/admin/fund-form-validation';

interface TeamMemberProps
  extends Pick<
    FormsProps<FundTeamValidationType>,
    'getFieldProps' | 'setFieldValue'
  > {
  errors: Record<string, any>;
  touched: Record<string, any>;
  index: number;
  mode?: 'create' | 'edit';
}

const TeamMember: FC<TeamMemberProps> = ({
  index,
  getFieldProps,
  setFieldValue,
  touched,
  errors,
  mode = 'create',
}) => {
  const { t } = useTranslation('error');

  const [localUpload, setLocalUpload] = useState<string>();
  const [showUpload, setShowUpload] = useState<boolean>(false);

  return (
    <div className="flex flex-col-reverse items-center justify-between gap-4 lg:flex-row">
      <Stack className="w-full flex-grow lg:max-w-[450px]">
        <Input
          label="boardMemberName"
          namespace="fund"
          placeholder="enterBoardName"
          {...getFieldProps(`fundTeam.${index}.name`)}
          errorMessage={
            touched?.team?.[index]?.name && errors?.team?.[index]?.name
          }
        />
        <Input
          label="position"
          namespace="fund"
          placeholder="enterPosition"
          {...getFieldProps(`fundTeam.${index}.position`)}
          errorMessage={
            touched?.team?.[index]?.position && errors?.team?.[index]?.position
          }
        />
      </Stack>
      <Stack className="relative w-full gap-[8px] lg:max-w-[250px] lg:self-end">
        {mode === 'edit' && !showUpload ? (
          <div className="relative h-[250px]  w-full">
            <CloseButton
              className="absolute right-5 top-5 z-20 bg-white/80 hover:bg-white/90"
              size="md"
              onClick={() => setShowUpload(true)}
            />
            <Image
              src={
                localUpload ||
                (getFieldProps(`fundTeam.${index}.image`).value as string)
              }
              fill
              alt="avatar"
            />
          </div>
        ) : (
          <UploadAvatar
            id="avatar"
            onUploadEnd={([file]) => {
              setLocalUpload(file?.localPath ?? '');
              setShowUpload(false);
              return setFieldValue(`fundTeam.${index}.image`, file?.key);
            }}
          />
        )}
        <InputErrorMessage
          message={t(
            touched?.team?.[index]?.image && errors?.team?.[index]?.image?.name,
          )}
        />
      </Stack>
    </div>
  );
};

export default TeamMember;
