import { Flex, Group, Stack } from '@mantine/core';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import useFormatToMoney from '@/libs/hooks/useFormatToMoney';
import type { BaseFund } from '@/libs/types/interface/fund/base';
import { cn } from '@/utils/cn';
import { formatDate } from '@/utils/formatDate';

import Button from '../../Buttons/Button';
import StatusChip from '../../status-chip/status-chip';
import type { TagColors } from '../../Tag';
import Tag from '../../Tag';
import MainTitle from '../../typography/MainTitle';
import type { BaseCardProps } from '..';
import Price from './elments/Price';
import Progress from './elments/progress';

const tagsStyle: { [key: number]: TagColors } = {
  0: 'gray',
  1: 'yellow',
  2: 'cyan',
};

const getTagColor = (index: number): TagColors => {
  return tagsStyle[index] ?? 'gray';
};
const CardBody: FC<
  BaseCardProps['body'] & {
    orientation: BaseCardProps['orientation'];
  }
> = ({
  subTitle,
  tags,
  title,
  actions,
  price,
  percentage,
  orientation,
  fundDetails,
  actionWrapper,
  status,
  isInvested,
  investmentValue,
}) => {
  const { t } = useTranslation(['common', 'fund']);
  const { format } = useFormatToMoney();

  const formatLabel = (
    label: string,
    type: (typeof fundDetails)[number]['format'],
  ) => {
    switch (type) {
      case 'money':
        return format(Number(label));
      case 'date':
        return formatDate(label);
      default:
        return label;
    }
  };
  const isVertical = orientation === 'vertical';
  return (
    <Stack
      className={cn(' w-full p-4 lg:p-6 ', {
        'gap-4': isVertical,
        'gap-6': !isVertical,
      })}
    >
      <div className="flex justify-between">
        <MainTitle
          text={title}
          order={3}
          className=" text-lg leading-3 xl:text-2xl"
        />
        {status && <StatusChip status={status as BaseFund['status']} />}
      </div>
      <span className="text-md -mt-2 font-medium text-brand-accent-500 xl:text-lg">
        {subTitle}
      </span>

      <Group className="-mt-1">
        {tags.map((tag, i) => (
          <Tag key={tag} color={getTagColor(i)}>
            {tag || t('notApplicable')}
          </Tag>
        ))}
      </Group>
      <Flex className="flex-wrap gap-x-[32px] gap-y-[23px]">
        {fundDetails?.map(detail => (
          <Flex
            key={detail.key}
            className=" flex-wrap items-center gap-[5px] text-lg font-medium leading-[1.3333] xl:min-w-[45%]"
          >
            {detail?.icon}
            <span className="text-brand-accent-500">
              {t(`fund:${detail.key}`)}:
            </span>
            <span>
              {(typeof detail.value === 'string'
                ? formatLabel(detail.value, detail.format)
                : detail.value) || t('notApplicable')}
            </span>
          </Flex>
        ))}
        {isInvested && investmentValue && (
          <div className="flex flex-col ">
            <span className="text-xl font-medium text-brand-accent-500">
              {t('fund:investmentValue')}:
            </span>
            <span className="text-3xl font-bold">
              {format(investmentValue)}
            </span>
          </div>
        )}
      </Flex>
      {!isInvested && (
        <Stack gap={0}>
          <Price amount={price} />
          <Progress value={percentage} />
        </Stack>
      )}

      <div className={cn('mt-auto flex-col gap-4', actionWrapper)}>
        {actions?.secondary && actions.secondary.as === 'button' && (
          <Button
            variant="outlined-black"
            namespace="common"
            {...actions.secondary}
            className={cn('w-full', actions.secondary.className)}
          />
        )}
        {actions?.secondary && actions.secondary.as === 'link' && (
          <Link href={actions.secondary.href}>
            <Button
              namespace="common"
              variant="outlined-black"
              {...actions.secondary}
              className={cn('w-full', actions.secondary.className)}
            />
          </Link>
        )}

        {actions?.primary && actions.primary.as === 'button' && (
          <Button
            namespace="common"
            {...actions.primary}
            className={cn('w-full', actions.primary.className)}
          />
        )}
        {actions?.primary && actions.primary.as === 'link' && (
          <Link href={actions.primary.href}>
            <Button
              namespace="common"
              {...actions.primary}
              className={cn('w-full', actions.primary.className)}
            />
          </Link>
        )}
      </div>
    </Stack>
  );
};

export default CardBody;
