import { Flex, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import AlertIcon from '@/icons/alert-icon';
import ReplaceTranslationKey from '@/libs/components/utils/ReplaceTranslationKey';
import useUser from '@/libs/hooks/useUser';

/**
 * Alert: This component is used to show alert message
 * if user kyc is not completed
 */
function KYCAlert() {
  const { t } = useTranslation('kyc');
  const { user } = useUser();

  const isKycRequired =
    user && ['individualInvestor', 'corporateInvestor'].includes(user?.type);

  if (isKycRequired && !user?.isKycComplete)
    return (
      <Stack
        data-cy="kyc-alert"
        bg="white"
        className="  justify-center  gap-2.5 rounded-lg   p-6 shadow-sm"
      >
        <Text className=" text-base font-medium text-brand-danger">
          {' '}
          {t('alert')}
        </Text>
        <Flex className=" gap-2">
          <AlertIcon size="sm" />
          <ReplaceTranslationKey
            text={t('completeKycAlert')}
            className="xl:w-[564px]"
            values={{
              link: (
                <Link
                  className="font-bold text-black no-underline"
                  href="/investor/kyc/personal-information"
                >
                  {t('clickHereAlert')}
                </Link>
              ),
            }}
          />
        </Flex>
      </Stack>
    );

  return null;
}

export default KYCAlert;
