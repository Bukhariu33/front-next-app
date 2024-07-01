import type {
  ApprovalDeclarationSchemaType,
  FinancialSchemaType,
  PersonalSchemaType,
} from '@/libs/validations/investor/kyc';

export type IndividualKyc = PersonalSchemaType &
  FinancialSchemaType &
  ApprovalDeclarationSchemaType & { createdAt: string; ipAddress: string };

export type APIResponseIndividualKyc = APIResponse<IndividualKyc>;
