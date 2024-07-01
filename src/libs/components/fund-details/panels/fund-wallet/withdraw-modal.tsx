import { modals } from '@mantine/modals';

import Button from '@/libs/components/Base/Buttons/Button';
import MoneyInput from '@/libs/components/Base/inputs/money-input';
import { useForms } from '@/libs/hooks/useForms';
import type { FundWalletDetails } from '@/libs/types/fund-managers/funds/fund-wallet-details';
import { WalletWithdrawRequestSchema } from '@/libs/validations/fund-manager/wallet-withdraw-validation';

import AccountInformation from './account-information';

type WithdrawModalProps = {
  accountInfo: FundWalletDetails['withdrawInfo'];
};

const WithdrawModal = ({ accountInfo }: WithdrawModalProps) => {
  const initialValues = {
    amount: '',
  };

  const formik = useForms({
    initialValues,
    validationSchema: WalletWithdrawRequestSchema,
    validateOnMount: true,
    onSubmit: async values => {
      console.log(values);
      modals.closeAll();
    },
  });
  return (
    <div className="flex flex-col gap-8 py-4">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
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
        <AccountInformation accountInfo={accountInfo} />
        <div className="flex flex-row justify-end gap-4">
          <Button
            namespace="fund"
            text="cancel"
            variant="outlined-black"
            type="button"
            className="h-[52px] w-[160px] px-12"
            onClick={() => modals.closeAll()}
          />
          <Button
            namespace="fund"
            text="withdraw"
            type="submit"
            className="h-[52px] w-[250px] px-12"
            disabled={!formik.isValid}
          />
        </div>
      </form>
    </div>
  );
};

export default WithdrawModal;
