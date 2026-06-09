import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders horizontal divider by default', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('hr')).toBeInTheDocument();
  });

  it('renders vertical divider', () => {
    const { container } = render(<Divider orientation="vertical" />);
    expect(container.querySelector('hr')).not.toBeInTheDocument();
    expect(container.firstChild).toHaveClass('w-px');
  });

  it('applies variant classes', () => {
    const { rerender } = render(<Divider variant="dashed" />);
    expect(document.querySelector('hr')).toHaveClass('border-dashed');

    rerender(<Divider variant="solid" />);
    expect(document.querySelector('hr')).toHaveClass('border-solid');
  });

  it('applies spacing classes', () => {
    const { rerender } = render(<Divider spacing="sm" />);
    expect(document.querySelector('hr')).toHaveClass('my-2');

    rerender(<Divider spacing="lg" />);
    expect(document.querySelector('hr')).toHaveClass('my-6');
  });
});
