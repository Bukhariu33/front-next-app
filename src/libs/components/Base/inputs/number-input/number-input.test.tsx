import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Import userEvent
import { mockUseTranslation } from '@/utils/test-utils/mockUseTranslation';
import { render } from '@/utils/test-utils/render';

import NumberInput from '.';

// Mock useTranslation
jest.mock('next-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('NumberInput component', () => {
  beforeEach(() => {
    mockUseTranslation();
  });

  // test render input
  it('should render input', () => {
    render(
      <NumberInput
        namespace="auth"
        label="phoneNumber"
        placeholder="phoneNumberFormat"
        data-testid="input"
      />,
    );
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('should translate the error message when translateError is true', () => {
    render(
      <NumberInput
        namespace="auth"
        label="phoneNumber"
        placeholder="phoneNumberFormat"
        translateError
        errorMessage="PhoneRequired"
      />,
    );
    expect(screen.getByText('Phone is required')).toBeInTheDocument();
  });

  it('should not translate the error message when translateError is false', () => {
    render(
      <NumberInput
        namespace="auth"
        label="phoneNumber"
        placeholder="phoneNumberFormat"
        translateError={false}
        errorMessage="PhoneRequired"
      />,
    );
    expect(screen.getByText('PhoneRequired')).toBeInTheDocument();
  });

  it('should translate the label', () => {
    render(
      <NumberInput
        namespace="auth"
        label="phoneNumber"
        placeholder="phoneNumberFormat"
      />,
    );
    expect(screen.getByText('Phone number')).toBeInTheDocument();
  });

  it('should translate the placeholder', () => {
    render(
      <NumberInput
        namespace="auth"
        label="phoneNumber"
        placeholder="phoneNumberFormat"
      />,
    );
    expect(screen.getByPlaceholderText('123-456-789')).toBeInTheDocument();
  });

  it('should not show error when error is undefined', () => {
    render(
      <NumberInput
        namespace="auth"
        label="phoneNumber"
        placeholder="phoneNumberFormat"
        id="input"
      />,
    );
    expect(screen.queryByText('PhoneRequired')).not.toBeInTheDocument();
  });

  // test input value changes when user types
  it('should change input value when user types', async () => {
    render(
      <NumberInput
        namespace="auth"
        label="phoneNumber"
        placeholder="phoneNumberFormat"
        id="input"
      />,
    );
    const input = screen.getByLabelText('Phone number');
    expect(input).toHaveValue('');
    input.focus();
    await userEvent.type(input, '123');
    expect(input).toHaveValue('123');
  });

  // test input does not allow non-numeric characters
  it('should not allow non-numeric characters', async () => {
    render(
      <NumberInput
        namespace="auth"
        label="phoneNumber"
        placeholder="phoneNumberFormat"
        id="input"
      />,
    );
    const input = screen.getByLabelText('Phone number');
    expect(input).toHaveValue('');
    input.focus();
    await userEvent.type(input, 'abc');
    expect(input).toHaveValue('');
  });
});
