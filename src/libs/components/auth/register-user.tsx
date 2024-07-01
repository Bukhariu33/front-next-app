// eslint-disable-next-line simple-import-sort/imports
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { axiosInternal } from '@/libs/configs/axios';
import { useMutation } from '@/libs/hooks/use-mutation';
import { useForms } from '@/libs/hooks/useForms';
import UserValidationSchema from '@/libs/validations/NetworkBuxx/register-form-validations';

import Button from '../Base/Buttons/Button';
import Input from '../Base/inputs/input';
import PasswordInput from '../Base/inputs/password-input';
import { AuthCard, AuthCardBody, AuthCardHeader } from './select-role';

const RegisterUser = () => {
  const { t } = useTranslation(['auth', 'common']);
  const router = useRouter();


  const { mutateAsync } = useMutation({
    mutationFn: async (values: any) => {
      const body = {
        ...values,
        referredBy: window.location.href.split('refferalCode=')[1] || null,
      };

      // Log the data being sent to the API
      console.log('Data being sent to API:', body);
      await axiosInternal.post(`/admin/netwrokbux-auth/register`, body)
    },
    onSuccess: () => {
      notifications.show({
        title: 'success',
        message: 'User created successfully',
      });
      router.push('/auth/sign-in');
    },
    onError(error) {
      notifications.show({
        title: 'error',
        message: error.message,
      });
    },
  });

  const initialValues: any = {
    name: '',
    email: '',
    password: '',
    role: 'individualInvestor',
    confirmPassword: '',
  };

  const formik = useForms({
    initialValues,
    validationSchema: UserValidationSchema,
    onSubmit: mutateAsync,
  });

  return (
    <div className="flex h-full w-full justify-center">
      <AuthCard className="flex flex-col justify-center sm:px-12 md:h-full">
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
          <AuthCardHeader>
            <p className="text-2xl font-bold text-black sm:text-3xl ">
              {t('createAccountAsAn')}{' '}
            </p>
            <p className="mt-3 text-sm text-brand-accent-500 sm:text-xl">
              {t('haveAccount')}{' '}
              <Link
                href="/auth/sign-in"
                className="font-medium text-brand-primary-main"
              >
                {t('loginNow')}
              </Link>
            </p>
          </AuthCardHeader>
          <AuthCardBody mb={20}>
            <div className="flex flex-col gap-5 text-sm sm:text-lg">
              <Input
                namespace="auth"
                label="name"
                data-cy-input="name"
                placeholder="enterName"
                {...formik.getFieldProps('name')}
                {...(formik.errors.name &&
                  formik.touched.name && {
                    errorMessage: formik.errors.name as any,
                  })}
              />
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

              <PasswordInput
                namespace="auth"
                label="password"
                data-cy-input="password"
                placeholder="enterPassword"
                {...formik.getFieldProps('password')}
                {...(formik.errors.password &&
                  formik.touched.password && {
                    errorMessage: formik.errors.password as any,
                  })}
              />
              <PasswordInput
                namespace="auth"
                label="confirmPassword"
                data-cy-input="confirmPassword"
                placeholder="reEnterPassword"
                {...formik.getFieldProps('confirmPassword')}
                {...(formik.errors.confirmPassword &&
                  formik.touched.confirmPassword && {
                    errorMessage: formik.errors.confirmPassword as any,
                  })}
              />
            </div>
            <Button
              type="submit"
              namespace="auth"
              loading={formik.isSubmitting}
              disabled={!formik.isValid}
              text="create"
              className="mt-6 w-full text-base"
            />
          </AuthCardBody>
        </form>
      </AuthCard>
    </div>
  );
};

export default RegisterUser;
