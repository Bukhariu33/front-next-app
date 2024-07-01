import { SimpleGrid } from '@mantine/core';
import { useFormikContext } from 'formik';
import { useEffect, useRef } from 'react';

import PasswordInput from '@/libs/components/Base/inputs/password-input';
import { ProfileSectionLayout } from '@/libs/components/profile/ProfileSectionLayout';
import type { UpdateProfileSchemaType } from '@/libs/validations/profile';

export default function ChangePassword() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const formik = useFormikContext<UpdateProfileSchemaType>();

  // scrolling to the form
  useEffect(() => {
    const section = sectionRef.current;
    if (section)
      window.scrollTo({
        top: section.offsetTop,
      });
  }, [sectionRef]);

  return (
    <ProfileSectionLayout
      title="ChangeYourPassword"
      className="mt-[60px] gap-[30px]"
    >
      <SimpleGrid className="gap-[30px]" ref={sectionRef}>
        <PasswordInput
          namespace="auth"
          label="oldPassword"
          placeholder="enterOldPassword"
          type="password"
          {...formik.getFieldProps('oldPassword')}
          errorMessage={
            (formik.touched?.oldPassword &&
              formik.errors?.oldPassword) as string
          }
        />
        <SimpleGrid className="grid-cols-2 gap-[30px] max-sm:grid-cols-1">
          <PasswordInput
            namespace="auth"
            label="newPassword"
            placeholder="enterNewPassword"
            type="password"
            {...formik.getFieldProps('password')}
            errorMessage={
              (formik.touched?.password && formik.errors?.password) as string
            }
          />
          <PasswordInput
            namespace="auth"
            label="confirmNewPassword"
            placeholder="reEnterPassword"
            type="password"
            {...formik.getFieldProps('confirmPassword')}
            errorMessage={
              (formik.touched?.confirmPassword &&
                formik.errors?.confirmPassword) as string
            }
          />
        </SimpleGrid>
      </SimpleGrid>
    </ProfileSectionLayout>
  );
}
