import { Flex, Stack, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import MainTitle from '@/libs/components/Base/typography/MainTitle';
import useUser from '@/libs/hooks/useUser';

export default function WelcomeDisplay() {
  const { t } = useTranslation(['common', 'fund']);
  const { user } = useUser();

  return (
    <Flex className="my-4 flex-col items-center justify-between gap-5 lg:flex-row lg:gap-[100px] xl:my-8">
      <Stack gap="16px">
        {!user ? (
          <MainTitle text={t('startInvestmentJourney')} />
        ) : (
          <MainTitle
            className="capitalize"
            text={`${t('welcomeBack')}, ${user.name}`}
          />
        )}
        <Text className=" opacity-60 ">
          Grow Your Wealth With Our Ads Plans
        </Text>
      </Stack>
    </Flex>
  );
}
