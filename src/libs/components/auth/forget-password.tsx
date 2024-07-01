// eslint-disable-next-line simple-import-sort/imports
import { Text } from '@mantine/core';
import { useFormikContext } from 'formik';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { useForgetPassword } from '@/libs/atoms/forgetPasswordAtom';
import { axiosInternal } from '@/libs/configs/axios';
import { useMutation } from '@/libs/hooks/use-mutation';

import Button from '../Base/Buttons/Button';
import Input from '../Base/inputs/input';
import {
  AuthCard,
  AuthCardBody,
  AuthCardFooter,
  AuthCardHeader,
} from './select-role';

const ForgetPassword = () => {

  const { t } = useTranslation('auth');
  const [data, setData] = useForgetPassword();

  const formik = useFormikContext<any>();

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      await axiosInternal.post(`/networkbux-reset`, {
        email: formik.values.email,
      });
    },
    onSuccess: () => {
      setData({
        userData: { ...data.userData, ...formik.values },
        step: 'verify',
      });
    },
  });

  // const { mutateAsync } = useMutation({
  //   mutationFn: sendOTP,
  //   onSuccess: () => {
  //     setData({
  //       userData: { ...data.userData, ...formik.values },
  //       step: 'verify',
  //     });
  //   },
  // });

  const submitHandler = async () => {
    mutateAsync();
  };

  return (
    <form
      className="flex w-full justify-center sm:h-full"
      onSubmit={formik.handleSubmit}
    >
     
      <AuthCard className="flex flex-col justify-center pt-8 sm:px-12 md:h-full">
        <AuthCardHeader className="text-center sm:px-14">
          <Text className="pt-4 text-2xl font-bold text-black sm:text-3xl">
            {t('forgotYourPassword')}
          </Text>
          <p className="mt-3 px-4 text-sm text-brand-accent-500 sm:text-xl">
            {t('resetPasswordMessage')}
          </p>
        </AuthCardHeader>
        <AuthCardBody className="my-8 px-4 sm:px-8">
          <div className="flex flex-col gap-5 text-sm sm:mb-4 sm:text-lg">
            {/* <PhoneNumberInput
              namespace="auth"
              label="phoneNumber"
              placeholder="phoneNumberFormat"
              name="mobile"
              data-cy-input="mobile"
              onChange={value => {
                formik.setFieldValue('mobile', value);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.mobile}
              {...(formik.errors.mobile &&
                formik.touched.mobile && {
                  errorMessage: formik.errors.mobile as any,
                })}
            /> */}

            <Input
              namespace="auth"
              label="email"
              data-cy-input="email"
              placeholder="enterEmail"
              type="email"
              {...formik.getFieldProps('email')}
              {...(formik.errors.email &&
                formik.touched.email && {
                  errorMessage: formik.errors.email as any,
                })}
            />
          </div>
          <AuthCardFooter>
            <div className="flex w-full flex-col gap-5">
              <Button
                namespace="auth"
                loading={formik.isSubmitting}
                onClick={submitHandler}
                data-cy-button="send-otp"
                text="send"
                type="button"
              />
              <Text>
                {t('backToPage')}{' '}
                <Link
                  href="/auth/sign-in"
                  onClick={() => {
                    setData({ step: 'forgetPassword' });
                  }}
                  className="font-medium text-brand-primary-main"
                >
                  {t('loginNow')}
                </Link>
              </Text>
            </div>
          </AuthCardFooter>
        </AuthCardBody>
      </AuthCard>
    </form>
  );
};

export default ForgetPassword;
