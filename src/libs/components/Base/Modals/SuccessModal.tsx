import { Flex, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import SuccessIcon from '@/icons/success-icon';
import type { ConfirmationModalProps } from '@/libs/components/Base/Modals/ConfirmationModal';
import ConfirmationModal from '@/libs/components/Base/Modals/ConfirmationModal';
import type {
  Namespace,
  TranslationKey,
} from '@/libs/types/utils/withTranslation';
import { cn } from '@/utils/cn';

type SuccessModalProps<NS extends Namespace> = Omit<
  ConfirmationModalProps<NS>,
  'children'
> & {
  message: TranslationKey<NS>;
};

const SuccessModal = <NS extends Namespace>({
  message,
  ...props
}: SuccessModalProps<NS>) => {
  const { t } = useTranslation(props.nameSpace);
  return (
    <ConfirmationModal {...props}>
      <Flex className="justify-between">
        <Title
          className={cn(
            'min-h-[48px] max-w-[295px] text-lg font-medium leading-[1.33333] text-[#1A1A1D]',
            props.classNames?.message,
          )}
        >
          {t(message as any)}
        </Title>
        <SuccessIcon className="absolute top-[24px] ltr:right-[24px] rtl:left-[24px]" />
      </Flex>
    </ConfirmationModal>
  );
};

export default SuccessModal;
