import { useRouter } from 'next/router';

import useUser from '@/libs/hooks/useUser';
import type { KycTranslationKeys } from '@/libs/types/kyc';

const mapTranslationKeyToUrl = {
  personalInformation: 'personal-information',
  clientClassification: 'client-classification',
  financialSituation: 'financial-condition',
  approvalsAndDeclarations: 'approval-and-declaration',
  suitabilityAssessment: 'rating',
};

const useKycStepper = () => {
  const { user } = useUser();

  const stepperLabels: KycTranslationKeys[] =
    user?.type === 'corporateInvestor'
      ? [
          'personalInformation',
          'clientClassification',
          'financialSituation',
          'approvalsAndDeclarations',
          'suitabilityAssessment',
        ]
      : [
          'personalInformation',
          'financialSituation',
          'approvalsAndDeclarations',
          'suitabilityAssessment',
        ];

  const stepMapping = stepperLabels.reduce(
    (previousValue, key, index) => ({
      ...previousValue,
      [(mapTranslationKeyToUrl as Record<KycTranslationKeys, string>)[key]]:
        index + 1,
    }),
    {} as Record<string, number>,
  );

  const mapStepToSegment = stepperLabels.reduce(
    (previousValue, key, index) => ({
      ...previousValue,
      [index + 1]: (
        mapTranslationKeyToUrl as Record<KycTranslationKeys, string>
      )[key],
    }),
    {} as Record<number, string>,
  );

  const router = useRouter();

  const segment = router.pathname
    .split('/investor/kyc/')
    .slice(-1)[0] as keyof typeof stepMapping;

  const step = stepMapping[segment] ?? 1;

  const title = (stepperLabels?.[step - 1] ??
    stepperLabels?.[0]) as KycTranslationKeys;

  const goBack = async () => {
    const nextStep = Math.max(step - 1, 1);
    const url = mapStepToSegment[nextStep] ?? '';
    await router.push(url);
  };

  return {
    labels: stepperLabels,
    step:
      segment === 'rating-not-acceptable-report'
        ? stepperLabels.length + 1
        : step,
    title,
    goBack,
  };
};

export default useKycStepper;
