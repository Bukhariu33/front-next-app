import { Divider, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { Fragment } from 'react';

import Attachment from '@/libs/components/Base/Attachment';
import InfoCard from '@/libs/components/Base/Card/info-card';
import BasePanel from '@/libs/components/fund-details/panels/BasePanel';
import useFormatToMoney from '@/libs/hooks/useFormatToMoney';
import type { Purchase as PurchaseType } from '@/libs/types/investors/investments/investment-fund-data';

type PurchaseProps = {
  purchase: PurchaseType;
};

const Purchase = ({ purchase }: PurchaseProps) => {
  const { t } = useTranslation('common');
  const { format } = useFormatToMoney();
  const totalWithoutVATAndSubscriptionFees =
    purchase.total - purchase.vat - purchase.subscriptionFees;
  return (
    <div className="flex flex-col gap-7">
      <div className="flex justify-between">
        <InfoCard title={t('requestRefID')} value={purchase.id} withCopy />
        <Attachment
          name={t('downloadInvoice')}
          fileSrc={purchase.invoice}
          fileType="pdf"
        />
      </div>
      <div className="grid  grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard title={t('unitsDesiredToInvestIn')} value={purchase.units} />
        <InfoCard
          title={t('totalWithoutVATAndSubscriptionFees')}
          value={format(totalWithoutVATAndSubscriptionFees)}
          withDivider
        />
        <InfoCard
          title={t('subscriptionFees')}
          value={format(purchase.subscriptionFees)}
          withDivider
        />
        <InfoCard title={t('valueAddedTax')} value={format(purchase.vat)} />
        <InfoCard
          title={t('total')}
          value={format(purchase.total)}
          withDivider
        />
      </div>
      <Text className="text-2xl text-brand-accent-500">
        {purchase.dateTime}
      </Text>
    </div>
  );
};

type PurchasesProps = {
  purchases: PurchaseType[];
};

const Purchases = ({ purchases }: PurchasesProps) => {
  return (
    <BasePanel>
      <div className="flex max-h-full flex-col gap-8">
        {purchases.map((purchase, index) => (
          <Fragment key={purchase.id}>
            <Purchase purchase={purchase} />
            {index !== purchases.length - 1 && (
              <Divider key={`Divider- ${purchase.id}`} />
            )}
          </Fragment>
        ))}
      </div>
    </BasePanel>
  );
};

export default Purchases;
