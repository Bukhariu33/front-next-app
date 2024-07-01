import { Center } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import useUser from '@/libs/hooks/useUser';
import type { UserType } from '@/libs/types/auth/user';
import type { TranslationKey } from '@/libs/types/utils/withTranslation';

function UserTypeChip() {
  const { user } = useUser();
  const type = (user && user?.type) ?? 'guest';
  const { t } = useTranslation('common');

  const userTypeToTranslation: Record<
    UserType | 'guest',
    TranslationKey<'common'>
  > = {
    admin: 'Admin',
    corporateInvestor: 'CorporateInvestor',
    fundManager: 'FundManager',
    individualInvestor: 'IndividualInvestor',
    guest: 'guest',
  };
  return (
    <Center className="rounded-lg bg-brand-primary-main px-4 py-2.5 font-medium text-white">
      {t(userTypeToTranslation[type as UserType | 'guest'])}
    </Center>
  );
}

export default UserTypeChip;
