import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './Accordion';

const items = [
  { id: 'item1', title: 'Title 1', content: 'Content 1' },
  { id: 'item2', title: 'Title 2', content: 'Content 2' },
];

describe('Accordion', () => {
  it('renders all items', () => {
    render(<Accordion items={items} />);
    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('Title 2')).toBeInTheDocument();
  });

  it('shows no content by default', () => {
    render(<Accordion items={items} />);
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('opens item on click', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    await user.click(screen.getByText('Title 1'));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('closes item when clicked again (collapsible)', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    await user.click(screen.getByText('Title 1'));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    await user.click(screen.getByText('Title 1'));
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('keeps item open when collapsible is false', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} collapsible={false} />);
    await user.click(screen.getByText('Title 1'));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    await user.click(screen.getByText('Title 1'));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('opens multiple items when multiple is true', async () => {
    const user = userEvent.setup();
    render(<Accordion multiple items={items} />);
    await user.click(screen.getByText('Title 1'));
    await user.click(screen.getByText('Title 2'));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('opens default items', () => {
    render(<Accordion items={items} defaultOpen={['item1']} />);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('sets aria-expanded on toggle buttons', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const button = screen.getByText('Title 1').closest('button')!;
    expect(button).toHaveAttribute('aria-expanded', 'false');
    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('links button to panel via aria-controls', () => {
    render(<Accordion items={items} defaultOpen={['item1']} />);
    const button = screen.getByText('Title 1').closest('button')!;
    const panel = screen.getByText('Content 1').closest('[role="region"]')!;
    expect(button.getAttribute('aria-controls')).toBe(panel.getAttribute('id'));
  });
});
