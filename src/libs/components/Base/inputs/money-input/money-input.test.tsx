import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Import userEvent
import { mockUseTranslation } from '@/utils/test-utils/mockUseTranslation';
import { render } from '@/utils/test-utils/render';

import MoneyInput from '.';

// Mock useTranslation
jest.mock('next-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('MoneyInput component', () => {
  beforeEach(() => {
    mockUseTranslation();
  });

  // test render input
  it('should format the input value and display it', async () => {
    render(
      <MoneyInput
        namespace="fund"
        label="fundCoverage"
        data-testid="money-input"
      />,
    );

    const input = screen.getByTestId('money-input');
    await userEvent.type(input, '12345');

    // Check if the input value is formatted as expected
    expect(input).toHaveValue('12,345');
  });

  it('should call onChange with the unformatted value', async () => {
    const mockOnChange = jest.fn();
    render(
      <MoneyInput
        namespace="fund"
        label="fundCoverage"
        data-testid="money-input"
        onChange={mockOnChange}
      />,
    );

    const input = screen.getByTestId('money-input');
    await userEvent.type(input, '12345');

    // Check if onChange has been called with the unformatted value
    expect(mockOnChange).toHaveBeenCalledWith(12345);
  });
});
