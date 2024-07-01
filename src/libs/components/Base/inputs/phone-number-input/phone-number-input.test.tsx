import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Import userEvent
import { useState } from 'react';

import { mockUseTranslation } from '@/utils/test-utils/mockUseTranslation';
import { render } from '@/utils/test-utils/render';

import PhoneNumberInput from '.';

function PhoneInput({ onChange }: { onChange: (value: string) => void }) {
  const [phoneNumberInput, setPhoneNumberInput] = useState<string>('');
  return (
    <PhoneNumberInput
      namespace="auth"
      label="phoneNumber"
      placeholder="phoneNumberFormat"
      onChange={e => {
        setPhoneNumberInput(e);
        onChange(e);
      }}
      value={phoneNumberInput}
      id="input"
    />
  );
}

// Mock useTranslation
jest.mock('next-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('PhoneNumberInput component', () => {
  beforeEach(() => {
    mockUseTranslation();
  });

  // test render input
  it('should render input', () => {
    render(
      <PhoneNumberInput
        namespace="auth"
        label="phoneNumber"
        placeholder="phoneNumberFormat"
        onChange={() => {}}
        data-testid="input"
      />,
    );
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('should translate the error message when translateError is true', () => {
    render(
      <PhoneNumberInput
        namespace="auth"
        label="phoneNumber"
        placeholder="phoneNumberFormat"
        onChange={() => {}}
        translateError
        errorMessage="fullNameRequired"
      />,
    );
    expect(screen.getByText('Full name is required')).toBeInTheDocument();
  });

  it('should not translate the error message when translateError is false', () => {
    render(
      <PhoneNumberInput
        namespace="auth"
        label="phoneNumber"
        placeholder="phoneNumberFormat"
        onChange={() => {}}
        translateError={false}
        errorMessage="PhoneRequired"
      />,
    );
    expect(screen.getByText('Phone is required')).toBeInTheDocument();
  });

  it('should translate the label', () => {
    render(
      <PhoneNumberInput
        namespace="auth"
        label="phoneNumber"
        placeholder="phoneNumberFormat"
        onChange={() => {}}
      />,
    );
    expect(screen.getByText('Phone number')).toBeInTheDocument();
  });

  it('should translate the placeholder', () => {
    render(
      <PhoneNumberInput
        namespace="auth"
        label="phoneNumber"
        placeholder="phoneNumberFormat"
        onChange={() => {}}
      />,
    );
    expect(screen.getByPlaceholderText('123-456-789')).toBeInTheDocument();
  });

  it('should not show error when error is undefined', () => {
    render(
      <PhoneNumberInput
        namespace="auth"
        label="phoneNumber"
        placeholder="phoneNumberFormat"
        onChange={() => {}}
        id="input"
      />,
    );
    expect(screen.queryByText('PhoneRequired')).not.toBeInTheDocument();
  });

  // test input value changes when user types
  it('should change phone input value and format it when user types', async () => {
    render(<PhoneInput onChange={() => {}} />);
    const input = screen.getByPlaceholderText('123-456-789');
    expect(input).toHaveValue('');
    input.focus();
    await userEvent.type(input, '05012');
    expect(input).toHaveValue('050-12');
  });

  it('should call onChange function with the unformatted value', async () => {
    const onChange = jest.fn();
    render(<PhoneInput onChange={onChange} />);
    const input = screen.getByPlaceholderText('123-456-789');
    expect(input).toHaveValue('');
    input.focus();
    await userEvent.type(input, '05012');
    expect(onChange).toHaveBeenCalledWith('05012');
  });
});
