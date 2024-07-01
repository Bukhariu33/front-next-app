import type { BoxProps, ButtonStylesNames } from '@mantine/core';
import { Box, Flex, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import type { ReactNode } from 'react';

import Button from '@/libs/components/Base/Buttons/Button';
import type {
  Namespace,
  TranslationKey,
} from '@/libs/types/utils/withTranslation';
import { cn } from '@/utils/cn';

type PrimaryModalClassNames = 'root' | 'title' | 'message';

type Actions<NS extends Namespace> = {
  onClose: () => void;
  onConfirm: () => void;
  actionsWrapperClassName?: string;
  closeButtonClassNames?: Partial<Record<ButtonStylesNames, string>>;
  confirmButtonClassNames?: Partial<Record<ButtonStylesNames, string>>;
  closeButtonText?: TranslationKey<NS>;
  confirmButtonText?: TranslationKey<NS>;
};

export type ConfirmationModalProps<NS extends Namespace> = {
  nameSpace: NS;
  title: TranslationKey<NS>;
  classNames?: Record<PrimaryModalClassNames, string>;
  children: ReactNode;
} & Actions<NS> &
  Pick<BoxProps, 'className' | 'style'>;

const ConfirmationModal = <NS extends Namespace>({
  className,
  style,
  nameSpace,
  children,
  classNames,
  title,
  actionsWrapperClassName,
  closeButtonClassNames,
  confirmButtonClassNames,
  closeButtonText,
  confirmButtonText,
  onClose,
  onConfirm,
}: ConfirmationModalProps<NS>) => {
  const { t } = useTranslation(nameSpace);
  return (
    <Box
      className={cn(
        'relative grid max-w-[512px] rounded-[16px] bg-white p-[24px]',
        className,
        classNames?.root,
      )}
      style={{
        boxShadow:
          '0px 8px 10px -6px rgba(16, 24, 40, 0.10), 0px 20px 25px -5px rgba(16, 24, 40, 0.10)',
        ...style,
      }}
    >
      <Title
        className={cn(
          'mb-[10px] text-2xl font-bold leading-[1.33333] tracking-[-0.48px] text-brand-primary-main ',
          classNames?.title,
        )}
      >
        {t(title as any)}
      </Title>
      {children}
      <Flex
        className={cn('mt-[30px] w-full gap-[20px]', actionsWrapperClassName)}
      >
        <Button
          namespace={nameSpace}
          text={(confirmButtonText ?? 'yes') as any}
          classNames={confirmButtonClassNames}
          fullWidth
          onClick={onConfirm}
        />
        <Button
          namespace={nameSpace}
          text={(closeButtonText ?? 'no') as any}
          classNames={closeButtonClassNames}
          variant="outlined-black"
          fullWidth
          onClick={onClose}
        />
      </Flex>
    </Box>
  );
};

export default ConfirmationModal;
