import { fireEvent, screen } from '@testing-library/react';

import { mockUseTranslation } from '@/utils/test-utils/mockUseTranslation';
import { render } from '@/utils/test-utils/render';

import CheckboxInput from './index';

// Mock useTranslation
jest.mock('next-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('Input component', () => {
  beforeEach(() => {
    mockUseTranslation();
  });

  // test render checkbox
  it('should render input', () => {
    render(
      <CheckboxInput
        namespace="auth"
        label="fullName"
        data-testid="checkbox"
      />,
    );
    expect(screen.getByTestId('checkbox')).toBeInTheDocument();
  });

  it('should translate the error message when translateError is true', () => {
    render(
      <CheckboxInput
        namespace="auth"
        label="privacyPolicy"
        translateError
        errorMessage="privacyPolicyTerms"
      />,
    );
    expect(
      screen.getByText('To proceed, you must agree to the Privacy Policy.'),
    ).toBeInTheDocument();
  });

  it('should not translate the error message when translateError is false', () => {
    render(
      <CheckboxInput
        namespace="auth"
        label="privacyPolicy"
        translateError={false}
        errorMessage="privacyPolicyTerms"
      />,
    );
    expect(screen.getByText('privacyPolicyTerms')).toBeInTheDocument();
  });

  it('should not show error when error is undefined', () => {
    render(<CheckboxInput namespace="auth" label="fullName" />);
    expect(screen.queryByText('fullNameRequired')).not.toBeInTheDocument();
  });

  it('should toggle check state when clicked', async () => {
    render(
      <CheckboxInput namespace="auth" label="terms" data-testid="checkbox" />,
    );
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    // After clicking, the checkbox should be checked
    expect(checkbox).toBeChecked();

    // Click it again
    fireEvent.click(checkbox);

    // After clicking again, the checkbox should be unchecked
    expect(checkbox).not.toBeChecked();
  });
});
