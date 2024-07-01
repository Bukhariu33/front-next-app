import { ActionIcon, CopyButton, Divider, Tooltip } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import React from 'react';

import CopyIcon from '@/icons/copy-icon';
import { cn } from '@/utils/cn';

type Props = {
  title: React.ReactNode;
  value: React.ReactNode;
  wrapperClassName?: string;
  titleClassName?: string;
  valueClassName?: string;
  rootClassName?: string;

  withDivider?: boolean;
  withCopy?: boolean;
  dividerOrientation?: 'horizontal' | 'vertical';
};

function CopyToClipboard({ value }: { value: string }) {
  return (
    <CopyButton value={value} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
          <ActionIcon color="primary" variant="subtle" onClick={copy}>
            {copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l5 5l10 -10" />
              </svg>
            ) : (
              <CopyIcon className={cn('stroke-slate-500')} />
            )}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
}

const InfoCard = ({
  title,
  value,
  titleClassName,
  valueClassName,
  rootClassName,
  withCopy,
  withDivider,
  wrapperClassName,
  dividerOrientation,
}: Props) => {
  const { t } = useTranslation();
  return (
    <div
      className={cn('flex gap-5', rootClassName, {
        'flex-col': dividerOrientation === 'horizontal',
      })}
    >
      {withDivider && (
        <Divider orientation={dividerOrientation ?? 'vertical'} />
      )}
      <div className={cn('flex flex-col gap-2', wrapperClassName)}>
        <p className={cn('m-0 text-xs sm:text-base', titleClassName)}>
          {title}
        </p>
        <div className="m-0 flex items-center gap-2  text-sm font-medium sm:text-xl">
          <span className={cn('text-lg font-bold', valueClassName)}>
            {value ?? t('notApplicable')}
          </span>{' '}
          {withCopy && <CopyToClipboard value={value as string} />}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
