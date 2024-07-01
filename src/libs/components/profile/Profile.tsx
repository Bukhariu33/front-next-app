import { Flex, Stack } from '@mantine/core';
import { FormikProvider } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import Button from '@/libs/components/Base/Buttons/Button';
import ChangePassword from '@/libs/components/profile/ChangePassword';
import { PersonalInformation } from '@/libs/components/profile/PersonalInformation';
import { ProfileLayout } from '@/libs/components/profile/ProfileLayout';
import { axiosInternal } from '@/libs/configs/axios';
import { useMutation } from '@/libs/hooks/use-mutation';
import { useForms } from '@/libs/hooks/useForms';
import type { UserType } from '@/libs/types/auth';
import type { Profile as ProfileType } from '@/libs/types/profile';
import type { UpdateProfileSchemaType } from '@/libs/validations/profile';
import { UpdateProfileSchema } from '@/libs/validations/profile';

import ProfileSkeleton from './ProfileSkeleton';

type ProfileProps = {
  isEditable?: boolean;
  profile?: ProfileType;
  userType?: UserType;
  isLoading?: boolean;
};

const Profile: FC<ProfileProps> = ({
  isEditable,
  profile,
  userType,
  isLoading,
}) => {
  const router = useRouter();
  const inputPlaceholder = '';
  const isCorp = userType === 'corporateInvestor' || userType === 'fundManager';
  const initialValues: UpdateProfileSchemaType = isCorp
    ? ({
        fullName: profile?.fullName ?? inputPlaceholder,
        jobTitle: profile?.jobTitle ?? inputPlaceholder,
        phoneNumber: profile?.mobile ?? inputPlaceholder,
        gender: profile?.gender ?? inputPlaceholder,
        oldPassword: inputPlaceholder,
        password: inputPlaceholder,
        confirmPassword: inputPlaceholder,
      } as any as UpdateProfileSchemaType)
    : ({
        oldPassword: inputPlaceholder,
        password: inputPlaceholder,
        confirmPassword: inputPlaceholder,
      } as any as UpdateProfileSchemaType);
  const { mutateAsync } = useMutation({
    mutationFn: async (values: UpdateProfileSchemaType) => {
      if (!isEditable) return;
      const apiUrl =
        userType === 'fundManager'
          ? '/fund-manager/profile'
          : '/investor/profile';

      const keys = Object.keys(values) as (keyof UpdateProfileSchemaType)[];
      const updatedFields: Record<string, any> = {};
      for (const key of keys) {
        if (
          JSON.stringify(initialValues?.[key]) !== JSON.stringify(values?.[key])
        ) {
          updatedFields[key] = values[key];
        }
      }
      await axiosInternal.put(apiUrl, updatedFields);
    },
    onSuccess() {
      router.push(router.pathname.replace('/edit', ''));
    },
  });

  const formik = useForms({
    initialValues,
    validationSchema: !isCorp
      ? UpdateProfileSchema.pick(['oldPassword', 'password', 'confirmPassword'])
      : UpdateProfileSchema,
    enableReinitialize: true,
    onSubmit: mutateAsync,
  });

  if (isLoading)
    return <ProfileSkeleton userType={userType} isEditable={isEditable} />;

  const editCooperateInvestorProfile = <ChangePassword />;

  const editIndividualProfile = <ChangePassword />;

  const editFormActions = (
    <Flex className="mt-[60px] justify-end gap-[20px] max-sm:flex-wrap">
      <Link
        href={`${router.pathname.replace('/edit', '')}`}
        className="w-[min(100%,171px)] max-sm:w-full"
      >
        <Button
          variant="outlined-black"
          namespace="common"
          text="cancel"
          fullWidth
        />
      </Link>
      <Button
        namespace="common"
        text="SaveChanges"
        fullWidth
        classNames={{ root: 'w-[min(100%,376px)] max-sm:w-full' }}
        type="submit"
        disabled={!formik.dirty}
      />
    </Flex>
  );

  if (userType === 'admin') return null;

  if (!profile) return null;

  return (
    <ProfileLayout>
      {isEditable ? (
        <form onSubmit={formik.handleSubmit} className="space-y-10">
          <FormikProvider value={formik}>
            {isCorp && editCooperateInvestorProfile}
            {userType === 'individualInvestor' && editIndividualProfile}
            {editFormActions}
          </FormikProvider>
        </form>
      ) : (
        <Stack gap="50px">
          {profile && <PersonalInformation {...profile} />}
          <Flex className="mt-[60px] ltr:justify-end">
            <Link
              href={`${router.pathname}/edit`}
              className="w-[min(100%,376px)]"
            >
              <Button namespace="profile" text="editInfo" fullWidth />
            </Link>
          </Flex>
        </Stack>
      )}
    </ProfileLayout>
  );
};

export default Profile;
