import type {
  ApprovalDeclarationSchemaType,
  ClientClassificationSchemaType,
  FinancialSchemaType,
  PersonalSchemaType,
} from '@/libs/validations/investor/kyc';

export type CorporateKyc = PersonalSchemaType &
  FinancialSchemaType &
  ApprovalDeclarationSchemaType &
  ClientClassificationSchemaType & { createdAt: string; ipAddress: string };

export type APIResponseCorporateKyc = APIResponse<CorporateKyc>;
