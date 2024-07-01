import { SimpleGrid, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import AvatarIcon from '@/icons/avatar-icon';
import Button from '@/libs/components/Base/Buttons/Button';

const UnAuthorizedFundView = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  return (
    <SimpleGrid className="h-full place-content-center place-items-center gap-[16px]">
      <AvatarIcon />
      <Text className="max-w-[535px] text-center text-xl font-bold leading-[1.4]">
        {t('unAuthorizedFundDetailsText')}
      </Text>
      <Button
        namespace="common"
        text="LoginRegister"
        classNames={{ root: 'w-[391px] mt-[16px]' }}
        onClick={() => router.push('/auth')}
      />
    </SimpleGrid>
  );
};

export default UnAuthorizedFundView;
