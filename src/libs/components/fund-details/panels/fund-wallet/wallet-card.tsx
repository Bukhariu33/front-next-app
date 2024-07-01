import { Loader, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useTranslation } from 'next-i18next';

import Button from '@/libs/components/Base/Buttons/Button';
import useFormatToMoney from '@/libs/hooks/useFormatToMoney';
import useUser from '@/libs/hooks/useUser';

import DepositModal from './deposit-modal';
import classes from './fund-wallet.module.css';
import WithdrawModal from './withdraw-modal';

interface WalletCardProps {
  isLoading: boolean;
  walletDetails: any;
}

const WalletCard = ({ isLoading, walletDetails }: WalletCardProps) => {
  const { t } = useTranslation('fund');
  const { format } = useFormatToMoney();
  const { user } = useUser();
  const userType = user?.type;
  return (
    <div
      className={`flex items-center justify-between ${classes.bgGradient} rounded-2xl px-24 py-12 text-white`}
    >
      <div>
        <Text className="text-[28px] font-medium">{t('currentBalance')}</Text>
        <div>
          {isLoading ? (
            <div className="text-center">
              <Loader size="md" />
            </div>
          ) : (
            <Text className="text-[44px] font-bold">
              {format(walletDetails?.balance ?? 0)}
            </Text>
          )}
        </div>
      </div>
      {userType !== 'admin' ? (
        <div className="flex gap-4">
          <Button
            namespace="fund"
            text="deposit"
            variant="unstyled"
            loading={isLoading}
            className={`px-12 ${classes.button}`}
            onClick={() => {
              modals.open({
                title: t('cashDeposit'),
                classNames: {
                  header:
                    'border-b-2 border-solid border-transparent pb-4 pl-[16px] pr-[11px] border-b-[#D9D9D9] w-full',
                },
                centered: true,
                size: '680px',
                children: walletDetails ? (
                  <DepositModal
                    depositAccountInfo={walletDetails?.depositInfo}
                  />
                ) : null,
              });
            }}
          />
          <Button
            namespace="fund"
            text="withdraw"
            variant="floating-white"
            loading={isLoading}
            className={`border-white bg-transparent ${classes.button}`}
            onClick={() => {
              modals.open({
                title: t('cashWithdraw'),
                classNames: {
                  header:
                    'border-b-2 border-solid border-transparent pb-4 pl-[16px] pr-[11px] border-b-[#D9D9D9] w-full',
                },
                centered: true,
                size: '680px',
                children: walletDetails ? (
                  <WithdrawModal accountInfo={walletDetails.withdrawInfo} />
                ) : null,
              });
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default WalletCard;
