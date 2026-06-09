import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders a checkbox role', () => {
    render(<Switch />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Switch ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('is checked when checked prop is true', () => {
    render(<Switch checked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('is not checked by default', () => {
    render(<Switch />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('fires onChange when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch onChange={onChange} />);
    await user.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('supports disabled state', () => {
    render(<Switch disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('applies size classes', () => {
    const { container } = render(<Switch size="sm" />);
    const visual = container.querySelector('.peer');
    expect(visual?.nextElementSibling).toHaveClass('w-9');
  });
});
