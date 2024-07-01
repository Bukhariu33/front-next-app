import { fireEvent, screen } from '@testing-library/react';

import { mockUseTranslation } from '@/utils/test-utils/mockUseTranslation';
import { render } from '@/utils/test-utils/render';

import Button from './Button';
// Mock useTranslation
jest.mock('next-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('Input component', () => {
  beforeEach(() => {
    mockUseTranslation();
  });

  // test render button
  it('should render button', () => {
    render(<Button namespace="auth" text="send" data-testid="button" />);
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });

  it('should translate the text', () => {
    render(<Button namespace="common" text="tryAgain" />);
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('should trigger onClick callback when clicked', () => {
    const mockOnClick = jest.fn();
    render(
      <Button
        onClick={mockOnClick}
        namespace="auth"
        text="send"
        data-testid="button"
      />,
    );

    fireEvent.click(screen.getByTestId('button'));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when `disabled` prop is true', () => {
    render(
      <Button namespace="auth" text="send" disabled data-testid="button" />,
    );

    expect(screen.getByTestId('button')).toBeDisabled();
  });

  it('should apply custom classes', () => {
    render(
      <Button
        namespace="auth"
        text="send"
        className="custom-class"
        data-testid="button"
      />,
    );

    expect(screen.getByTestId('button')).toHaveClass('custom-class');
  });

  it('renders primary variant correctly', () => {
    render(
      <Button
        namespace="auth"
        text="send"
        variant="primary"
        data-testid="button"
      />,
    );
    expect(screen.getByTestId('button')).toHaveClass('bg-brand-primary-main');
  });

  it('renders outlined variant correctly', () => {
    render(
      <Button
        namespace="auth"
        text="send"
        variant="outlined"
        data-testid="button"
      />,
    );
    expect(screen.getByTestId('button')).toHaveClass('bg-[#FFFDF5]');
  });

  it('renders outlined-black variant correctly', () => {
    render(
      <Button
        namespace="auth"
        text="send"
        variant="outlined-black"
        data-testid="button"
      />,
    );
    expect(screen.getByTestId('button')).toHaveClass(
      'bg-white border border-black',
    );
  });

  it('renders floating-white variant correctly', () => {
    render(
      <Button
        namespace="auth"
        text="send"
        variant="floating-white"
        data-testid="button"
      />,
    );
    expect(screen.getByTestId('button')).toHaveClass(
      'disabled:bg-[#F5F7F9] disabled:text-brand-disabledText',
    );
  });

  it('renders unstyled variant correctly', () => {
    render(
      <Button
        namespace="auth"
        text="send"
        variant="unstyled"
        data-testid="button"
      />,
    );
    expect(screen.getByTestId('button')).toHaveClass(
      'px-6  rounded-lg h-[3.2rem] bg-white text-brand-primary-main',
    );
  });

  it('renders outlined-error variant correctly', () => {
    render(
      <Button
        namespace="auth"
        text="send"
        variant="outlined-error"
        data-testid="button"
      />,
    );
    expect(screen.getByTestId('button')).toHaveClass(
      'bg-white border border-brand-danger',
    );
  });
});
