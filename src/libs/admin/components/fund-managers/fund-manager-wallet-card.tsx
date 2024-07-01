import { Loader, Skeleton, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

import InfoCard from '../../../components/Base/Card/info-card';
import SelectInput from '../../../components/Base/inputs/select-input';
import Card from '../../section-card';

type Props = {
  amount: number;
  accountName: string;
  ibanNumber: string;
  options: { value: string; label: string }[];
  onFundChange: (value: string | null) => void;
  onClear: () => void;
  isLoading: boolean;
};

const FundManagerWalletCard = ({
  accountName,
  amount,
  ibanNumber,
  options,
  onFundChange,
  onClear,
  isLoading,
}: Props) => {
  const { t } = useTranslation(['profile', 'admin-common']);

  useEffect(() => {
    if (options?.[0]?.value) onFundChange(options?.[0]?.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  if (!options) {
    return (
      <div className="flex w-full justify-center py-6">
        <Loader size="50px" />
      </div>
    );
  }
  return (
    <Card>
      <SelectInput
        namespace="profile"
        label="selectFundWallet"
        placeholder="selectFundWallet"
        data={options}
        className="w-full sm:w-1/2"
        defaultValue={options?.[0]?.value}
        onChange={v => {
          if (v) {
            onFundChange(v);
            return;
          }
          onClear();
        }}
        isLoading={isLoading}
      />

      {!amount && !accountName && !ibanNumber && !isLoading && (
        <Text className="mt-2 text-xl font-extrabold">
          {t('admin-common:selectFundMessage')}
        </Text>
      )}

      {isLoading ? (
        <div className="flex flex-col gap-2">
          <Skeleton height={120} />
          <div className="grid grid-cols-2 gap-2">
            <Skeleton height={70} />
            <Skeleton height={70} />
          </div>
        </div>
      ) : (
        <>
          {(amount === 0 || amount) && (
            <div className="flex flex-col">
              <h3 className="m-0 text-[28px] font-medium">
                {t('fundWalletCurrentBalance')}
              </h3>
              <p className="m-0 text-[44px] font-bold">
                {amount} <span className="text-2xl font-medium">SAR</span>
              </p>
            </div>
          )}
          <div className="grid grid-cols-2">
            {accountName && (
              <InfoCard
                withCopy
                title={t('fundCollectionAccountName')}
                value={accountName}
                valueClassName="text-brand-primary-main"
              />
            )}
            {ibanNumber && (
              <InfoCard
                withCopy
                title={t('ibanNumber')}
                value={ibanNumber}
                valueClassName="text-brand-primary-main"
              />
            )}
          </div>
        </>
      )}
    </Card>
  );
};

export default FundManagerWalletCard;
