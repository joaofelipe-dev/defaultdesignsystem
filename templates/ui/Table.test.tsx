import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Table } from './Table';

describe('Table', () => {
  it('renders children', () => {
    render(
      <Table>
        <thead>
          <tr>
            <th>Header</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Data</td>
          </tr>
        </tbody>
      </Table>,
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Data')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(
      <Table ref={ref}>
        <tbody>
          <tr>
            <td />
          </tr>
        </tbody>
      </Table>,
    );
    expect(ref.current).toBeInstanceOf(HTMLTableElement);
  });

  it('applies variant classes', () => {
    const { rerender } = render(
      <Table variant="striped">
        <tbody>
          <tr>
            <td />
          </tr>
        </tbody>
      </Table>,
    );
    const table = screen.getByRole('table');
    expect(table.className).toContain('bg-muted');

    rerender(
      <Table variant="bordered">
        <tbody>
          <tr>
            <td />
          </tr>
        </tbody>
      </Table>,
    );
    expect(screen.getByRole('table').className).toContain('border');
  });

  it('shows loading overlay', () => {
    render(
      <Table loading>
        <tbody>
          <tr>
            <td>Data</td>
          </tr>
        </tbody>
      </Table>,
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('applies opacity when loading', () => {
    const { container } = render(
      <Table loading>
        <tbody>
          <tr>
            <td>Data</td>
          </tr>
        </tbody>
      </Table>,
    );
    expect(container.firstChild).toHaveClass('opacity-60');
  });
});
