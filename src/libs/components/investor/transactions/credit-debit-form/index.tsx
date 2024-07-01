import { Stack } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import SelectInput from '@/libs/components/Base/inputs/select-input';
import { axiosInternal } from '@/libs/configs/axios';
import { useMutation } from '@/libs/hooks/use-mutation';
import { useForms } from '@/libs/hooks/useForms';
import adminInvestorTransactionsQueryOptions from '@/libs/services/admin/investors/fund-wallet/investor-transactions';
import type { CreditAndDebitInterface } from '@/libs/types/admin/investors/credit-debit';
import { CreditAndDebitSchema } from '@/libs/validations/investor/creditDebitSchema';

import Button from '../../../Base/Buttons/Button';
import MoneyInput from '../../../Base/inputs/money-input';
import Textarea from '../../../Base/inputs/textarea';

function TransactionCreditDebitForm() {
  const { query } = useRouter();
  const { t } = useTranslation('common');
  const depositTypes = [
    { label: 'credit', value: 'credit' },
    { label: 'debit', value: 'debit' },
  ];
  const { mutateAsync } = useMutation({
    mutationFn: async (values: CreditAndDebitInterface) => {
      await axiosInternal.post(
        `/admin/investors/${query.investorID}/credit-debit`,
        values,
      );
    },
    onSuccess: () => {
      notifications.show({
        title: t('success'),
        message: t('successModalMessage'),
      });
      modals.closeAll();
    },
    revalidateOnSettled: true,
    queryOptions: adminInvestorTransactionsQueryOptions,
  });

  const initialValues: CreditAndDebitInterface = {
    transactionType: '',
    amount: 0,
    note: '',
  };

  const formik = useForms({
    initialValues,
    validationSchema: CreditAndDebitSchema,
    onSubmit: mutateAsync,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack className="w-full">
        {/* Credit/Debit Amount */}
        <MoneyInput
          namespace="fund"
          label="amount"
          placeholder="enterAmount"
          min={1}
          {...formik.getFieldProps('amount')}
          onChange={e => {
            formik.setFieldValue('amount', e);
          }}
          onBlur={_e => formik.setFieldTouched('amount', true, true)}
          {...(formik.errors.amount &&
            formik.touched.amount && {
              errorMessage: formik.errors.amount as any,
            })}
        />
        {/* Select Deposit type */}

        <SelectInput
          namespace="admin-common"
          label="transactionType"
          placeholder="transactionType"
          data={depositTypes}
          classNames={{
            input: 'bg-white',
          }}
          name="transactionType"
          onChange={e => {
            formik.setFieldValue('transactionType', e);
          }}
          onBlur={_ => {
            formik.setFieldTouched('transactionType', true);
          }}
          value={formik.values.transactionType}
          {...(formik.errors.transactionType &&
            formik.touched.transactionType && {
              errorMessage: formik.errors.transactionType as any,
            })}
        />

        {/* MESSAGE */}
        <Textarea
          charsLimit={100}
          namespace="support"
          label="typeMessageHere"
          placeholder="typeMessageHere"
          {...formik.getFieldProps('note')}
          errorMessage={(formik.touched?.note && formik.errors?.note) as string}
          classNames={{
            input: 'w-full',
          }}
        />

        {/* SUBMIT BUTTON */}
        <div className="space-x-4 text-end">
          <Button
            namespace="auth"
            disabled={formik.isSubmitting || !formik.isValid}
            text="send"
            type="submit"
          />
        </div>
      </Stack>
    </form>
  );
}

export default TransactionCreditDebitForm;
