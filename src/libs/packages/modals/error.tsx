import ErrorIcon from '@/icons/error-icon';
import type {
  Namespace,
  TranslationKey,
} from '@/libs/types/utils/withTranslation';
import { cn } from '@/utils/cn';

import { openConfirmationModal } from './confirm';
import type { ErrorModalProps } from './types';

interface IErrorModalPropsWithTranslation<T extends Namespace>
  extends ErrorModalProps<T> {
  namespace?: T;
  body: TranslationKey<T>;
  translate: true;
}

interface IErrorModalPropsWithoutTranslation<T extends Namespace>
  extends ErrorModalProps<T> {
  body: string;
  translate?: false;
}

type IErrorModalProps<T extends Namespace> =
  | IErrorModalPropsWithTranslation<T>
  | IErrorModalPropsWithoutTranslation<T>;

export function openErrorModal<T extends Namespace>({
  id,
  body,
  namespace,
  onTryAgain,
  onCancel,
  ...rest
}: IErrorModalProps<T>) {
  return openConfirmationModal({
    id,
    ...rest,
    onConfirm: onTryAgain,
    onCancel,
    cancelProps: rest.cancelProps,
    translate: rest.translate,
    children: (
      <ErrorIcon
        height={60}
        width={52}
        style={{
          marginInlineEnd: '1rem',
        }}
      />
    ),
    classNames: {
      body: cn(
        'flex-row items-center justify-between gap-4',
        rest.classNames?.body,
      ),
      message: cn('max-w-[36ch]', rest.classNames?.message),
    },
    confirmProps: {
      ...rest.tryAgainProps,
      color: 'red',
    },
    labels: {
      confirm: rest.labels?.tryAgain ?? ('tryAgain' as any),
      cancel: rest.labels?.cancel ?? ('cancel' as any),
    },
    title: (rest.title as any) ?? 'errorModalTitle',
    body: (body as any) ?? 'errorModalMessage',
    namespace,
  });
}
