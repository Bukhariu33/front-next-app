import { Card } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import AuthLayout from '@/libs/components/auth/auth-layout';
import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  SelectInvestorType,
  SelectRole,
} from '@/libs/components/auth/select-role';
import Button from '@/libs/components/Base/Buttons/Button';
import { useAuth } from '@/libs/hooks/auth/useAuth';

const SelectRolePage = () => {
  const { t } = useTranslation('auth');
  const { auth, setUserType, resetAuth } = useAuth();
  const [type, setType] = useState<'fundManager' | 'investor' | ''>('');
  const router = useRouter();

  const handleRegister = () => {
    switch (auth?.userType) {
      case 'fundManager':
        return router.push(`/auth/register/fund-manager`);
      case 'individualInvestor':
        return router.push(`/auth/register/individual-investor`);
      default:
        return router.push(`/auth/register/corporate-investor`);
    }
  };

  useEffect(() => {
    resetAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AuthLayout>
      <AuthCard className="flex flex-col justify-center md:h-full">
        <AuthCardHeader>
          <p className="text-2xl font-bold text-black sm:text-3xl ">
            {t('createNewAccount')}
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
          <p className="mb-[20px] flex text-sm sm:text-[28px]">{t('areYou')}</p>
          {type === 'investor' ? (
            <SelectInvestorType />
          ) : (
            <SelectRole setType={setType} />
          )}
        </AuthCardBody>
        <Card.Section className="px-4 py-4 text-center">
          <div className="flex justify-center gap-2 px-4">
            {type === 'investor' ? (
              <Button
                text="back"
                namespace="common"
                className="w-2/5 text-base"
                variant="outlined-black"
                onClick={() => {
                  setUserType(null);
                  setType('');
                }}
              />
            ) : null}

            <Button
              text="createAccount"
              namespace="auth"
              data-cy-button="createAccount"
              className="w-3/5 grow text-base sm:grow-0"
              disabled={!auth?.userType}
              onClick={handleRegister}
            />
          </div>
        </Card.Section>
      </AuthCard>
    </AuthLayout>
  );
};

export default SelectRolePage;
