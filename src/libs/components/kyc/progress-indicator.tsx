import { Box, Stepper } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useTranslation } from 'next-i18next';

import CheckMarkIcon from '@/icons/checkmark-icon';
import type { KycTranslationKeys } from '@/libs/types/kyc';
import { cn } from '@/utils/cn';

interface ProgressIndicatorProps {
  labels: KycTranslationKeys[];
  step: number;
}

const ProgressIndicator = ({ step, labels }: ProgressIndicatorProps) => {
  const { t } = useTranslation('kyc');
  const isTablet = useMediaQuery('(max-width:680px)');

  return (
    <Box>
      <Stepper
        data-cy="kyc-stepper"
        active={step}
        orientation={isTablet ? 'horizontal' : 'vertical'}
        size="sm"
        completedIcon={<CheckMarkIcon />}
        classNames={{
          root: cn('mt-[24px]', {
            'ml-[16px]': !isTablet,
            'mb-[24px]': isTablet,
          }),
          step: cn({ 'mt-0 min-h-fit pb-[18px] h-[72px]': !isTablet }),
          stepIcon: cn({
            'items-start border-[2px] border-neutral-200 bg-transparent text-base font-normal leading-[1.5] overflow-hidden':
              !isTablet,
          }),
          stepCompletedIcon: cn({ 'bg-brand-primary-main': !isTablet }),
          stepBody: cn({ 'ml-[1rem]': isTablet }),
          stepLabel: cn({
            'text-2xl font-bold leading-[1]': !isTablet,
            hidden: isTablet,
          }),
          verticalSeparator: cn({
            'border-neutral-200 left-[50%] -translate-x-[50%] -z-10 top-[2.25rem]':
              !isTablet,
          }),
          // verticalSeparatorActive: 'bg-neutral-200',
          separator: cn({
            'ltr:ml-0': isTablet,
          }),
        }}
      >
        {labels.map((label, index) => (
          <Stepper.Step
            key={+index}
            icon={<>0{index + 1}</>}
            label={t(label)}
          />
        ))}
      </Stepper>
    </Box>
  );
};

export { ProgressIndicator };
