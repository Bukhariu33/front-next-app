export interface BaseFundAnalysis {
  highestAmountInvested: number;
  averageInvestments: number;
  mostFrequentlyInvestedAmount: number;
  investors: {
    total: number;
    maleInvestors: number;
    femaleInvestors: number;
  };
  investedAmountByNationality: {
    saudi: number;
    nonSaudi: number;
  };
  investorsAgeRange: {
    '18-24': number;
    '25-34': number;
    '35-44': number;
    '45-54': number;
    '55+': number;
  };
}
