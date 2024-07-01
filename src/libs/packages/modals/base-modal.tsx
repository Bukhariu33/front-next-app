import { Text } from '@mantine/core';
import { type ContextModalProps } from '@mantine/modals';
import { useTranslation } from 'next-i18next';
import type { ComponentPropsWithRef, PropsWithChildren } from 'react';

import Button from '@/libs/components/Base/Buttons/Button';
import mergeMantineClassNames from '@/utils/mergeMantineClassNames';

import type { ModalProps } from './types';

export type ModalComponentProps = PropsWithChildren<
  ContextModalProps<ModalProps<any>>
> & {
  classNames?: {
    body?: string;
    message?: string;
    closeButtonClassNames?: ComponentPropsWithRef<typeof Button>['classNames'];
  };
};

export const BaseModal = ({
  context,
  id,
  innerProps,
}: Omit<ModalComponentProps, 'classNames'>) => {
  const { body, namespace, classNames, children } = innerProps;
  const { t } = useTranslation([namespace, 'common']);
  const message = t(body as any, { ns: ['common', namespace as any] });

  return (
    <>
      <div className={classNames?.body}>
        <Text className={classNames?.message} size="md">
          {message}
        </Text>
        {children}
      </div>
      <Button
        namespace="common"
        classNames={mergeMantineClassNames(
          {
            root: 'bg-gray-200 hover:bg-gray-300 text-gray-700 h-12',
          },
          classNames,
        )}
        text="close"
        data-cy-button="close"
        fullWidth
        mt="md"
        onClick={() => context.closeModal(id)}
      />
    </>
  );
};

export const baseModalConfig = {
  centered: true,
  classNames: {
    title: 'font-bold text-gray-700',
  },
} as const;
