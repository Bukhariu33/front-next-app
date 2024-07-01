import { fireEvent, screen } from '@testing-library/react';

// Import userEvent
import { mockUseTranslation } from '@/utils/test-utils/mockUseTranslation';
import { render } from '@/utils/test-utils/render';

import DateInput from '.';

// Mock useTranslation
jest.mock('next-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('Input component', () => {
  beforeEach(() => {
    mockUseTranslation();
  });

  // test render input
  it('should render date input', () => {
    render(
      <DateInput
        namespace="auth"
        label="dateOfBirth"
        placeholder="dateFormat"
        data-testid="input"
      />,
    );
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('should translate the error message when translateError is true', () => {
    render(
      <DateInput
        namespace="auth"
        label="dateOfBirth"
        placeholder="dateFormat"
        translateError
        errorMessage="fullNameRequired"
      />,
    );
    expect(screen.getByText('Full name is required')).toBeInTheDocument();
  });

  it('should not translate the error message when translateError is false', () => {
    render(
      <DateInput
        namespace="auth"
        label="dateOfBirth"
        placeholder="dateFormat"
        translateError={false}
        errorMessage="fullNameRequired"
      />,
    );
    expect(screen.getByText('fullNameRequired')).toBeInTheDocument();
  });

  it('should translate the label', () => {
    render(
      <DateInput
        namespace="auth"
        label="dateOfBirth"
        placeholder="dateFormat"
      />,
    );
    expect(screen.getByText('Date of birth')).toBeInTheDocument();
  });

  it('should not show error when error is undefined', () => {
    render(
      <DateInput
        namespace="auth"
        label="dateOfBirth"
        placeholder="dateFormat"
        id="input"
      />,
    );
    expect(screen.queryByText('DoBRequired')).not.toBeInTheDocument();
  });

  it('should update the input value when text is entered', () => {
    render(
      <DateInput
        namespace="auth"
        placeholder="dateOfBirth"
        data-testid="input"
      />,
    );
    const dateInput = screen.getByTestId('input') as HTMLInputElement;
    expect(dateInput).toBeInTheDocument();

    fireEvent.change(dateInput, { target: { value: '2022-01-01' } });

    expect(dateInput.value).toBe('2022-01-01');
  });
});
