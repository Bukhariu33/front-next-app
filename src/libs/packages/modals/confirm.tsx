import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { Trans, useTranslation } from 'next-i18next';

import type { Namespace } from '@/libs/types/utils/withTranslation';
import { cn } from '@/utils/cn';
import mergeMantineClassNames from '@/utils/mergeMantineClassNames';

import { baseModalConfig } from './base-modal';
import type { ConfirmModalProps } from './types';

const ConfirmationModal = <T extends Namespace>({
  body,
  children,
  classNames,
  namespace,
  translate,
}: Partial<
  Pick<
    ConfirmModalProps<T>,
    'body' | 'children' | 'namespace' | 'classNames'
  > & {
    translate?: boolean;
  }
>) => {
  const useDefaultBody = !namespace && !body;
  const { t } = useTranslation([namespace, 'common']);
  const message = translate
    ? t(useDefaultBody ? 'confirmationModalMessage' : (body as any), {
        ns: ['common', namespace as any],
      })
    : (body as any);

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-between gap-4',
        classNames?.body,
      )}
    >
      {message && (
        <Text className={cn('font-medium', classNames?.message)}>
          {message}
        </Text>
      )}
      {children}
    </div>
  );
};

export function openConfirmationModal<T extends Namespace>({
  id,
  namespace = 'common' as T,
  cancelProps,
  confirmProps = {
    'data-cy-button': 'confirm-modal',
  },
  labels,
  onCancel,
  onConfirm,
  title = 'confirmationModalTitle',
  body,
  children,
  classNames,
  translate = true,
  ...props
}: Partial<ConfirmModalProps<T>> & {
  id: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  translate?: boolean;
}) {
  const { classNames: defaultClassNames, ...defaultProps } = baseModalConfig;
  const showDefaultLabels = (key: 'cancel' | 'confirm') =>
    namespace && labels?.[key];
  return modals.openConfirmModal({
    ...props,
    title: (
      <Trans noValidate ns={namespace}>
        {title as string}
      </Trans>
    ),
    modalId: id,
    children: (
      <ConfirmationModal<T>
        body={body ?? ('confirmationModalMessage' as any)}
        namespace={namespace}
        classNames={classNames}
        translate={translate}
      >
        {children}
      </ConfirmationModal>
    ),
    classNames: mergeMantineClassNames(
      {
        title: 'font-bold text-gray-700',
      },
      defaultClassNames,
    ) as Record<string, string>,
    onCancel,
    onConfirm,
    groupProps: {
      className: cn('grid grid-cols-2 gap-4', props.groupProps?.className),
      ...props.groupProps,
    },
    labels: {
      cancel: (
        <Trans noValidate ns={namespace || 'common'}>
          {showDefaultLabels('cancel') ? (labels?.cancel as any) : 'cancel'}
        </Trans>
      ),
      confirm: (
        <Trans noValidate ns={namespace || 'common'}>
          {showDefaultLabels('confirm') ? (labels?.confirm as any) : 'confirm'}
        </Trans>
      ),
    },
    cancelProps: {
      ...cancelProps,
      classNames: {
        label: 'overflow-visible',
      },
      h: 42,
    },
    confirmProps: {
      ...confirmProps,
      h: 42,
      classNames: {
        label: 'overflow-visible',
      },
    },
    ...defaultProps,
  });
}
