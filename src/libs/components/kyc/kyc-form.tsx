import { useTranslation } from 'next-i18next';
import type { FC, FormEventHandler, ReactNode } from 'react';

import Button from '@/libs/components/Base/Buttons/Button';
import { FormErrorAlert } from '@/libs/components/kyc/FormErrorAlert';
import { KycCard } from '@/libs/components/kyc/layout/kyc-card';
import { KycCardActions } from '@/libs/components/kyc/layout/kyc-card-actions';
import { KycCardBody } from '@/libs/components/kyc/layout/kyc-card-body';
import { KycCardHeader } from '@/libs/components/kyc/layout/kyc-card-header';
import KycLayout from '@/libs/components/kyc/layout/kyc-layout';
import { Meta } from '@/libs/components/seo/meta';
import useKycStepper from '@/libs/hooks/kyc/useKycStepper';

interface KycFormProps {
  children: ReactNode;
  onSubmit: FormEventHandler<any>;
  alert?: boolean;
  disableSubmit?: boolean;
}

const KycForm: FC<KycFormProps> = ({
  children,
  alert,
  onSubmit,
  disableSubmit,
}) => {
  const { t } = useTranslation(['kyc', 'error']);
  const { title, step, goBack } = useKycStepper();

  return (
    <form onSubmit={onSubmit}>
      <Meta title="Customer identification form" />
      <KycLayout>
        <KycCard>
          <KycCardHeader>
            {t(title)}
            {alert && <FormErrorAlert message={t('error:errorPlease')} />}
          </KycCardHeader>
          <KycCardBody>{children}</KycCardBody>
          <KycCardActions>
            <Button
              namespace="kyc"
              text="previous"
              variant="outlined-black"
              disabled={step === 1}
              onClick={goBack}
            />
            <Button
              data-cy-button="next-kyc-step"
              namespace="kyc"
              text="next"
              type="submit"
              disabled={disableSubmit}
            />
          </KycCardActions>
        </KycCard>
      </KycLayout>
    </form>
  );
};

export { KycForm };
