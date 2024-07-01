import { Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import { useForgetPassword } from '@/libs/atoms/forgetPasswordAtom';
import type { FormsProps } from '@/libs/hooks/useForms';

import Button from '../Base/Buttons/Button';
import Input from '../Base/inputs/input';
import PasswordInput from '../Base/inputs/password-input';
import {
  AuthCard,
  AuthCardBody,
  AuthCardFooter,
  AuthCardHeader,
} from './select-role';

interface FormHelpers {
  handleSubmit: string;
  getFieldProps: string;
  errors: string;
  touched: string;
  isValid: string;
  isSubmitting: string;
}

interface SignInFormProps extends Pick<FormsProps, keyof FormHelpers> {}

const SignInCard: FC<SignInFormProps> = ({
  getFieldProps,
  errors,
  touched,
  isValid,
  isSubmitting,
  handleSubmit,
}) => {
  const { t } = useTranslation(['auth', 'error']);
  const router = useRouter();
  const [, setData] = useForgetPassword();
  const isAdmin = router.pathname.startsWith('/admin');

  const forgetPasswordUrl = isAdmin
    ? '/admin/auth/forget-password'
    : '/auth/forget-password';

  return (
    <AuthCard className="flex flex-col justify-center pt-8 sm:px-12 md:h-full">
      <form onSubmit={handleSubmit}>
        <AuthCardHeader>
          <Text className="pt-4 text-2xl font-bold text-black sm:text-3xl">
            {t('signIn')}
          </Text>

          {!isAdmin && (
            <p className="mt-3 text-sm text-brand-accent-500 sm:text-xl">
              {t('noAccount')}{' '}
              <Link
                className="font-bold text-brand-primary-main"
                href="/auth/register/user"
              >
                {t('registerHere')}
              </Link>
            </p>
          )}
        </AuthCardHeader>
        <AuthCardBody className="my-5 px-4 sm:px-8">
          <div className="flex flex-col gap-5 text-sm sm:text-lg">
            <Input
              namespace="auth"
              label="email"
              placeholder="enterEmail"
              type="email"
              data-cy-input="email"
              {...getFieldProps('email')}
              {...(errors.email &&
                touched.email && {
                  errorMessage: errors.email as any,
                })}
            />

            <PasswordInput
              namespace="auth"
              label="password"
              data-cy-input="password"
              placeholder="enterPassword"
              {...getFieldProps('password')}
              {...(errors.password &&
                touched.password && {
                  errorMessage: errors.password as any,
                })}
            />
          </div>
          <AuthCardFooter>
            <div className="flex w-full flex-col gap-5">
              <Button
                namespace="auth"
                disabled={!isValid}
                loading={isSubmitting}
                data-cy-button="login"
                text="login"
                type="submit"
              />
              <Text>
                {t('forgotYour')}{' '}
                <Link
                  href={forgetPasswordUrl}
                  onClick={() => {
                    setData({ step: 'forgetPassword' });
                  }}
                  className="font-bold text-brand-primary-main"
                >
                  {t('passwordQuestion')}
                </Link>
              </Text>
            </div>
          </AuthCardFooter>
        </AuthCardBody>
      </form>
    </AuthCard>
  );
};

export default SignInCard;
