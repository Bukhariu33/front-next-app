import { Box, Flex, Text, Title } from '@mantine/core';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import AcceptableRatingIcon from '@/icons/acceptable-rating-icon';
import NotAcceptableRatingIcon from '@/icons/not-acceptable-rating-icon';
import Button from '@/libs/components/Base/Buttons/Button';
import { KycCard } from '@/libs/components/kyc/layout/kyc-card';
import { KycCardActions } from '@/libs/components/kyc/layout/kyc-card-actions';
import { KycCardBody } from '@/libs/components/kyc/layout/kyc-card-body';
import { KycCardHeader } from '@/libs/components/kyc/layout/kyc-card-header';
import KycLayout from '@/libs/components/kyc/layout/kyc-layout';
import TermsCard from '@/libs/components/kyc/terms-card';
import { axiosInternal } from '@/libs/configs/axios';
import useCorporateKyc from '@/libs/hooks/kyc/useCorporateKyc';
import useIndividualKyc from '@/libs/hooks/kyc/useIndividualKyc';
import { useMutation } from '@/libs/hooks/use-mutation';
import useUser from '@/libs/hooks/useUser';
import { openSuccessModal } from '@/libs/packages/modals';
import { withKycQueries } from '@/libs/services/investor/kyc/withKycQueries';
import { isInvestorSuitable } from '@/utils/kyc/isInvestorSuitable';

const KycPage = () => {
  const { t } = useTranslation('kyc');
  const router = useRouter();
  const { user, update } = useUser();
  const corporateKycData = useCorporateKyc();
  const individualKycData = useIndividualKyc();

  const userKyc =
    user?.type === 'corporateInvestor'
      ? corporateKycData?.data
      : individualKycData?.data;

  const isRatingAcceptable = isInvestorSuitable(userKyc!);

  const message =
    user?.type === 'corporateInvestor'
      ? ('requestReceivedAndUnderReview' as const)
      : ('trackYourInvestmentsThroughMenu' as const);

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
        {
          submit: true,
        },
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

  return (
    <KycLayout>
      <KycCard>
        <KycCardHeader>{t('suitabilityAssessment')}</KycCardHeader>
        <KycCardBody>
          <Box className="grid gap-[40px]">
            <TermsCard className="mt-[24px]">
              {t('assessmentHeading')}
            </TermsCard>
            <Flex direction="column" align="center">
              {isRatingAcceptable ? (
                <AcceptableRatingIcon />
              ) : (
                <NotAcceptableRatingIcon />
              )}
              <Title className="mt-[15px] text-xl leading-[1]">
                {t(
                  !isRatingAcceptable ? 'notSuitable' : 'suitableforAssessment',
                )}
              </Title>
              <Title className="mt-[5px] text-xs font-medium leading-[1.66667]">
                {t(
                  !isRatingAcceptable ? 'basedOnAnswer' : 'rejectbaseOnAnswer',
                )}
              </Title>
            </Flex>
            <TermsCard>
              <Flex direction="column">
                <Text className="text-base font-bold leading-[1.25]">
                  {t('potentialInvestment')}
                </Text>
                <br />
                <Text className="font-medium">{t('DebtInstrumentsRisk')}</Text>
              </Flex>
            </TermsCard>
          </Box>
        </KycCardBody>
        <KycCardActions>
          <Button
            data-cy-button="submit-suitable-kyc"
            namespace="kyc"
            text={isRatingAcceptable ? 'complete' : 'continue'}
            fullWidth
            loading={isLoading}
            disabled={status === 'success'}
            onClick={() => {
              if (isRatingAcceptable) return updateKycStatus();
              return router.push('/investor/kyc/rating-not-acceptable-report');
            }}
          />
        </KycCardActions>
      </KycCard>
    </KycLayout>
  );
};

export default KycPage;

export const getServerSideProps: GetServerSideProps = withKycQueries();
