import * as Yup from 'yup';

const levels = ['low', 'medium', 'high'] as const;
const questionOtions = ['yes', 'no'] as const;
const PersonalSchema = Yup.object().shape({
  workedInFinancialSectorDuringPastFiveYears: Yup.string()
    .trim()
    .oneOf(questionOtions, 'thisFieldIsOneOf')
    .required('thisFieldIsRequired'),
  otherPracticalExperienceInFinancialSector: Yup.string()
    .trim()
    .oneOf(questionOtions, 'thisFieldIsOneOf')
    .required('thisFieldIsRequired'),
  investedInInvestmentOrRealEstateFunds: Yup.string()
    .trim()
    .oneOf(questionOtions, 'thisFieldIsOneOf')
    .required('thisFieldIsRequired'),
  boardMemberAuditCommitteeMemberSeniorExecutive: Yup.string()
    .trim()
    .oneOf(questionOtions, 'thisFieldIsOneOf')
    .required('thisFieldIsRequired'),
  entrustedWithProminentPublicFunctions: Yup.string()
    .trim()
    .oneOf(questionOtions, 'thisFieldIsOneOf')
    .required('thisFieldIsRequired'),
  clientHasRelationshipWithProminentPublicFunction: Yup.string()
    .trim()
    .oneOf(questionOtions, 'thisFieldIsOneOf')
    .required('thisFieldIsRequired'),
  clientIsBeneficialOwner: Yup.string()
    .trim()
    .oneOf(['proxy', 'beneficiary'], 'thisFieldIsOneOf')
    .required('thisFieldIsRequired'),
  investmentKnowledge: Yup.string()
    .trim()
    .oneOf(levels, 'thisFieldIsOneOf')
    .required('thisFieldIsRequired'),
  riskTolerance: Yup.string()
    .trim()
    .oneOf(levels, "'thisFieldIsOneOf'")
    .required('thisFieldIsRequired'),
  investmentDuration: Yup.string()
    .trim()
    .oneOf(['short', 'medium', 'long'], 'thisFieldIsOneOf')
    .required('thisFieldIsRequired'),
  occupation: Yup.string().trim().required('thisFieldIsRequired'),
  identityOfRealBeneficiaryOfInvestmentAccount: Yup.string()
    .trim()
    .when('clientIsBeneficialOwner', {
      is: (val: string) => val === 'proxy',
      then: (schema: Yup.StringSchema) =>
        schema.required('thisFieldIsRequired'),
      otherwise: (schema: Yup.StringSchema) => schema,
    }),

  educationalLevel: Yup.string().trim().required('thisFieldIsRequired'),
});

export type PersonalSchemaType = Yup.InferType<typeof PersonalSchema>;

const FinancialSchema = Yup.object().shape({
  netWorth: Yup.string().trim().required('thisFieldIsRequired'),
  approximateAnnualIncome: Yup.string().trim().required('thisFieldIsRequired'),
  expectedAmountToInvestForEachOpportunity: Yup.string()
    .trim()
    .required('thisFieldIsRequired'),
  investmentPortfolio: Yup.array()
    .min(1, 'thisFieldAtLeastOneItem')
    .of(Yup.string().trim().required('thisFieldIsRequired'))
    .required('thisFieldIsRequired'),
  investmentGoal: Yup.array()
    .min(1, 'thisFieldAtLeastOneItem')
    .of(Yup.string().trim().required('thisFieldIsRequired'))
    .required('thisFieldIsRequired'),
  investmentExperienceYears: Yup.number().required('thisFieldIsRequired'),
  annualIncome: Yup.string().trim().required('thisFieldIsRequired'),
  otherFinancialInformationAboutClient: Yup.string().trim(),
});
export type FinancialSchemaType = Yup.InferType<typeof FinancialSchema>;

const options = ['forTheClient', 'safekeepingCustodian', 'other'];
const ClientClassificationSchema = Yup.object().shape({
  clientShareholdersOrBeneficiariesHoldAmericanCitizenship: Yup.string()
    .oneOf(questionOtions, 'thisFieldIsOneOf')
    .required('thisFieldIsRequired'),
  clientHasAppointedCustodian: Yup.string()
    .oneOf(questionOtions, 'thisFieldIsOneOf')
    .required('thisFieldIsRequired'),
  investmentDocumentDestination: Yup.string()
    .oneOf(options, 'thisFieldIsOneOf')
    .required('thisFieldIsRequired'),
  profitDestination: Yup.string()
    .oneOf(options, 'thisFieldIsOneOf')
    .required('thisFieldIsRequired'),
  proceedDestination: Yup.string()
    .oneOf(options, 'thisFieldIsOneOf')
    .required('thisFieldIsRequired'),
});

export type ClientClassificationSchemaType = Yup.InferType<
  typeof ClientClassificationSchema
>;

const ApprovalDeclarationSchema = Yup.object().shape({
  checked: Yup.array().required(),
  acknowledgmentSigned: Yup.boolean()
    .equals([false])
    .required('thisFieldIsRequired'),
});

export type ApprovalDeclarationSchemaType = Yup.InferType<
  typeof ApprovalDeclarationSchema
>;

export {
  ApprovalDeclarationSchema,
  ClientClassificationSchema,
  FinancialSchema,
  PersonalSchema,
};
