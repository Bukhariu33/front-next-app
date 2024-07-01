import { Paper, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import Button from '@/libs/components/Base/Buttons/Button';
import InfoCard from '@/libs/components/Base/Card/info-card';
import { env } from '@/libs/Env.mjs';
import DownloadIcon from '@/libs/icons/download-icon';
import SuccessIcon from '@/libs/icons/success-icon';
import type { Purchase } from '@/libs/types/investors/investments/investment-fund-data';
import { formatDateTime } from '@/utils/formatDateTime';

import useFormatToMoney from '../useFormatToMoney';

function InvestSuccessModal({
  dateTime,
  id,
  invoice,
  subscriptionFees,
  total,
  units,
  vat,
}: Purchase) {
  const { t } = useTranslation('common');
  const { format } = useFormatToMoney();

  const handleClose = () => {
    modals.closeAll();
  };
  return (
    <Paper className=" bg-white p-4   lg:p-8">
      <div className="flex flex-col items-center gap-4">
        <SuccessIcon className="mx-auto h-20 w-20" />
        <Text>{t('requestReceivedSuccess')}</Text>
        <Text dir="ltr">{formatDateTime(new Date(dateTime))}</Text>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-8 lg:grid-cols-3">
        <h3 className="col-span-3 text-lg font-semibold text-gray-600">
          {t('requestSummary')}
        </h3>
        <InfoCard title={t('requestRefID')} value={id} withCopy />
        <InfoCard title={t('investmentsUnits')} value={units} withDivider />
        <InfoCard
          title={t('totalWithoutVATAndSubscriptionFees')}
          value={format(total - vat - subscriptionFees)}
          withDivider
        />
        <InfoCard
          title={t('subscriptionFees')}
          value={format(subscriptionFees)}
        />
        <InfoCard
          title={t('vatAddedTax', {
            number: env.NEXT_PUBLIC_VAT_PERCENTAGE * 100,
          })}
          value={format(vat)}
          withDivider
        />
        <InfoCard title={t('total')} value={format(total)} withDivider />
        <div className="col-span-3 flex items-center justify-center gap-4">
          <Button
            namespace="common"
            text="back"
            variant="outlined-black"
            onClick={handleClose}
          />
          <Button
            namespace="common"
            text="downloadInvoice"
            variant="primary"
            rightSection={<DownloadIcon className="h-5 w-5" />}
            onClick={handleClose}
            renderRoot={props => (
              <Link
                download
                href={invoice}
                {...props}
                target="_blank"
                rel="noopener noreferrer"
              />
            )}
          />
        </div>
      </div>
    </Paper>
  );
}

export default InvestSuccessModal;
