import { screen } from '@testing-library/react';

// Import userEvent
import { mockUseTranslation } from '@/utils/test-utils/mockUseTranslation';
import { render } from '@/utils/test-utils/render';

import SelectInput from '.';

// Mock useTranslation
jest.mock('next-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('SelectInput component', () => {
  beforeEach(() => {
    mockUseTranslation();
  });

  // test render input
  it('should render input', () => {
    render(
      <SelectInput
        namespace="auth"
        label="investorType"
        placeholder="investorType"
        data-testid="input"
      />,
    );
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('should translate the error message when translateError is true', () => {
    render(
      <SelectInput
        namespace="auth"
        label="newPassword"
        placeholder="enterNewPassword"
        translateError
        errorMessage="fullNameRequired"
      />,
    );
    expect(screen.getByText('Full name is required')).toBeInTheDocument();
  });

  it('should not translate the error message when translateError is false', () => {
    render(
      <SelectInput
        namespace="auth"
        label="newPassword"
        placeholder="enterNewPassword"
        translateError={false}
        errorMessage="fullNameRequired"
      />,
    );
    expect(screen.getByText('fullNameRequired')).toBeInTheDocument();
  });

  it('should translate the label', () => {
    render(
      <SelectInput
        namespace="auth"
        label="newPassword"
        placeholder="enterNewPassword"
      />,
    );
    expect(screen.getByText('New password')).toBeInTheDocument();
  });

  it('should translate the placeholder', () => {
    render(
      <SelectInput
        namespace="auth"
        label="newPassword"
        placeholder="enterNewPassword"
      />,
    );
    expect(
      screen.getByPlaceholderText('Enter new password'),
    ).toBeInTheDocument();
  });

  it('should not show error when error is undefined', () => {
    render(
      <SelectInput
        namespace="auth"
        label="newPassword"
        placeholder="enterNewPassword"
        id="input"
      />,
    );
    expect(screen.queryByText('PasswordRequired')).not.toBeInTheDocument();
  });
});
