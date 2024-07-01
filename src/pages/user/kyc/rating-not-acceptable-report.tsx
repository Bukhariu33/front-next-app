import { Flex, Grid, Text } from '@mantine/core';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Button from '@/libs/components/Base/Buttons/Button';
import { KycCard } from '@/libs/components/kyc/layout/kyc-card';
import { KycCardActions } from '@/libs/components/kyc/layout/kyc-card-actions';
import { KycCardBody } from '@/libs/components/kyc/layout/kyc-card-body';
import { KycCardHeader } from '@/libs/components/kyc/layout/kyc-card-header';
import KycLayout from '@/libs/components/kyc/layout/kyc-layout';
import { axiosInternal } from '@/libs/configs/axios';
import { useMutation } from '@/libs/hooks/use-mutation';
import useUser from '@/libs/hooks/useUser';
import { openSuccessModal } from '@/libs/packages/modals';
import { withKycQueries } from '@/libs/services/investor/kyc/withKycQueries';

const KycPage = () => {
  const { t } = useTranslation('kyc');
  const { user, update } = useUser();
  const router = useRouter();

  const message =
    user?.type === 'corporateInvestor'
      ? 'requestReceivedAndUnderReview'
      : 'trackYourInvestmentsThroughMenu';

  const {
    mutate: updateKycStatus,
    isLoading,
    status,
  } = useMutation({
    mutationFn: async () => {
      const individualUrl = `/investor/kyc/individual`;
      const CorporateUrl = `/investor/kyc/corporate`;
      await axiosInternal.post(
        user?.type === 'corporateInvestor' ? CorporateUrl : individualUrl,
        { acknowledgmentSigned: true, submit: true },
      );
    },
    onSuccess: () => {
      update?.({ isKycComplete: true });
      openSuccessModal({
        namespace: 'kyc',
        id: 'kycSuccess',
        title: 'welcomeToOwaisFinancial',
        body: message,
        onClose: () => {
          router.push('/investor');
        },
        onConfirm: () => {
          router.push('/investor');
        },
      });
    },
  });

  const handleApprove = () => {
    updateKycStatus();
  };

  return (
    <KycLayout>
      <KycCard>
        <KycCardHeader className="text-black">
          {t('customerAssessment')}
        </KycCardHeader>
        <KycCardBody className="mt-[16px] leading-[1.3333]">
          <Grid className="overflow-y-scroll rounded-[15px] bg-[#F5F7F9] px-[10px] py-[10px] sm:px-[1em] sm:py-[1em] md:px-[1em] md:py-[1.5em]">
            <Text className="text-[13px] font-medium md:text-[15px]">
              {t('report1')}
            </Text>
            <Text className="text-[13px] font-medium md:text-[15px]">
              {t('report2')}
            </Text>
            <br />
            <br />
            <Text className="text-xs font-medium md:text-sm">
              {t('report3')}
            </Text>
            <Text className="text-xs font-medium md:text-sm">
              {t('report4')}
            </Text>
            <Flex direction="column" className="mt-[20px]">
              <Flex wrap="wrap" gap="3px">
                <Text className="text-xs font-medium md:text-sm">
                  {user?.type === 'individualInvestor'
                    ? t('customerName')
                    : t('companyName')}
                  :
                </Text>
                <Text className="text-xs font-medium text-brand-primary-main md:text-sm">
                  {user?.type === 'individualInvestor'
                    ? user?.fullName
                    : user?.corporate?.companyName}
                </Text>
              </Flex>
              <Flex>
                <Text className="mx-[1px] mt-[5px] text-xs font-medium md:text-sm">
                  {user?.type === 'individualInvestor'
                    ? t('customeridnumber')
                    : t('CompanyRegistrationNumber')}
                  :
                </Text>
                <Text className="mx-[1px] mt-[5px] text-xs font-medium text-brand-primary-main md:text-sm">
                  {user?.type === 'individualInvestor'
                    ? user?.nationalId
                    : user?.corporate?.crNumber}
                </Text>
              </Flex>
              <Flex>
                <Text className="mx-[1px] mt-[5px] text-xs font-medium md:text-sm">
                  {t('theDate')}
                </Text>
                <Text className="mx-[1px] mt-[5px] text-xs font-medium text-brand-primary-main md:text-sm">
                  {new Date().toLocaleDateString()}
                </Text>
              </Flex>
            </Flex>
          </Grid>
        </KycCardBody>
        <KycCardActions>
          <Button
            namespace="kyc"
            text="reject"
            variant="outlined-black"
            onClick={async () => {
              await router.push('/investor/dashboard');
            }}
          />
          <Button
            data-cy-button="consent-and-submit-kyc"
            namespace="kyc"
            text="agree"
            loading={isLoading}
            disabled={status === 'success'}
            onClick={handleApprove}
          />
        </KycCardActions>
      </KycCard>
    </KycLayout>
  );
};

export default KycPage;

export const getServerSideProps: GetServerSideProps = withKycQueries();
