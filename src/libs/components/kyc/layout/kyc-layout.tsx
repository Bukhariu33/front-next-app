import { Box, Flex } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import type { FC, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorBoundaryFallback from '@/libs/components/errorBoundryFallback';
import LowerCircle from '@/libs/components/kyc/LowerCircle';
import { ProgressIndicator } from '@/libs/components/kyc/progress-indicator';
import UpperCircle from '@/libs/components/kyc/UpperCircle';
import { Meta } from '@/libs/components/seo/meta';
import useKycStepper from '@/libs/hooks/kyc/useKycStepper';

const KycLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  const { t } = useTranslation('kyc');
  const { labels, step } = useKycStepper();

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <Meta title="Customer identification form" />
      <Flex
        className="relative my-4 xl:my-8"
        direction={{
          base: 'column',
          lg: 'row',
        }}
      >
        <Box>
          <UpperCircle />
          <LowerCircle />
          <Box className="fixed inset-0 -z-10 backdrop-blur-3xl" />
          <Box className="prose">
            <h4 className="mb-[5px] text-[clamp(1.25rem,1.107rem_+_0.714vw,1.75rem)] font-bold leading-[1.28571] -tracking-[0.56px]">
              {t('customerIdentificationForm')}
            </h4>
            <p className="max-w-[345px] text-sm">
              {t('customerIdentificationFormSubtitle').replace(
                '$username',
                'محمود طارق',
              )}
            </p>
          </Box>
          <ProgressIndicator labels={labels} step={step - 1} />
        </Box>
        {children}
      </Flex>
    </ErrorBoundary>
  );
};

export default KycLayout;
