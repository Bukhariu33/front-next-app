import { Divider, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useTranslation } from 'next-i18next';

import ChevronIcon from '@/icons/chevron-icon';
import useCancelInvestment from '@/libs/hooks/funds/use-cancel-investment';
import useAdminSettings from '@/libs/hooks/useAdminSettings';
import { useForms } from '@/libs/hooks/useForms';
import {
  CancelInvestmentRequestSchema,
  type CancelInvestmentRequestSchemaType,
} from '@/libs/validations/fund-manager/cancel-investment-request-validation';

import Button from '../Base/Buttons/Button';
import SelectInput from '../Base/inputs/select-input';
import Textarea from '../Base/inputs/textarea';
import ReplaceTranslationKey from '../utils/ReplaceTranslationKey';
import GrayCard from './gray-card';

export const CancelInvestmentRequestModelTitle = () => {
  const { t } = useTranslation('common');
  return (
    <div className=" mt-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Text
          className="flex cursor-pointer items-center"
          onClick={() => modals.close('CancelModal')}
        >
          <ChevronIcon className="mr-3 rotate-90 stroke-black rtl:-rotate-90" />
        </Text>
        <Divider orientation="vertical" className="border-brand-primary-main" />
        <p className="m-0 ml-2 text-4xl font-bold leading-8 text-brand-danger">
          {t('cancelInvestmentRequest')}
        </p>
      </div>
    </div>
  );
};

export const CancelInvestmentRequestModelContent = ({
  investorName,
  fundName,
  fundId,
  investorId,
}: {
  fundName: string;
  fundId: string;
  investorName: string;
  investorId: string;
}) => {
  const { t } = useTranslation('common');
  const { data: settings, isLoading } = useAdminSettings();
  const { cancelInvestment } = useCancelInvestment();

  const handleSubmit = async (values: CancelInvestmentRequestSchemaType) => {
    cancelInvestment({
      fundId,
      investorId,
      values,
    });
  };

  const initialValues: CancelInvestmentRequestSchemaType = {
    reasonOfCancellation: '',
    reason: '',
    quickResponse: '',
  };

  const formik = useForms({
    initialValues,
    validationSchema: CancelInvestmentRequestSchema,
    validateOnMount: true,
    onSubmit: handleSubmit,
  });
  return (
    <GrayCard>
      <div className="flex flex-col gap-8 p-6">
        <ReplaceTranslationKey
          className="m-0 text-lg font-medium"
          text={t('cancelInvestmentConfirmation')}
          values={{
            name: investorName,
            fundName,
          }}
        />
        <form className="flex flex-col gap-8" onSubmit={formik.handleSubmit}>
          <SelectInput
            namespace="common"
            label="reasonOfCancellation"
            placeholder="selectReasonForCancellation"
            isLoading={isLoading}
            data={settings?.cancelInvestmentOptions}
            classNames={{
              input: 'bg-white',
            }}
            name="reasonOfCancellation"
            onChange={e => {
              formik.setFieldValue('reasonOfCancellation', e);
            }}
            onBlur={_ => {
              formik.setFieldTouched('reasonOfCancellation', true);
            }}
            value={formik.values.reasonOfCancellation}
            {...(formik.errors.reasonOfCancellation &&
              formik.touched.reasonOfCancellation && {
                errorMessage: formik.errors.reasonOfCancellation as any,
              })}
          />
          <Textarea
            namespace="common"
            label="enterTheReason"
            placeholder="enterTheReason"
            classNames={{
              input: 'bg-white',
            }}
            {...formik.getFieldProps('reason')}
            {...(formik.errors.reason &&
              formik.touched.reason && {
                errorMessage: formik.errors.reason as any,
              })}
          />
          <SelectInput
            namespace="common"
            placeholder="chooseQuickResponse"
            className="w-2/5"
            classNames={{
              input: 'bg-white',
            }}
            name="quickResponse"
            onChange={e => {
              formik.setFieldValue('quickResponse', e);
            }}
            onBlur={_ => {
              formik.setFieldTouched('quickResponse', true);
            }}
            value={formik.values.quickResponse}
            {...(formik.errors.quickResponse &&
              formik.touched.quickResponse && {
                errorMessage: formik.errors.quickResponse as any,
              })}
          />
          <div className="flex justify-end gap-4">
            <Button
              namespace="common"
              text="back"
              variant="outlined-black"
              onClick={() => modals.close('CancelModal')}
            />
            <Button
              namespace="common"
              text="sendRequest"
              type="submit"
              disabled={formik.isSubmitting || !formik.isValid}
            />
          </div>
        </form>
      </div>
    </GrayCard>
  );
};
