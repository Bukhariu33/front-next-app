// eslint-disable-next-line simple-import-sort/imports
import { Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useFormikContext } from 'formik';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useForgetPassword } from '@/libs/atoms/forgetPasswordAtom';
import { axiosInternal } from '@/libs/configs/axios';
import { useMutation } from '@/libs/hooks/use-mutation';
import type { ForgetPasswordSchemaType } from '@/libs/validations/auth-validations/forget-password-validation';

import Button from '../Base/Buttons/Button';
import PasswordInput from '../Base/inputs/password-input';
import {
  AuthCard,
  AuthCardBody,
  AuthCardFooter,
  AuthCardHeader,
} from './select-role';

const ConfirmPassword = () => {
  const { t } = useTranslation('auth');
  const [data, setData] = useForgetPassword();
  const router = useRouter();
  const formik = useFormikContext<ForgetPasswordSchemaType>();

  const { mutate: updatePassword } = useMutation({
    mutationFn: async () => {
      await axiosInternal.put(`/networkbux-reset/update-password`, {
        password: formik.values.password,
        email: data.userData.email,
      });
    },
    onSuccess: () => {
      notifications.show({
        title: 'Update Password',
        message: 'Password Updated Successfully',
      });
      router.push('/auth/sign-in');
    },
  });

  console.log('Here is my data: ', data);
  const submitHandler = () => {
    // setData({ ...data, userData: { ...data.userData, ...formik.values } });
    // formik.handleSubmit();
    updatePassword();
  };

  return (
    <form
      className="flex w-full justify-center sm:h-full"
      onSubmit={formik.handleSubmit}
    >
      <AuthCard className="flex flex-col justify-center pt-8 sm:px-12 md:h-full">
        <AuthCardHeader className="text-center sm:px-14">
          <Text className="pt-4 text-2xl font-bold text-black sm:text-3xl">
            {t('setNewPassword')}
          </Text>
          <p className="mt-3 text-sm text-brand-accent-500 sm:text-xl">
            {t('newPasswordRequirements')}
          </p>
        </AuthCardHeader>
        <AuthCardBody className="mb-4 mt-4 px-4 sm:px-8">
          <div className=" flex flex-col gap-5 text-sm sm:text-lg">
            <PasswordInput
              namespace="auth"
              label="newPassword"
              data-cy-input="newPassword"
              placeholder="enterNewPassword"
              {...formik.getFieldProps('password')}
              {...(formik.errors.password &&
                formik.touched.password && {
                  errorMessage: formik.errors.password as any,
                })}
            />
            <PasswordInput
              namespace="auth"
              label="confirmNewPassword"
              data-cy-input="confirmNewPassword"
              placeholder="reEnterNewPassword"
              {...formik.getFieldProps('confirmPassword')}
              {...(formik.errors.confirmPassword &&
                formik.touched.confirmPassword && {
                  errorMessage: formik.errors.confirmPassword as any,
                })}
            />
          </div>
          <AuthCardFooter>
            <div className="flex w-full flex-col gap-5">
              <Button
                namespace="auth"
                loading={formik.isSubmitting}
                text="passwordReset"
                data-cy-button="reset-password"
                type="button"
                onClick={submitHandler}
              />
              <Text>
                {t('backToPage')}{' '}
                <Link
                  href="/auth/sign-in"
                  onClick={() => {
                    setData({ step: 'forgetPassword' });
                  }}
                  className="font-bold text-brand-primary-main"
                >
                  {t('loginPage')}
                </Link>
              </Text>
            </div>
          </AuthCardFooter>
        </AuthCardBody>
      </AuthCard>
    </form>
  );
};

export default ConfirmPassword;
