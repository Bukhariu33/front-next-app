const adminSettingsMock = {
  fundAssetsClassOptions: [
    { key: 'private', label: 'Private', id: 'id1' },
    { key: 'public', label: 'Public', id: 'id2' },
  ],
  fundMangerNameOptions: [
    { key: 'manager1', label: 'John Doe', id: 'id1' },
    { key: 'manager2', label: 'Jane Smith', id: 'id2' },
    { key: 'manager3', label: 'Alex Johnson', id: 'id3' },
    { key: 'manager4', label: 'Emily Brown', id: 'id4' },
    { key: 'manager5', label: 'Chris Wilson', id: 'id5' },
  ],
  fundTypeOptions: [
    {
      key: 'realEstateDevelopmentFund',
      label: 'Real Estate Development',
      id: 'id1',
    },
    {
      key: 'infrastructureDevelopmentFund',
      label: 'Infrastructure Development',
      id: 'id2',
    },
    {
      key: 'incomeGeneratingRealEstateFund',
      label: 'Income Generating Real Estate',
      id: 'id3',
    },
    { key: 'ventureCapitalFund', label: 'Venture Capital', id: 'id4' },
    { key: 'moneyMarketFund', label: 'Money Market', id: 'id5' },
    { key: 'stockFund', label: 'Stock', id: 'id6' },
    { key: 'fixedIncomeFund', label: 'Fixed Income', id: 'id7' },
    { key: 'directFinancingFund', label: 'Direct Financing', id: 'id8' },
  ],
  fundCityOptions: [
    { key: 'city1', label: 'New York City', id: 'id1' },
    { key: 'city2', label: 'London', id: 'id2' },
    { key: 'city3', label: 'Tokyo', id: 'id3' },
    { key: 'city4', label: 'Sydney', id: 'id4' },
    { key: 'city5', label: 'Mumbai', id: 'id5' },
  ],
  durationOptions: Array.from({ length: 120 }, (_, i) => ({
    key: `${i + 1}`,
    label: `${i + 1} Months`,
    id: `id${i + 1}`,
  })),

  currencyOptions: [
    { key: 'USD', label: 'USD', id: 'id1' },
    { key: 'EUR', label: 'EUR', id: 'id2' },
    { key: 'GBP', label: 'GBP', id: 'id3' },
    { key: 'JPY', label: 'JPY', id: 'id4' },
    { key: 'AUD', label: 'AUD', id: 'id5' },
  ],
  imageDimensionOptions: [
    { key: '800x600', label: '800x600', id: 'id1' },
    { key: '1200x900', label: '1200x900', id: 'id2' },
    { key: '1920x1080', label: '1920x1080', id: 'id3' },
    { key: '2560x1440', label: '2560x1440', id: 'id5' },
  ],
  cancelInvestmentOptions: [
    { label: 'Incomplete KYC', key: 'incompleteKYC' },
    { label: 'Non-compliance with AML, CFT or PEP', key: 'nonCompliance' },
    { label: 'Exceeding Investment Limit', key: 'exceedingInvestmentLimit' },
    { label: 'Investor Age Restriction', key: 'investorAgeRestriction' },
    { label: 'Mismatched Risk Tolerance', key: 'mismatchedRiskTolerance' },
    { label: 'Non-Disclosure of Conflict of Interest', key: 'nonDisclosure' },
    {
      label: 'Expired Identification Documents',
      key: 'expiredIdentificationDocuments',
    },
  ],

  paymentFrequencyOptions: [
    { key: 'onMaturity', label: 'On Maturity', id: 'id1' },
    { key: 'monthly', label: 'Monthly', id: 'id2' },
    { key: 'quarterly', label: 'Quarterly', id: 'id3' },
    { key: 'semiAnnual', label: 'Semi-Annual', id: 'id4' },
    { key: 'annually', label: 'Annually', id: 'id5' },
  ],
};

export default adminSettingsMock;
