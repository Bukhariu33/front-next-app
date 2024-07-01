import { openContextModal } from '@mantine/modals';
import { Trans } from 'next-i18next';

import type { Namespace } from '@/libs/types/utils/withTranslation';

import type { ModalComponentProps } from './base-modal';
import { BaseModal, baseModalConfig } from './base-modal';
import type { ModalProps } from './types';

export const InfoModal = ({ context, id, innerProps }: ModalComponentProps) => (
  <BaseModal {...{ context, id, innerProps }} />
);

export function openInfoModal<T extends Namespace>(innerProps: ModalProps<T>) {
  openContextModal({
    modal: 'info',
    modalId: innerProps.id,
    innerProps,
    title: (
      <Trans noValidate ns={innerProps.namespace}>
        {innerProps.title as any}
      </Trans>
    ),
    onClose: innerProps.onClose,
    ...baseModalConfig,
  });
}
