import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders fallback text when no src', () => {
    render(<Avatar fallback="JF" />);
    expect(screen.getByText('JF')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Avatar ref={ref} fallback="R" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders image when src is provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" fallback="JF" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    expect(img).toHaveAttribute('alt', 'JF');
  });

  it('does not render fallback when image is present', () => {
    render(<Avatar src="https://example.com/avatar.jpg" fallback="JF" />);
    expect(screen.queryByText('JF')).not.toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { rerender } = render(<Avatar fallback="A" size="sm" />);
    expect(screen.getByText('A').parentElement).toHaveClass('h-8');

    rerender(<Avatar fallback="A" size="xl" />);
    expect(screen.getByText('A').parentElement).toHaveClass('h-14');
  });

  it('applies shape classes', () => {
    const { rerender } = render(<Avatar fallback="A" shape="square" />);
    expect(screen.getByText('A').parentElement).toHaveClass('rounded-md');

    rerender(<Avatar fallback="A" shape="circle" />);
    expect(screen.getByText('A').parentElement).toHaveClass('rounded-full');
  });

  it('shows status indicator', () => {
    render(<Avatar fallback="JF" status="online" />);
    const statusIndicator = screen.getByText('JF').parentElement?.querySelector('span:last-child');
    expect(statusIndicator).toHaveClass('bg-success');
  });
});
