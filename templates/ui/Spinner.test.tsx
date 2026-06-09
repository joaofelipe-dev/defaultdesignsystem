import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders a status role', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has sr-only text for screen readers', () => {
    render(<Spinner />);
    expect(screen.getByText('Loading...')).toHaveClass('sr-only');
  });

  it('renders circular variant by default', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders dots variant', () => {
    const { container } = render(<Spinner variant="dots" />);
    expect(container.querySelectorAll('.rounded-full').length).toBeGreaterThanOrEqual(3);
  });

  it('renders bars variant', () => {
    const { container } = render(<Spinner variant="bars" />);
    expect(
      container.querySelectorAll('.motion-safe\\:animate-pulse').length,
    ).toBeGreaterThanOrEqual(3);
  });

  it('applies color classes', () => {
    const { rerender } = render(<Spinner color="primary" />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveClass('text-primary');

    rerender(<Spinner color="white" />);
    expect(document.querySelector('svg')).toHaveClass('text-white');
  });

  it('applies size classes', () => {
    const { rerender } = render(<Spinner size="sm" />);
    expect(document.querySelector('svg')).toHaveClass('h-4');

    rerender(<Spinner size="lg" />);
    expect(document.querySelector('svg')).toHaveClass('h-12');
  });
});
