import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Import userEvent

import { mockUseTranslation } from '@/utils/test-utils/mockUseTranslation';
import { render } from '@/utils/test-utils/render';

import PasswordInput from '.';

// Mock useTranslation
jest.mock('next-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('PasswordInput component', () => {
  beforeEach(() => {
    mockUseTranslation();
  });

  // test render input
  it('should render input', () => {
    render(
      <PasswordInput
        namespace="auth"
        label="newPassword"
        placeholder="enterNewPassword"
        data-testid="input"
      />,
    );
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('should translate the error message when translateError is true', () => {
    render(
      <PasswordInput
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
      <PasswordInput
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
      <PasswordInput
        namespace="auth"
        label="newPassword"
        placeholder="enterNewPassword"
      />,
    );
    expect(screen.getByText('New password')).toBeInTheDocument();
  });

  it('should translate the placeholder', () => {
    render(
      <PasswordInput
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
      <PasswordInput
        namespace="auth"
        label="newPassword"
        placeholder="enterNewPassword"
        id="input"
      />,
    );
    expect(screen.queryByText('PasswordRequired')).not.toBeInTheDocument();
  });

  // test input value changes when user types
  it('should change input value when user types', async () => {
    render(
      <PasswordInput
        namespace="auth"
        label="newPassword"
        placeholder="enterNewPassword"
        id="input"
      />,
    );
    const input = screen.getByLabelText('New password');
    expect(input).toHaveValue('');

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      input.focus();
      await userEvent.type(input, 'test');
    });

    expect(input).toHaveValue('test');
  });

  it('should be of type password', () => {
    render(
      <PasswordInput
        namespace="auth"
        label="newPassword"
        placeholder="enterNewPassword"
        id="input"
      />,
    );
    const input = screen.getByLabelText('New password');
    expect(input).toHaveAttribute('type', 'password');
  });
});
