import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Import userEvent

import { mockUseTranslation } from '@/utils/test-utils/mockUseTranslation';
import { render } from '@/utils/test-utils/render';

import Input from '.';

// Mock useTranslation
jest.mock('next-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('Input component', () => {
  beforeEach(() => {
    mockUseTranslation();
  });

  // test render input
  it('should render input', () => {
    render(<Input namespace="auth" label="fullName" data-testid="input" />);
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('should translate the error message when translateError is true', () => {
    render(
      <Input
        namespace="error"
        label="EmailValid"
        translateError
        errorMessage="fullNameRequired"
      />,
    );
    expect(screen.getByText('Full name is required')).toBeInTheDocument();
  });

  it('should not translate the error message when translateError is false', () => {
    render(
      <Input
        namespace="auth"
        label="fullName"
        translateError={false}
        errorMessage="fullNameRequired"
      />,
    );
    expect(screen.getByText('fullNameRequired')).toBeInTheDocument();
  });

  it('should translate the label', () => {
    render(<Input namespace="auth" label="EnterCrNumber" />);
    expect(screen.getByText('Enter the cr number')).toBeInTheDocument();
  });

  it('should translate the placeholder', () => {
    render(
      <Input
        namespace="auth"
        label="newPassword"
        placeholder="confirmNewPassword"
      />,
    );
    expect(
      screen.getByPlaceholderText('Confirm new password'),
    ).toBeInTheDocument();
  });

  it('should not show error when error is undefined', () => {
    render(<Input namespace="auth" label="fullName" id="input" />);
    expect(screen.queryByText('fullNameRequired')).not.toBeInTheDocument();
  });

  // test input value changes when user types
  it('should change input value when user types', async () => {
    render(<Input namespace="auth" label="fullName" id="input" />);
    const input = screen.getByLabelText('Full name');
    expect(input).toHaveValue('');
    input.focus();
    await userEvent.type(input, 'test');
    expect(input).toHaveValue('test');
  });
});
