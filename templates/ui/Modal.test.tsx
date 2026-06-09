import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(<Modal open={false}>Content</Modal>);
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('renders content when open', () => {
    render(<Modal open>Content</Modal>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('has proper ARIA attributes', () => {
    render(
      <Modal open title="My Modal" description="Description here">
        Content
      </Modal>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(dialog).toHaveAttribute('aria-describedby');
  });

  it('calls onClose when overlay is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose}>
        Content
      </Modal>,
    );
    await user.click(screen.getByRole('dialog').parentElement!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when content is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose}>
        Content
      </Modal>,
    );
    await user.click(screen.getByText('Content'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes on Escape by default', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose}>
        Content
      </Modal>,
    );
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close on Escape when closeOnEsc is false', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} closeOnEsc={false}>
        Content
      </Modal>,
    );
    await user.keyboard('{Escape}');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders title and description', () => {
    render(
      <Modal open title="My Title" description="My Description">
        Content
      </Modal>,
    );
    expect(screen.getByText('My Title')).toBeInTheDocument();
    expect(screen.getByText('My Description')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { rerender } = render(
      <Modal open size="sm">
        Content
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveClass('max-w-sm');

    rerender(
      <Modal open size="lg">
        Content
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveClass('max-w-lg');
  });
});
