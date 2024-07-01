import { Stack } from '@mantine/core';

import DashboardStats from '@/libs/components/dashboard-stats';
import WelcomeDisplay from '@/libs/components/WelcomeDisplay';

const Index = () => {

  return (
    <Stack className="gap-8 pb-8 pt-4">
      <WelcomeDisplay />
      <DashboardStats
      />
    </Stack>
  );
};


export default Index;
