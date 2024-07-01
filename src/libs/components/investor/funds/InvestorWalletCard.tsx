import { Skeleton, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Card from '@/libs/admin/section-card';
import useFormatToMoney from '@/libs/hooks/useFormatToMoney';
import WalletIcon from '@/libs/icons/bank-wallet-icon';
import ChevronIcon from '@/libs/icons/chevron-icon';
import { getWalletDetails } from '@/libs/services/fund-manager/funds/wallet-details';

const InvestorWalletCard = () => {
  const { format } = useFormatToMoney();
  const { t } = useTranslation('common');
  const router = useRouter();
  const { fundId } = router.query as { fundId: string };
  const { data: walletDetails, isLoading } = useQuery(
    getWalletDetails.details(fundId),
  );
  if (isLoading) return <Skeleton className="mb-2" height="20vh" radius="xl" />;
  return (
    <Card className="flex flex-row items-center justify-between gap-4">
      <WalletIcon />

      <div>
        <Text className="text-[18px]">{t('currentBalance')}</Text>
        <Text className="text-[24px] font-bold">
          {walletDetails ? format(walletDetails.balance) : 0}
        </Text>
      </div>

      <Link
        href="/investor/my-wallet"
        className="flex cursor-pointer items-center  justify-center gap-2 rounded bg-[#FFF8E6] px-2  py-2 text-[#000]"
      >
        <Text className=" whitespace-nowrap font-normal ">
          {t('manageWallet')}
        </Text>
        <ChevronIcon className="-rotate-90 stroke-black rtl:rotate-90" />
      </Link>
    </Card>
  );
};

export default InvestorWalletCard;
