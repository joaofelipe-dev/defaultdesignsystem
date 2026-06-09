import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('renders children', () => {
    render(<Tooltip content="Tooltip text">Hover me</Tooltip>);
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('shows tooltip on hover with delay=0', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip text" delay={0}>
        Hover me
      </Tooltip>,
    );
    await user.hover(screen.getByText('Hover me'));
    await waitFor(() => expect(screen.getByText('Tooltip text')).toBeInTheDocument());
  });

  it('shows tooltip on focus with delay=0', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip text" delay={0}>
        <button>Focusable</button>
      </Tooltip>,
    );
    await user.tab();
    await waitFor(() => expect(screen.getByText('Tooltip text')).toBeInTheDocument());
  });

  it('does not show tooltip when disabled', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip" disabled delay={0}>
        Hover me
      </Tooltip>,
    );
    await user.hover(screen.getByText('Hover me'));
    expect(screen.queryByText('Tooltip')).not.toBeInTheDocument();
  });

  it('has role="tooltip" when visible', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip text" delay={0}>
        Hover me
      </Tooltip>,
    );
    await user.hover(screen.getByText('Hover me'));
    await waitFor(() => expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip text'));
  });

  it('sets aria-describedby on trigger when visible', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Tooltip content="Help" delay={0}>
        Hover me
      </Tooltip>,
    );
    const trigger = container.firstChild as HTMLElement;
    await user.hover(screen.getByText('Hover me'));
    await waitFor(() => expect(trigger).toHaveAttribute('aria-describedby'));
  });

  it('respects custom delay', { timeout: 10000 }, async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Delayed" delay={500}>
        Hover me
      </Tooltip>,
    );
    await user.hover(screen.getByText('Hover me'));
    expect(screen.queryByText('Delayed')).not.toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Delayed')).toBeInTheDocument(), { timeout: 1000 });
  });
});
