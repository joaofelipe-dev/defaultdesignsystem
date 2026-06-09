import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioGroup } from './RadioGroup';

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

describe('RadioGroup', () => {
  it('renders radiogroup role', () => {
    render(<RadioGroup name="test" options={options} />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<RadioGroup name="test" options={options} />);
    expect(screen.getByLabelText('Option A')).toBeInTheDocument();
    expect(screen.getByLabelText('Option B')).toBeInTheDocument();
    expect(screen.getByLabelText('Option C')).toBeInTheDocument();
  });

  it('checks the selected value', () => {
    render(<RadioGroup name="test" options={options} value="b" />);
    expect(screen.getByLabelText('Option B')).toBeChecked();
    expect(screen.getByLabelText('Option A')).not.toBeChecked();
  });

  it('fires onChange when an option is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<RadioGroup name="test" options={options} onChange={onChange} />);
    await user.click(screen.getByLabelText('Option B'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('disables all options when group is disabled', () => {
    render(<RadioGroup name="test" options={options} disabled />);
    screen.getAllByRole('radio').forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });

  it('disables individual option', () => {
    const opts = [
      { label: 'Enabled', value: 'e' },
      { label: 'Disabled', value: 'd', disabled: true },
    ];
    render(<RadioGroup name="test" options={opts} />);
    expect(screen.getByLabelText('Enabled')).not.toBeDisabled();
    expect(screen.getByLabelText('Disabled')).toBeDisabled();
  });

  it('has aria-orientation attribute', () => {
    const { rerender } = render(
      <RadioGroup name="test" options={options} orientation="horizontal" />,
    );
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-orientation', 'horizontal');

    rerender(<RadioGroup name="test" options={options} orientation="vertical" />);
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-orientation', 'vertical');
  });
});
