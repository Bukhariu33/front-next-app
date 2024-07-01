import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useTranslation } from 'next-i18next';

import Button from '@/libs/components/Base/Buttons/Button';
import { formatDateTime } from '@/utils/formatDateTime';
import hasDaysPassed from '@/utils/hasDaysPassed';

interface HeaderProps {
  investmentDate: string;
}

export const CancelInvestmentModalHeader = ({
  investmentDate,
}: HeaderProps) => {
  const { t } = useTranslation('common');
  const canCancelInvestment = !hasDaysPassed(new Date(investmentDate), 2);
  return (
    <div>
      {canCancelInvestment ? (
        <Text className="text-2xl font-bold text-brand-danger">
          {t('cancelInvestment')}
        </Text>
      ) : (
        <Text className="text-2xl font-bold">{t('lastDateForCancelling')}</Text>
      )}
    </div>
  );
};

interface ContentProps {
  investmentDate: string;
}
export const CancelInvestmentModalContent = ({
  investmentDate,
}: ContentProps) => {
  const { t } = useTranslation('common');

  const canCancelInvestment = !hasDaysPassed(new Date(investmentDate), 2);
  const lastCancellingDate = new Date(investmentDate);
  lastCancellingDate.setDate(lastCancellingDate.getDate() + 2);

  return (
    <div data-cy-id="cancel-investment-modal">
      {canCancelInvestment ? (
        <>
          <Text className="text-lg font-medium">
            {t('confirmCancelInvestment')}
          </Text>
          <div className="flex gap-2 py-4">
            <Button
              namespace="common"
              text="back"
              variant="outlined-black"
              onClick={() => modals.closeAll()}
            />
            <Button
              namespace="common"
              data-cy-button="cancel-investment"
              text="cancel"
              onClick={() => modals.closeAll()}
            />
          </div>
        </>
      ) : (
        <>
          <div>
            <Text className="text-lg font-medium text-brand-danger">
              {formatDateTime(lastCancellingDate)}
            </Text>
            <Text className="text-lg font-medium">
              {t('cancellationRequestExpired')}
            </Text>
          </div>
          <div className=" py-4">
            <Button
              namespace="common"
              variant="outlined-black"
              text="close"
              onClick={() => modals.closeAll()}
            />
          </div>
        </>
      )}
    </div>
  );
};
