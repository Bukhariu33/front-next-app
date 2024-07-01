import useUser from '../useUser';
import useCorporateKyc from './useCorporateKyc';
import useIndividualKyc from './useIndividualKyc';

const useInvestorKyc = () => {
  const { user } = useUser();
  const userType = user?.type;
  const corporateKycData = useCorporateKyc();
  const individualKycData = useIndividualKyc();

  if (userType === 'corporateInvestor') {
    return corporateKycData;
  }

  if (userType === 'individualInvestor') {
    return individualKycData;
  }

  throw new Error('Invalid user type');
};

export default useInvestorKyc;
