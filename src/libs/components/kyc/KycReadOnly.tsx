import { Flex, Title } from '@mantine/core';
import type { FC, ReactNode } from 'react';

interface KycReadOnlyProps {
  label: string;
  value: ReactNode;
}

const KycReadOnly: FC<KycReadOnlyProps> = ({ label, value }) => {
  return (
    <Flex direction="column">
      <Title className="text-xs font-bold leading-[1.66667] text-[#BEBEC1]">
        {label}
      </Title>
      <Title className="text-sm font-medium leading-[1.42857]">{value}</Title>
    </Flex>
  );
};

export { KycReadOnly };
