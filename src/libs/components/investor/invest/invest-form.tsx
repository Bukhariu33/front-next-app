import { Flex, Text, TextInput } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import Counter from '@/libs/admin/components/funds/fund-form-elements/Counter';
import Card from '@/libs/admin/section-card';
import { env } from '@/libs/Env.mjs';
import useFormatToMoney from '@/libs/hooks/useFormatToMoney';
import AlertIcon from '@/libs/icons/alert-icon';
import type { BaseFund } from '@/libs/types/interface/fund/base';

import Button from '../../Base/Buttons/Button';
import Input from '../../Base/inputs/input';

interface InvestFormProps {
  onSubmit: (count: number) => void;
  fund: BaseFund;
  initialCount: number;
}

const InvestForm: React.FC<InvestFormProps> = ({
  onSubmit,
  fund,
  initialCount,
}: InvestFormProps) => {
  const { t } = useTranslation('common');
  const { format } = useFormatToMoney();
  const [count, setCount] = useState(1);

  const totalUnitsPrice = fund.unitPrice * count;
  const subscriptionFees = fund.fees.subscription * totalUnitsPrice;
  const vat = env.NEXT_PUBLIC_VAT_PERCENTAGE * subscriptionFees;
  const total = totalUnitsPrice + subscriptionFees + vat;

  const handleChange = (value: number) => {
    setCount(value);
  };
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <Flex className="justify-between">
          <div>
            <Text className="text-lg font-bold">{t('investmentsUnits')}</Text>
            <Flex className="items-center gap-3	">
              <AlertIcon isGrey />
              <Text className="text-sm">{t('minimumInvestmentAmount')}</Text>
            </Flex>
          </div>
          <Counter
            initialCount={initialCount}
            min={1}
            max={fund.units - fund.takenUnits}
            onIncrease={handleChange}
            onDecrease={handleChange}
          />{' '}
        </Flex>
        <Input
          namespace="common"
          label="investmentUnitPrice"
          placeholder="investmentUnitPrice"
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
        />
        <Flex className="items-center	">
          <Text className="text-2xl font-bold text-[#64646C]">
            {t('total')}:{' '}
          </Text>
          <Text className="ml-4  text-4xl font-bold">{format(total)}</Text>
        </Flex>
      </Card>
      <Button
        namespace="common"
        onClick={() => {
          onSubmit(count);
        }}
        text="nextDeclaration"
      />
    </div>
  );
};

export default InvestForm;
