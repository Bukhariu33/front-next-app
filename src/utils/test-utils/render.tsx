import { MantineProvider } from '@mantine/core';
import type { RenderOptions } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render as testingLibraryRender } from '@testing-library/react';

export function render(
  ui: React.ReactElement,
  options?: RenderOptions,
): ReturnType<typeof testingLibraryRender> {
  return testingLibraryRender(ui, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider>{children}</MantineProvider>
    ),
    ...options,
  });
}
