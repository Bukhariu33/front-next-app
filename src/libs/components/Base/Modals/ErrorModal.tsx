import { Flex, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import ErrorIcon from '@/icons/error-icon';
import type { ConfirmationModalProps } from '@/libs/components/Base/Modals/ConfirmationModal';
import ConfirmationModal from '@/libs/components/Base/Modals/ConfirmationModal';
import type {
  Namespace,
  TranslationKey,
} from '@/libs/types/utils/withTranslation';
import { cn } from '@/utils/cn';
import mergeMantineClassNames from '@/utils/mergeMantineClassNames';

type ErrorModalProps<NS extends Namespace> = Omit<
  ConfirmationModalProps<NS>,
  'children'
> & {
  message: TranslationKey<NS>;
};

const ErrorModal = <NS extends Namespace>({
  message,
  ...props
}: ErrorModalProps<NS>) => {
  const { t } = useTranslation(props.nameSpace);
  return (
    <ConfirmationModal
      {...props}
      classNames={
        mergeMantineClassNames(
          {
            title: 'text-brand-danger',
          },
          props.classNames,
        ) as Record<string, string>
      }
      confirmButtonClassNames={
        mergeMantineClassNames(
          {
            root: 'bg-black hover:bg-black/75',
          },
          props.confirmButtonClassNames,
        ) as Record<string, string>
      }
    >
      <Flex className="justify-between">
        <Title
          className={cn(
            'min-h-[48px] max-w-[295px] text-lg font-medium leading-[1.33333] text-[#1A1A1D]',
            props.classNames?.message,
          )}
        >
          {t(message as any)}
        </Title>
        <ErrorIcon className="absolute top-[24px] ltr:right-[24px] rtl:left-[24px]" />
      </Flex>
    </ConfirmationModal>
  );
};

export default ErrorModal;
