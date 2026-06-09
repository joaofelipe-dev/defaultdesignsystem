import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Content</Card>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Card ref={ref}>Ref</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies variant classes', () => {
    const { rerender } = render(<Card variant="outlined">Card</Card>);
    expect(screen.getByText('Card')).toHaveClass('border-border');

    rerender(<Card variant="elevated">Elevated</Card>);
    expect(screen.getByText('Elevated')).toHaveClass('shadow-lg');
  });

  it('applies padding classes', () => {
    const { rerender } = render(<Card padding="none">None</Card>);
    expect(screen.getByText('None')).toHaveClass('p-0');

    rerender(<Card padding="lg">Large</Card>);
    expect(screen.getByText('Large')).toHaveClass('p-8');
  });

  it('applies fullWidth class', () => {
    render(<Card fullWidth>Full</Card>);
    expect(screen.getByText('Full')).toHaveClass('w-full');
  });

  it('applies interactive classes', () => {
    render(<Card interactive>Interactive</Card>);
    expect(screen.getByText('Interactive')).toHaveClass('cursor-pointer');
  });
});
