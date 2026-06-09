import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Badge ref={ref}>Ref</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('applies variant classes', () => {
    const { rerender } = render(<Badge variant="outline">Out</Badge>);
    expect(screen.getByText('Out')).toHaveClass('border');

    rerender(<Badge variant="soft">Soft</Badge>);
    expect(screen.getByText('Soft')).toHaveClass('bg-primary/10');
  });

  it('applies color classes', () => {
    const { rerender } = render(<Badge color="success">S</Badge>);
    expect(screen.getByText('S')).toHaveClass('bg-success');

    rerender(<Badge color="warning">W</Badge>);
    expect(screen.getByText('W')).toHaveClass('bg-warning');
  });

  it('applies size classes', () => {
    const { rerender } = render(<Badge size="sm">S</Badge>);
    expect(screen.getByText('S')).toHaveClass('text-xs');

    rerender(<Badge size="lg">L</Badge>);
    expect(screen.getByText('L')).toHaveClass('text-base');
  });
});
