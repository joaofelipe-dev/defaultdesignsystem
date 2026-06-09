import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('renders input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('applies variant classes', () => {
    const { rerender } = render(<Input variant="filled" />);
    expect(screen.getByRole('textbox')).toHaveClass('bg-secondary');

    rerender(<Input variant="ghost" />);
    expect(screen.getByRole('textbox')).toHaveClass('bg-transparent');
  });

  it('applies size classes', () => {
    render(<Input size="sm" />);
    expect(screen.getByRole('textbox')).toHaveClass('h-8');
  });

  it('applies fullWidth class to wrapper', () => {
    const { container } = render(<Input fullWidth />);
    expect(container.firstChild).toHaveClass('w-full');
  });

  it('handles status variants', () => {
    render(<Input status="error" />);
    expect(screen.getByRole('textbox')).toHaveClass('border-destructive');
  });

  it('renders left and right icons', () => {
    render(<Input leftIcon={<span>L</span>} rightIcon={<span>R</span>} />);
    expect(screen.getByText('L')).toBeInTheDocument();
    expect(screen.getByText('R')).toBeInTheDocument();
  });

  it('handles onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'a');
    expect(onChange).toHaveBeenCalled();
  });

  it('supports disabled state', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
