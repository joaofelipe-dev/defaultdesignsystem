import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

describe('Select', () => {
  it('renders select element', () => {
    render(
      <Select>
        <option>Option 1</option>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(
      <Select ref={ref}>
        <option>Opt</option>
      </Select>,
    );
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  it('applies variant classes', () => {
    render(
      <Select variant="filled">
        <option>Opt</option>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toHaveClass('bg-secondary');
  });

  it('applies status classes', () => {
    render(
      <Select status="error">
        <option>Opt</option>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toHaveClass('border-destructive');
  });

  it('sets aria-invalid for error status', () => {
    render(
      <Select status="error">
        <option>Opt</option>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('handles onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Select onChange={onChange}>
        <option value="a">A</option>
        <option value="b">B</option>
      </Select>,
    );
    await user.selectOptions(screen.getByRole('combobox'), 'b');
    expect(onChange).toHaveBeenCalled();
  });

  it('supports disabled state', () => {
    render(
      <Select disabled>
        <option>Opt</option>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toBeDisabled();
  });
});
