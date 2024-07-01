import type {
  ButtonProps as BaseButtonProps,
  ButtonStylesNames,
} from '@mantine/core';
import { Button as BaseButton } from '@mantine/core';
import type { Resources } from 'i18next';
import React from 'react';

import ViewIcon from '@/libs/icons/view-icon';
import { cn } from '@/utils/cn';
import mergeMantineClassNames from '@/utils/mergeMantineClassNames';

type Namespace = keyof Resources;
export type Variants =
  | 'primary'
  | 'outlined'
  | 'black'
  | 'outlined-black'
  | 'floating-white'
  | 'outlined-error'
  | 'unstyled'
  | 'view'
  | 'plain-white'
  | 'yellow';
interface ButtonProps<T extends Namespace>
  extends Omit<BaseButtonProps, 'children' | 'color' | 'variant' | 'style'>,
    React.ComponentPropsWithoutRef<'button'> {
  namespace: T;
  text: any;
  icon?: React.ReactNode;
  variant?: Variants;
  renderRoot?: (props: any) => JSX.Element;
}

const rootStyle =
  'sm:px-12 rounded-lg h-[3.2rem] disabled:bg-gray-200 disabled:text-brand-disabledText disabled:border-none duration-200 ease-in-out';

const variants: Record<Variants, Partial<Record<ButtonStylesNames, string>>> = {
  primary: {
    root: cn(
      'bg-brand-primary-main hover:bg-brand-primary-dark px-6 ',
      rootStyle,
    ),
    section: 'stroke-white',
  },
  'plain-white': {
    root: cn('bg-[#fff] text-black shadow-sm', rootStyle),
    section: 'stroke-white',
  },
  black: {
    root: cn('bg-black text-white hover:bg-gray-800 px-6 ', rootStyle),
    section: 'stroke-black',
  },
  outlined: {
    root: cn(
      'bg-[#FFFDF5] border border-brand-primary-main px-6  text-brand-primary-main hover:bg-[#FFFBE0]',
      rootStyle,
    ),
    label: ' font-bold ',
    section: 'stroke-brand-primary-main',
  },
  view: {
    root: cn('bg-[#ededed] text-[#64646C]', rootStyle),
    label: 'font-bold',
    section: 'stroke-black',
  },
  'outlined-black': {
    root: cn(
      'bg-white border border-black px-6  text-black hover:bg-[#EEEEEE]',
      rootStyle,
    ),
    label: ' font-bold ',
    section: 'stroke-black',
  },
  'floating-white': {
    root: cn(
      rootStyle,
      'disabled:bg-[#F5F7F9] disabled:text-brand-disabledText disabled:border-none',
      'bg-brand-primary-main hover:bg-brand-primary-dark px-6',
    ),
  },
  unstyled: {
    root: cn(
      'px-6  rounded-lg h-[3.2rem] bg-white text-brand-primary-main',
      rootStyle,
    ),
  },

  'outlined-error': {
    root: cn(
      'bg-white border border-brand-danger px-6  text-brand-danger hover:bg-[#EEEEEE]',
      rootStyle,
    ),
    label: ' font-bold ',
    section: 'stroke-brand-danger',
  },
  yellow: {
    root: cn('bg-[#FFF8E6]', rootStyle),
    label: ' font-bold ',
  },
};

// In the component definition, we use generics to capture the specific namespace.
const Button = <T extends Namespace>(props: ButtonProps<T>) => {
  // `useTranslation` is a hook that returns a translation function `t`

  // Here, `text as any` is used to bypass TypeScript's type checking.
  // The `t` function from `useTranslation` may have its own set of expected types for the text argument but we insured that the text will be included in the namespace. ex: namespace='common' will only allow the text in the common space
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { variant, icon, ...rest } = props;
  return (
    <BaseButton
      loaderProps={{
        color: 'primary',
      }}
      rightSection={
        variant === 'view' || variant === 'yellow' ? (
          <ViewIcon className="rtl:rotate-180" />
        ) : (
          icon
        )
      }
      {...rest}
      classNames={mergeMantineClassNames(
        variants[variant ?? 'primary'],
        rest.classNames as Partial<Record<ButtonStylesNames, string>>,
      )}
    >
      {props.children}
      {props.text}
    </BaseButton>
  );
};

export default Button;
