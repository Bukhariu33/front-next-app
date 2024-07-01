export interface FundInvestorDetails {
  id: string;
  personalInformation: {
    investorId: string;
    investorName: string;
    idNumber: string;
    birthDate: string;
    nationality: string;
    phoneNumber: string;
    email: string;
    nationalAddress: string;
  };
  investmentInformation: {
    dateTimeOfInvestment: string;
    fundName: string;
    numberOfUnits: number;
    totalWithoutSubscriptionFeesAndValueAddedTax: number;
    valueAddedTax: number;
    subscriptionFees: number;
    total: number;
  };
}

export type APIResponseFundInvestorDetails = APIResponse<FundInvestorDetails>;
