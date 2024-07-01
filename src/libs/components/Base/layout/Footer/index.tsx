import { AppShell, Stack } from '@mantine/core';

import ReplaceTranslationKey from '@/libs/components/utils/ReplaceTranslationKey';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <AppShell.Footer className="p-4" pos="static">
      <Stack gap="50px" className="max-h-fit">
        <ReplaceTranslationKey
          className="text-center"
          text="All Right Reserved Networkbuxx"
          values={{
            year: currentYear,
          }}
        />
      </Stack>
    </AppShell.Footer>
  );
}

export default Footer;
