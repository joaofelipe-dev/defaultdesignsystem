import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast } from './Toast';

describe('Toast', () => {
  it('renders message', () => {
    render(<Toast message="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('has role alert with aria-live polite', () => {
    render(<Toast message="Alert" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'polite');
  });

  it('renders close button when closable', () => {
    render(<Toast message="Close me" closable />);
    expect(screen.getByLabelText('Fechar notificação')).toBeInTheDocument();
  });

  it('does not render close button when closable is false', () => {
    render(<Toast message="No close" closable={false} />);
    expect(screen.queryByLabelText('Fechar notificação')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Toast message="Close" onClose={onClose} />);
    await user.click(screen.getByLabelText('Fechar notificação'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('auto-dismisses after duration', async () => {
    vi.useFakeTimers();
    render(<Toast message="Auto" duration={3000} />);
    expect(screen.getByText('Auto')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.queryByText('Auto')).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('renders to portal (document.body)', () => {
    render(<Toast message="Portal test" />);
    expect(document.body.querySelector('[role="alert"]')).toHaveTextContent('Portal test');
  });

  it('renders without duration (should not auto-close)', () => {
    render(<Toast message="Sticky" duration={0} />);
    expect(screen.getByText('Sticky')).toBeInTheDocument();
  });
});
