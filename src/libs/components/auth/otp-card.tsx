import { PinInput, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';

import useTimer from '@/libs/hooks/useTimer';
import { cn } from '@/utils/cn';
import { formatTime } from '@/utils/formatTime';

import Button from '../Base/Buttons/Button';
import ReplaceTranslationKey from '../utils/ReplaceTranslationKey';
import {
  AuthCard,
  AuthCardBody,
  AuthCardFooter,
  AuthCardHeader,
} from './select-role';

interface OtpCardProps {
  length?: number;
  send: (value: string) => void;
  reSend: () => void;
  isInvalid?: boolean;
  mobile: string;
  classNames?: {
    root?: string;
    title?: string;
    subtitle?: string;
  };
}
const OtpCard = ({
  length = 4,
  isInvalid,
  reSend,
  send,
  mobile,
  classNames,
}: OtpCardProps) => {
  const { t } = useTranslation('common');
  const { timer, isDisabled, startTimer } = useTimer(10);
  const [value, setValue] = React.useState('');

  const formattedValue = '+966xxxxxx243'.replace('243', mobile?.slice(-3));
  useEffect(() => {
    startTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AuthCard
      className={cn(
        'flex flex-col justify-between pt-16 sm:h-full',
        classNames?.root,
      )}
    >
      <AuthCardHeader>
        <Text
          className={cn(
            'mb-5 text-[24px] font-bold sm:text-[32px]',
            classNames?.title,
          )}
        >
          {t('verificationCode')}
        </Text>
        <ReplaceTranslationKey
          text={t('verificationCodeInstructions')}
          className={cn(
            'text-[14px] font-medium text-neutral-600 sm:px-12 sm:text-[20px]',
            classNames?.subtitle,
          )}
          values={{
            number: <span dir="ltr">{formattedValue}</span>,
          }}
        />
      </AuthCardHeader>
      <AuthCardBody className="mb-4 mt-16 flex justify-center">
        <PinInput
          name="otp"
          length={length}
          placeholder=""
          type="number"
          onChange={setValue}
          onComplete={() => send(value)}
          autoFocus
          value={value}
          dir="ltr"
          classNames={{
            input: cn(
              'text-black w-[43px] sm:w-16 h-10 text-[18px] sm:text-[28px] font-medium bg-white border-b-1 border-solid border-transparent border-b-[#D9D9D9] focus:border-b-2 focus:border-b-brand-primary-main rounded-none focus:ring-transparent',
              {
                'border-b-2 border-solid border-b-red-500': isInvalid,
                'border-b-2 border-solid border-b-brand-primary-main':
                  value.length === length,
              },
            ),
            root: 'flex justify-between sm:gap-9',
            pinInput: 'flex justify-center',
          }}
        />
      </AuthCardBody>
      <AuthCardFooter>
        <div className="flex w-full flex-col items-center justify-center sm:px-[24px]">
          <Text className="font-bold">{formatTime(timer)}</Text>
          <Button
            variant="primary"
            namespace="common"
            text="verify"
            className="mb-8 mt-4 w-full font-bold"
            disabled={value.length !== length}
            onClick={() => send(value)}
          />
          <Button
            variant="unstyled"
            namespace="common"
            disabled={isDisabled}
            text="resendCode"
            onClick={() => {
              reSend();
              startTimer();
              setValue('');
            }}
            className="text-sm font-medium disabled:bg-white disabled:text-brand-accent-500 sm:text-base"
          />
        </div>
      </AuthCardFooter>
    </AuthCard>
  );
};

export default OtpCard;
