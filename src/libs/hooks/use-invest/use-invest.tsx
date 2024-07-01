import { modals } from '@mantine/modals';
import type { NextRouter } from 'next/router';
import { useRouter } from 'next/router';
import type { User } from 'next-auth';

import { openErrorModal } from '@/libs/packages/modals';

import { axiosInternal } from '../../configs/axios';
import type { Purchase } from '../../types/investors/investments/investment-fund-data';
import { useMutation } from '../use-mutation';
import useUser from '../useUser';
import InvestSuccessModal from './InvestSuccessModal';

type Props = {
  fund?: {
    id: string;
    unitPrice: number;
  };
};

const checkIsQualifiedInvestorOrThrow = async (
  user: User,
  amount: number,
  push: (url: string) => void,
) => {
  if (amount >= 20_000 && !user?.isQualified) {
    openErrorModal({
      id: 'not-qualified',
      body: 'notQualifiedInvestor',
      translate: true,
      namespace: 'common',
      labels: {
        tryAgain: 'upgradeMyAccount',
      },
      onTryAgain() {
        return push('/investor/requests/new');
      },
    });
    return Promise.reject();
  }
  return Promise.resolve();
};

const checkIsKycCompletedOrThrow = async (user: User, router: NextRouter) => {
  if (!user?.isKycComplete) {
    openErrorModal({
      id: 'kyc-not-completed',
      namespace: 'kyc',
      translate: true,
      body: 'completeKycMsg',
      title: 'completeKycTitle',
      withCloseButton: false,
      onTryAgain() {
        return router.push('/investor/kyc/personal-information');
      },
      closeOnEscape: false,
      closeOnClickOutside: false,
      closeOnCancel: false,
      cancelProps: {
        disabled: true,
        display: 'none',
      },
      tryAgainProps: {
        className: 'w-full',
      },
      groupProps: {
        className: 'w-full flex flex-col',
      },
      labels: {
        tryAgain: 'completeKycButton',
      },
      onClose() {
        return router.push(`/investor/funds/${router.query.fundId}`);
      },
    });
    return Promise.reject();
  }
  return Promise.resolve();
};
export const useInvest = ({ fund }: Props) => {
  const { user } = useUser();
  const router = useRouter();
  const { mutate: invest, isLoading } = useMutation({
    mutationFn: async (units: number) => {
      if (!fund) throw new Error('Fund is not defined');
      if (!user) throw new Error('User is not defined');
      await checkIsKycCompletedOrThrow(user, router);
      await checkIsQualifiedInvestorOrThrow(
        user,
        units * fund.unitPrice,
        router.push,
      );
      const { data } = await axiosInternal.post<APIResponse<Purchase>>(
        `/investor/funds/${fund.id}/invest`,
        {
          units,
          userId: user?.id, // this is just for the mock API
        },
      );
      return data.data;
    },
    onSuccess: data => {
      modals.open({
        size: '1000px',
        children: <InvestSuccessModal {...data} />,
        onClose() {
          router.push(`/investor/my-investments`);
        },
        classNames: {
          content: 'bg-white rounded-xl shadow-sm',
        },
      });
    },
  });
  return {
    invest,
    isLoading,
    checkIsKycCompletedOrThrow: () =>
      user && checkIsKycCompletedOrThrow(user, router),
  };
};
