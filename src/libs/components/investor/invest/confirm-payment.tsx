import { Flex, Text, TextInput } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import React from 'react';

import Card from '@/libs/admin/section-card';
import { env } from '@/libs/Env.mjs';
import useFormatToMoney from '@/libs/hooks/useFormatToMoney';
import WalletIcon from '@/libs/icons/bank-wallet-icon';
import { getWalletDetails } from '@/libs/services/fund-manager/funds/wallet-details';
import type { BaseFund } from '@/libs/types/interface/fund/base';

import Button from '../../Base/Buttons/Button';
import Input from '../../Base/inputs/input';
import MainTitle from '../../Base/typography/MainTitle';

interface ConfirmPaymentProps {
  onSubmit: () => void;
  fund: BaseFund;
  count: number;
}

const ConfirmPayment: React.FC<ConfirmPaymentProps> = ({
  onSubmit,
  fund,
  count,
}: ConfirmPaymentProps) => {
  const { t } = useTranslation('common');
  const { format } = useFormatToMoney();

  const totalUnitsPrice = fund.unitPrice * count;
  const subscriptionFees = fund.fees.subscription * totalUnitsPrice;
  const vat = env.NEXT_PUBLIC_VAT_PERCENTAGE * subscriptionFees;
  const total = totalUnitsPrice + subscriptionFees + vat;
  const { data: walletDetails } = useQuery(getWalletDetails.details(fund.id));
  return (
    <div className=" flex flex-col gap-4">
      <Card>
        <Text className="mb-4 text-lg font-bold">{t('paymentMethod')}</Text>
        <div className="flex w-fit flex-col items-center rounded-xl bg-brand-yellow-highlight p-6 text-brand-primary-600">
          <WalletIcon />
          <Text className="text-base font-bold">{t('investmentWallet')}</Text>
          <Text className="text-base">{walletDetails?.id}</Text>
        </div>

        <div>
          <MainTitle order={3} text={t('requestSummary')} className="text-lg" />
          <div className="mt-4 grid items-end gap-4 lg:grid-cols-2">
            <Input
              namespace="common"
              label="unitsDesiredToInvestIn"
              placeholder="unitsDesiredToInvestIn"
              readOnly
              value={format(totalUnitsPrice)}
            />
            <Input
              namespace="common"
              label="investmentUnitPrice"
              placeholder="investmentUnitPrice"
              classNames={{
                label:
                  'font-medium text-sm sm:text-lg mb-2 whitespace-break-spaces',
              }}
              readOnly
              value={format(totalUnitsPrice)}
            />
            <Input
              namespace="common"
              label="subscriptionFees"
              placeholder="subscriptionFees"
              readOnly
              value={format(subscriptionFees)}
            />
            <TextInput
              label={t('vatAddedTax', {
                number: env.NEXT_PUBLIC_VAT_PERCENTAGE * 100,
              })}
              placeholder={`${env.NEXT_PUBLIC_VAT_PERCENTAGE * 100}%`}
              readOnly
              value={format(vat)}
              classNames={{
                label: 'font-medium text-sm sm:text-lg mb-2 whitespace-nowrap',
              }}
            />
            <Flex className="items-center	">
              <Text className="text-2xl font-bold text-[#64646C]">
                {t('total')}:{' '}
              </Text>
              <Text className="ml-4  text-4xl font-bold">{format(total)}</Text>
            </Flex>
          </div>
        </div>
      </Card>
      <Button
        namespace="common"
        onClick={() => onSubmit()}
        text="confirmPayment"
      />
    </div>
  );
};

export default ConfirmPayment;
