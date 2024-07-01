import { Box, Flex, Loader, SegmentedControl, Text } from '@mantine/core';
import { useRouter } from 'next/router';

import { cn } from '@/utils/cn';

type TabToggleItem = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  itemsPerRow?: number;
};
export interface TapToggleProps<Options extends TabToggleItem[]> {
  options: Options;
  value: Options[number]['value'];

  loading?: boolean;

  onChange: (value: Options[number]['value']) => void;

  className?: string;

  labelClassName?: string;

  indicatorClassName?: string;

  withCount?: boolean;

  'data-cy-id'?: string;
}

const TabToggle = <Options extends TabToggleItem[]>({
  options,
  value,
  loading,
  onChange,
  className,
  labelClassName,
  indicatorClassName,
  'data-cy-id': dataCyId,
  withCount = false,
}: TapToggleProps<Options>) => {
  const handleOptions = () => {
    return options.map(({ label, itemsPerRow, ...rest }) => ({
      label: (
        <Flex
          gap={6}
          className={cn(
            'text-md h-9 items-center justify-center px-6  font-bold',
            labelClassName,
          )}
        >
          <Text style={{ font: 'inherit', lineHeight: 'inherit' }}>
            {label}
          </Text>
          {withCount && (
            <Box
              className={cn(
                ' mx-1 flex h-6 w-6 items-center justify-center rounded-lg  text-xs',
                {
                  'bg-white text-black': value === rest.value,
                  'bg-brand-black-dark text-white': value !== rest.value,
                },
              )}
            >
              {loading && !itemsPerRow ? (
                <Loader
                  size="12px"
                  color={value !== rest.value ? 'white' : 'dark'}
                />
              ) : (
                itemsPerRow
              )}
            </Box>
          )}
        </Flex>
      ),
      ...rest,
    }));
  };

  const router = useRouter();
  const handleChange = (v: string) => {
    onChange(v);
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, tab: v },
      },
      undefined,
      { shallow: true },
    );
  };
  return (
    <Box
      data-cy-id={dataCyId}
      className={cn(
        ' rounded-lg border-[0.5px] border-solid border-gray-700 ',
        className,
      )}
    >
      <SegmentedControl
        color="dark"
        transitionDuration={200}
        transitionTimingFunction="ease-in"
        data={handleOptions()}
        value={value}
        onChange={handleChange}
        classNames={{
          indicator: indicatorClassName,
        }}
      />
    </Box>
  );
};

export default TabToggle;
