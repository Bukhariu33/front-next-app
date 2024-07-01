import SuccessIcon from '@/icons/success-icon';
import type { Namespace } from '@/libs/types/utils/withTranslation';
import { cn } from '@/utils/cn';

import { openInfoModal } from './info-modal';
import type { ConfirmModalProps } from './types';

export function openSuccessModal<T extends Namespace>({
  body,
  id,
  namespace,
  ...innerProps
}: ConfirmModalProps<T> & {
  id: string;
}) {
  if (id === 'success') {
    throw new Error(
      'Don\'t use "success" as id for success modal, don\'t be lazy!',
    );
  }
  return openInfoModal({
    ...innerProps,
    id,
    title: innerProps.title ?? ('success' as any),
    body: !body ? 'successModalMessage' : (body as any),
    namespace: namespace ?? 'common',
    classNames: {
      message: cn('max-w-[36ch]', innerProps.classNames?.message),

      body: cn(
        innerProps.classNames?.body,
        'flex items-center justify-between gap-4',
      ),
    },
    children: (
      <SuccessIcon
        height={60}
        width={52}
        style={{
          marginInlineEnd: '1rem',
        }}
      />
    ),
  });
}
