export type Purchase = {
  id: string;
  invoice: string;
  units: number;
  subscriptionFees: number;
  vat: number;
  total: number;
  dateTime: string;
};

export interface InvestorInvestmentInfo {
  investmentDocsAndInvoice: Attachment[];
  suitabilityAssessment: 'suitable' | 'unsuitable'; // un till we have the actual type
  purchases: Purchase[];
}

export type APIResponseInvestorInvestmentInfo =
  APIResponse<InvestorInvestmentInfo>;
