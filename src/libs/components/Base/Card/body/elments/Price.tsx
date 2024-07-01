import { Text } from '@mantine/core';
import type { FC } from 'react';

import useFormatToMoney from '@/libs/hooks/useFormatToMoney';

interface PriceProps {
  amount: number;
}

const Price: FC<PriceProps> = ({ amount }) => {
  const { format } = useFormatToMoney();
  return (
    <Text className="text-lg font-bold text-black lg:text-xl xl:text-3xl">
      {format(amount)}
    </Text>
  );
};

export default Price;
