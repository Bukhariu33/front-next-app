import { Flex, Text } from '@mantine/core';

import { cn } from '@/utils/cn';

const TermsCard = ({
  children,
  text,
  className,
}: {
  children: React.ReactNode;
  text?: string;
  className?: string;
}) => (
  <Flex
    data-cy="terms-card"
    className={cn(
      'rounded-[15px] bg-[#F5F7F9] px-[5px] py-[1em] sm:py-[5px] md:px-[1em] md:py-[1em]',
      className,
    )}
    gap={8}
  >
    {children}
    <Text className="text-sm md:text-base" color="#000">
      {text}
    </Text>
  </Flex>
);

export default TermsCard;
