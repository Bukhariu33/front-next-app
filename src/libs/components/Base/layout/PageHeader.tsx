import { Button, Center, Flex, Text } from '@mantine/core';
import type { ClassValue } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import type { PropsWithChildren } from 'react';

import BackIcon from '@/libs/icons/back-icon';
import type {
  Namespace,
  TranslationKey,
} from '@/libs/types/utils/withTranslation';
import { cn } from '@/utils/cn';

interface PageHeaderProps<NS extends Namespace> extends PropsWithChildren {
  namespace: NS;
  title: TranslationKey<NS>;
  backHref?: string;
  showBack?: boolean;
  className?: ClassValue;
}

function PageHeader<NS extends Namespace>({
  namespace,
  title,
  backHref,
  showBack,
  className,
  children,
}: PageHeaderProps<NS>) {
  const { t } = useTranslation(namespace);
  const router = useRouter();
  return (
    <Center
      className={cn('w-full flex-col justify-between gap-4 py-4 md:flex-row')}
    >
      <Flex
        className={cn(`w-full items-center gap-4 md:flex-row ${className}`, {
          'flex-row': backHref,
          'flex-col': !backHref,
          'md:items-center': backHref,
          'md:items-start': !backHref,
        })}
      >
        {/* BACK BUTTON */}
        {(showBack && (
          <Button
            variant="transparent"
            onClick={router.back}
            className="hidden cursor-pointer items-center justify-center px-0 md:flex"
          >
            <BackIcon className="h-5 w-5" />
          </Button>
        )) ||
          (backHref && (
            <Link
              href={backHref}
              className="hidden items-center justify-center md:flex"
            >
              <BackIcon className="h-5 w-5" />
            </Link>
          ))}

        {/* TITLE */}
        <div className="flex items-center justify-center ">
          <Text className="text-center text-2xl font-bold leading-8 text-black">
            {t(title as any) as string}
          </Text>
        </div>
      </Flex>

      {/* CHILDREN */}
      {children}
    </Center>
  );
}

export default PageHeader;
