import type { ButtonProps } from '@mantine/core';
import type { OpenConfirmModal } from '@mantine/modals/lib/context';
import type { PropsWithChildren } from 'react';

import type {
  Namespace,
  TranslationKey,
  WithTranslation,
} from '@/libs/types/utils/withTranslation';

import type { modals } from '.';

declare module '@mantine/modals' {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}

type WithTranslate<T extends Namespace> = {
  translate: true;
  body: TranslationKey<T>;
};
type WithoutTranslate = {
  translate?: false;
  body: string;
};

type Translatable<T extends Namespace> = WithTranslate<T> | WithoutTranslate;

interface BaseModalProps<T extends Namespace> extends WithTranslation<T> {
  id: string;
  body: TranslationKey<T>;
  title?: TranslationKey<T>;
  classNames?: {
    body?: string;
    message?: string;
  };
  onClose?: () => void;
}

type ModalProps<T extends Namespace> = PropsWithChildren<BaseModalProps<T>>;

interface ConfirmModalProps<T extends Namespace>
  extends Omit<OpenConfirmModal, 'title' | 'labels' | 'translate'> {
  id: string;
  namespace?: T;
  title?: TranslationKey<T> | 'confirmationModalTitle';
  body?: TranslationKey<T>;
  labels?: {
    confirm?: TranslationKey<T>;
    cancel?: TranslationKey<T>;
  };
  cancelProps?: ButtonProps & React.ComponentPropsWithoutRef<'button'>;
  confirmProps?: ButtonProps &
    React.ComponentPropsWithoutRef<'button'> & {
      'data-cy-button'?: string;
    };

  classNames?: {
    body?: string;
    message?: string;
  };

  onCancel?(): void;
  onConfirm?(): void;
  children?: React.ReactNode[] | React.ReactNode;
}

interface ErrorModalProps<T extends Namespace>
  extends Omit<
    ConfirmModalProps<T>,
    'onConfirm' | 'confirmProps' | 'body' | 'labels'
  > {
  tryAgainProps?: ButtonProps & React.ComponentPropsWithoutRef<'button'>;
  labels?: {
    tryAgain?: TranslationKey<T>;
    cancel?: TranslationKey<T>;
  };
  onTryAgain(): void;
}

export type {
  BaseModalProps,
  ConfirmModalProps,
  ErrorModalProps,
  ModalProps,
  Translatable,
  WithoutTranslate,
  WithTranslate,
};
