export interface BaseFund {
  id: string;
  code: string;
  name: string;
  assetsClass: string;

  fundManagerId: string;
  fundManagerName: string;

  type: string;
  city?: string;
  coverage: number;
  minCoverage: number;
  minInvestment: number;
  investmentStartingDate: string;
  investmentEndingDate: string;

  expectedRoi: number;
  durationInMonths: number;
  paymentFrequency:
    | 'onMaturity'
    | 'monthly'
    | 'quarterly'
    | 'semiAnnual'
    | 'annually';

  status:
    | 'pendingApproval'
    | 'fundRejected'
    | 'fundApproved'
    | 'contractApproved'
    | 'contractRejected'
    | 'fundSchedule'
    | 'live'
    | 'partiallyFunded'
    | 'funded'
    | 'underRepayment'
    | 'completed';

  unitPrice: number;
  takenUnits: number;

  units: number;
  fees: {
    subscription: number;
    distribution: number;
  };

  attachments: Attachment[];
  generalInformation: string;
  financialInformation: string;
  updates: string;

  fundImages: [string, ...string[]];

  location?: {
    lng: number;
    lat: number;
  };

  fundTeam: {
    id: string;
    image: string;
    name: string;
    position: string;
  }[];

  riskMessage?: string;

  createdAt: string;
  updatedAt: string;
}

export interface PublishFundPayload {
  startDate: string;
  startTime: string;
}
