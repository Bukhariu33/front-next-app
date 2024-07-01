// eslint-disable-next-line simple-import-sort/imports
import type { CardProps, CardSectionProps } from '@mantine/core';
import { Box, Card, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import type { Dispatch, SetStateAction } from 'react';

import CorporateInvestorIcon from '@/icons/corporate-investor-icon';
import InvestorIcon from '@/icons/investor-icon';
import { useAuth } from '@/libs/hooks/auth/useAuth';
import { cn } from '@/utils/cn';

import Button from '../Base/Buttons/Button';

export const AuthCard: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <Card
      {...props}
      className={cn(
        'w-[90%] max-w-[450px] rounded-2xl shadow-sm sm:max-w-[600px] ',
        props.className,
      )}
    >
      {children}
    </Card>
  );
};

interface AuthCardSectionProps extends CardSectionProps {
  children: React.ReactNode;
}

export const AuthCardHeader = ({
  children,
  ...props
}: AuthCardSectionProps) => {
  return (
    <Card.Section className=" px-4 text-center" {...props}>
      {children}
    </Card.Section>
  );
};

export const AuthCardBody = ({ children, ...props }: AuthCardSectionProps) => {
  return (
    <Card.Section {...props} className={cn('px-8', props.className)}>
      {children}
    </Card.Section>
  );
};

interface AuthCardFooterProps extends CardSectionProps {
  withBackButton?: boolean;
  backButtonOnClick?: () => void;
  children: React.ReactNode;
}

export const AuthCardFooter: React.FC<AuthCardFooterProps> = ({
  children,
  withBackButton,
  backButtonOnClick,
  className,
  ...props
}) => {
  const router = useRouter();
  return (
    <Card.Section className={cn('px-4 py-4 text-center', className)} {...props}>
      <div className="mt-5 flex gap-2 sm:mt-8">
        {withBackButton && (
          <Button
            namespace="common"
            text="back"
            variant="outlined-black"
            onClick={backButtonOnClick || router.back}
            className="w-2/5 text-base"
          />
        )}

        {children}
      </div>
    </Card.Section>
  );
};

export const UserCard = ({
  Icon,
  label,
  onClick,
  active,
  'data-cy-id': dataCyId,
}: {
  label: string;
  Icon: React.FC<any>;
  active?: boolean;
  onClick?: () => void;
  'data-cy-id'?: string;
}) => {
  return (
    <Box
      onClick={onClick}
      data-cy-id={dataCyId}
      className={cn(
        'flex cursor-pointer flex-col items-center justify-around rounded-2xl stroke-brand-accent-500 px-2 py-7 text-center text-brand-accent-500 shadow-sm hover:bg-[#e4e4e43b] sm:min-h-[160px] md:px-8',
        {
          'bg-[#FFCA2826] stroke-brand-primary-main font-bold text-brand-primary-main hover:bg-[#FFCA2826]':
            active,
        },
      )}
    >
      <Icon />
      <Text className="mt-2 text-sm sm:text-xl">{label}</Text>
    </Box>
  );
};

type SelectRoleProps = {
  setType: Dispatch<SetStateAction<'' | 'investor' | 'fundManager'>>;
};

export const SelectRole = ({ setType }: SelectRoleProps) => {
  const { t } = useTranslation('auth');
  const { setUserType } = useAuth();

  return (
    <div className="grid grid-cols-2 gap-4">
      <UserCard
        Icon={InvestorIcon}
        label={t('investorType')}
        data-cy-id="investor"
        onClick={() => {
          setUserType(null);
          setType('investor');
        }}
      />
    </div>
  );
};

export const SelectInvestorType = () => {
  const { t } = useTranslation('auth');
  const { auth, setUserType } = useAuth();

  return (
    <div className="grid  grid-cols-2 gap-4">
      <UserCard
        Icon={CorporateInvestorIcon}
        label={t('corporateInvestor')}
        data-cy-id="corporateInvestor"
        active={auth?.userType === 'corporateInvestor'}
        onClick={() => {
          setUserType('corporateInvestor');
        }}
      />
      <UserCard
        Icon={InvestorIcon}
        label={t('individualInvestor')}
        data-cy-id="individualInvestor"
        active={auth?.userType === 'individualInvestor'}
        onClick={() => {
          setUserType('individualInvestor');
        }}
      />
    </div>
  );
};
