import type { Resources } from 'i18next';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Input from '@/libs/components/Base/inputs/input';
import SelectInput from '@/libs/components/Base/inputs/select-input';
import { KycForm } from '@/libs/components/kyc/kyc-form';
import KycRadioGroup from '@/libs/components/kyc/kyc-radio-group';
import {
  CorporateInvestorKycReadonly,
  InvestorKycReadOnlyInfo,
} from '@/libs/components/kyc/peronsal-info-readonly';
import useCorporateKyc from '@/libs/hooks/kyc/useCorporateKyc';
import useIndividualKyc from '@/libs/hooks/kyc/useIndividualKyc';
import useKycMutation from '@/libs/hooks/kyc/useKycMutation';
import { useForms } from '@/libs/hooks/useForms';
import useInvestorSettings from '@/libs/hooks/useInvestorSettings';
import useUser from '@/libs/hooks/useUser';
import { withKycQueries } from '@/libs/services/investor/kyc/withKycQueries';
import type { PersonalSchemaType } from '@/libs/validations/investor/kyc';
import { PersonalSchema } from '@/libs/validations/investor/kyc';
import { mapSettingRecordsToSelectData } from '@/utils/kyc/mapSettingRecordsToSelectData';

const mapTypeToComponent = {
  corporateInvestor: <CorporateInvestorKycReadonly />,
  individualInvestor: <InvestorKycReadOnlyInfo />,
};
const KycPage = () => {
  const { data: investorSettings } = useInvestorSettings();
  const { user } = useUser();
  const { t } = useTranslation('kyc');
  const router = useRouter();
  const corporateKycData = useCorporateKyc();
  const individualKycData = useIndividualKyc();

  const userKyc =
    user?.type === 'corporateInvestor'
      ? corporateKycData?.data
      : individualKycData?.data;

  const initialValues: PersonalSchemaType = {
    boardMemberAuditCommitteeMemberSeniorExecutive:
      userKyc?.boardMemberAuditCommitteeMemberSeniorExecutive ?? '',
    clientHasRelationshipWithProminentPublicFunction:
      userKyc?.clientHasRelationshipWithProminentPublicFunction ?? '',
    clientIsBeneficialOwner: userKyc?.clientIsBeneficialOwner ?? '',
    entrustedWithProminentPublicFunctions:
      userKyc?.entrustedWithProminentPublicFunctions ?? '',
    identityOfRealBeneficiaryOfInvestmentAccount:
      userKyc?.identityOfRealBeneficiaryOfInvestmentAccount ?? '',
    investedInInvestmentOrRealEstateFunds:
      userKyc?.investedInInvestmentOrRealEstateFunds ?? '',
    otherPracticalExperienceInFinancialSector:
      userKyc?.otherPracticalExperienceInFinancialSector ?? '',
    workedInFinancialSectorDuringPastFiveYears:
      userKyc?.workedInFinancialSectorDuringPastFiveYears ?? '',
    investmentDuration: userKyc?.investmentDuration ?? '',
    riskTolerance: userKyc?.riskTolerance ?? '',
    investmentKnowledge: userKyc?.investmentKnowledge ?? '',
    educationalLevel: userKyc?.educationalLevel ?? '',
    occupation: userKyc?.occupation ?? '',
  } as PersonalSchemaType;

  const { mutateAsync } = useKycMutation({
    onSuccess: () => {
      if (user?.type === 'corporateInvestor') {
        router.push('/investor/kyc/client-classification');
      }
      if (user?.type === 'individualInvestor')
        router.push('/investor/kyc/financial-condition');
    },
  });

  const formik = useForms({
    initialValues,
    validationSchema: PersonalSchema,
    onSubmit: mutateAsync,
    enableReinitialize: true,
  });

  if (!investorSettings?.data) return null;

  return (
    <KycForm
      onSubmit={formik.handleSubmit}
      alert={!formik.isValid && formik.submitCount > 0}
    >
      {mapTypeToComponent[user?.type as keyof typeof mapTypeToComponent]}
      <KycRadioGroup
        data-cy="worked-in-financial-sector"
        label={t('workedInFinancialSectorDuringPastFiveYears')}
        data={investorSettings?.data.workedInFinancialSectorDuringPastFiveYears}
        {...formik.getFieldProps('workedInFinancialSectorDuringPastFiveYears')}
        onChange={workedInFinancialSectorDuringPastFiveYears => {
          formik.setFieldValue(
            'workedInFinancialSectorDuringPastFiveYears',
            workedInFinancialSectorDuringPastFiveYears,
          );
        }}
        errorMessage={
          formik.touched.workedInFinancialSectorDuringPastFiveYears
            ? (formik.errors
                .workedInFinancialSectorDuringPastFiveYears as keyof Resources['error'])
            : undefined
        }
      />
      <KycRadioGroup
        data-cy="other-exp-in-financial-sector"
        label={t('otherPracticalExperienceInFinancialSector')}
        data={investorSettings?.data.otherPracticalExperienceInFinancialSector}
        {...formik.getFieldProps('otherPracticalExperienceInFinancialSector')}
        onChange={otherPracticalExperienceInFinancialSector => {
          formik.setFieldValue(
            'otherPracticalExperienceInFinancialSector',
            otherPracticalExperienceInFinancialSector,
          );
        }}
        errorMessage={
          formik.touched.otherPracticalExperienceInFinancialSector
            ? (formik.errors
                .otherPracticalExperienceInFinancialSector as keyof Resources['error'])
            : undefined
        }
      />
      <KycRadioGroup
        data-cy="invested-in-real-estate"
        label={t('investedInInvestmentOrRealEstateFunds')}
        data={investorSettings?.data.investedInInvestmentOrRealEstateFunds}
        {...formik.getFieldProps('investedInInvestmentOrRealEstateFunds')}
        onChange={investedInInvestmentOrRealEstateFunds => {
          formik.setFieldValue(
            'investedInInvestmentOrRealEstateFunds',
            investedInInvestmentOrRealEstateFunds,
          );
        }}
        errorMessage={
          formik.touched.investedInInvestmentOrRealEstateFunds
            ? (formik.errors
                .investedInInvestmentOrRealEstateFunds as keyof Resources['error'])
            : undefined
        }
      />
      <KycRadioGroup
        data-cy="board-member-in-listed-company"
        label={t('boardMemberAuditCommitteeMemberSeniorExecutive')}
        data={
          investorSettings?.data.boardMemberAuditCommitteeMemberSeniorExecutive
        }
        {...formik.getFieldProps(
          'boardMemberAuditCommitteeMemberSeniorExecutive',
        )}
        onChange={boardMemberAuditCommitteeMemberSeniorExecutive => {
          formik.setFieldValue(
            'boardMemberAuditCommitteeMemberSeniorExecutive',
            boardMemberAuditCommitteeMemberSeniorExecutive,
          );
        }}
        errorMessage={
          formik.touched.boardMemberAuditCommitteeMemberSeniorExecutive
            ? (formik.errors
                .boardMemberAuditCommitteeMemberSeniorExecutive as keyof Resources['error'])
            : undefined
        }
      />
      <KycRadioGroup
        data-cy="investment-knowledge-experience"
        label={t('InvestmentKnowledgeExperience')}
        data={investorSettings?.data.investmentExperienceOptions}
        {...formik.getFieldProps('investmentKnowledge')}
        onChange={investmentKnowledge => {
          formik.setFieldValue('investmentKnowledge', investmentKnowledge);
        }}
        errorMessage={
          formik.touched.investmentKnowledge
            ? (formik.errors.investmentKnowledge as keyof Resources['error'])
            : undefined
        }
        alert={{
          message: t('specificKnowledgebenifit'),
          show:
            formik.values.investmentKnowledge !== 'high' &&
            !!formik.values.investmentKnowledge,
        }}
      />
      <KycRadioGroup
        data-cy="risk-tolerance"
        label={t('customerAbilityToRisk')}
        data={investorSettings?.data.investmentRiskLevelOptions}
        {...formik.getFieldProps('riskTolerance')}
        onChange={riskTolerance => {
          formik.setFieldValue('riskTolerance', riskTolerance);
        }}
        errorMessage={
          formik.touched.riskTolerance
            ? (formik.errors.riskTolerance as keyof Resources['error'])
            : undefined
        }
        alert={{
          message: t('specificKnowledgebenifit'),
          show:
            formik.values.riskTolerance !== 'high' &&
            !!formik.values.riskTolerance,
        }}
      />
      <KycRadioGroup
        data-cy="investment-term"
        label={t('investmentTerms')}
        data={investorSettings?.data.investmentDurationOptions}
        {...formik.getFieldProps('investmentDuration')}
        onChange={investmentDuration => {
          formik.setFieldValue('investmentDuration', investmentDuration);
        }}
        errorMessage={
          formik.touched.investmentDuration
            ? (formik.errors.investmentDuration as keyof Resources['error'])
            : undefined
        }
      />
      <KycRadioGroup
        data-cy="entrusted-with-functions"
        label={t('entrustedWithProminentPublicFunctions')}
        data={investorSettings?.data.entrustedWithProminentPublicFunctions}
        {...formik.getFieldProps('entrustedWithProminentPublicFunctions')}
        onChange={entrustedWithProminentPublicFunctions => {
          formik.setFieldValue(
            'entrustedWithProminentPublicFunctions',
            entrustedWithProminentPublicFunctions,
          );
        }}
        errorMessage={
          formik.touched.entrustedWithProminentPublicFunctions
            ? (formik.errors
                .entrustedWithProminentPublicFunctions as keyof Resources['error'])
            : undefined
        }
      />
      <KycRadioGroup
        data-cy="has-relation-with-function"
        label={t('clientHasRelationshipWithProminentPublicFunction')}
        data={
          investorSettings?.data
            .clientHasRelationshipWithProminentPublicFunction
        }
        {...formik.getFieldProps(
          'clientHasRelationshipWithProminentPublicFunction',
        )}
        onChange={clientHasRelationshipWithProminentPublicFunction => {
          formik.setFieldValue(
            'clientHasRelationshipWithProminentPublicFunction',
            clientHasRelationshipWithProminentPublicFunction,
          );
        }}
        errorMessage={
          formik.touched.clientHasRelationshipWithProminentPublicFunction
            ? (formik.errors
                .clientHasRelationshipWithProminentPublicFunction as keyof Resources['error'])
            : undefined
        }
      />
      <KycRadioGroup
        data-cy="client-is-beneficial-owner"
        label={t('clientIsBeneficialOwner')}
        data={investorSettings?.data.clientIsBeneficialOwner}
        {...formik.getFieldProps('clientIsBeneficialOwner')}
        onChange={clientIsBeneficialOwner => {
          formik.setFieldValue(
            'clientIsBeneficialOwner',
            clientIsBeneficialOwner,
          );
        }}
        errorMessage={
          formik.touched.clientIsBeneficialOwner
            ? (formik.errors
                .clientIsBeneficialOwner as keyof Resources['error'])
            : undefined
        }
      />
      {formik.values.clientIsBeneficialOwner === 'proxy' && (
        <Input
          namespace="kyc"
          label="identityOfRealBeneficiaryOfInvestmentAccount"
          {...formik.getFieldProps(
            'identityOfRealBeneficiaryOfInvestmentAccount',
          )}
          placeholder="enterBeneficiaryID"
          errorMessage={
            formik.touched.identityOfRealBeneficiaryOfInvestmentAccount
              ? (formik.errors
                  .identityOfRealBeneficiaryOfInvestmentAccount as keyof Resources['error'])
              : undefined
          }
        />
      )}
      <SelectInput
        data-cy-input="educational-level"
        namespace="kyc"
        label="educationalLevel"
        value={formik.values.educationalLevel}
        data={mapSettingRecordsToSelectData(
          investorSettings?.data.educationalLevelOptions ?? [],
        )}
        onChange={value => formik.setFieldValue('educationalLevel', value)}
        placeholder="enterYourEducationLevel"
        errorMessage={
          formik.touched.educationalLevel
            ? (formik.errors.educationalLevel as keyof Resources['error'])
            : undefined
        }
      />
      <SelectInput
        data-cy-input="occupation"
        namespace="kyc"
        label="occupation"
        value={formik.values.occupation}
        data={mapSettingRecordsToSelectData(
          investorSettings?.data.employmentStatusOptions ?? [],
        )}
        onChange={value => formik.setFieldValue('occupation', value)}
        placeholder="enterYourOccupation"
        errorMessage={
          formik.touched.occupation
            ? (formik.errors.occupation as keyof Resources['error'])
            : undefined
        }
      />
    </KycForm>
  );
};
export default KycPage;

export const getServerSideProps: GetServerSideProps = withKycQueries();
