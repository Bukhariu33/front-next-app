import { Box } from '@mantine/core';

import type { Location } from '@/libs/packages/maps/type';
import ViewOnlyMap from '@/libs/packages/maps/view-only-map';

import BasePanel from '../BasePanel';

interface Props {
  location?: Location;
}

export default function LocationPanel({ location }: Props) {
  return (
    <BasePanel>
      <Box className="relative h-full overflow-hidden rounded-[0.9375rem]">
        <ViewOnlyMap location={location} />
      </Box>
    </BasePanel>
  );
}
