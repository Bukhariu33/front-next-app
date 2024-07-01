import { Button, Flex, Text, Tooltip } from '@mantine/core';
import { useValidatedState } from '@mantine/hooks';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useEffect } from 'react';

import MinusIcon from '@/icons/minus-icon';
import PlusIcon from '@/icons/plus-icon';

interface CounterProps {
  initialCount: number;
  min: number;
  max: number;
  onIncrease?: (count: number) => void;
  onDecrease?: (count: number) => void;
}

const Counter: FC<CounterProps> = ({
  initialCount,
  min,
  max,
  onDecrease,
  onIncrease,
}) => {
  const validateCount = (value: number) => value >= min && value <= max;
  const [{ value: count, valid }, setCount] = useValidatedState(
    initialCount,
    validateCount,
    validateCount(initialCount),
  );

  const { t } = useTranslation('common');

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  if (!valid)
    throw new Error(`Counter value should be between '${min}' and '${max}'`);

  const handleDecrease = () => {
    const newCount = Math.max(min, count - 1);
    setCount(newCount);
    if (onDecrease) onDecrease(newCount);
  };

  const handleIncrease = () => {
    const newCount = Math.min(max, count + 1);
    setCount(newCount);
    if (onIncrease) onIncrease(newCount);
  };

  return (
    <Flex align="center" columnGap={9}>
      <Tooltip
        disabled={count !== min}
        label={t('atLeastOneTeam')}
        position="bottom"
        withArrow
      >
        <Button
          classNames={{ root: 'bg-[#D1CEC5] p-[10px]' }}
          onClick={handleDecrease}
          disabled={count === min}
          id="minus-button"
        >
          <MinusIcon />
        </Button>
      </Tooltip>
      <Text className="select-none rounded-[8px] border border-solid border-[#EFF0F6] px-[24px] pb-[8px] pt-[12px] text-base leading-[1.25] text-brand-accent-500">
        {count}
      </Text>
      <Button
        disabled={count === max}
        classNames={{ root: 'p-[10px]' }}
        onClick={handleIncrease}
      >
        <PlusIcon />
      </Button>
    </Flex>
  );
};

export default Counter;
