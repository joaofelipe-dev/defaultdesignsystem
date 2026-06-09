import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './Tabs';

const tabs = [
  { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
  { id: 'tab2', label: 'Tab 2', content: 'Content 2' },
  { id: 'tab3', label: 'Tab 3', content: 'Content 3' },
];

function getVisiblePanel() {
  const panels = screen.getAllByRole('tabpanel', { hidden: true });
  return panels.find((p) => p.classList.contains('block'))!;
}

describe('Tabs', () => {
  it('renders tablist role', () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders all tab buttons', () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 3' })).toBeInTheDocument();
  });

  it('shows first tab content by default', () => {
    render(<Tabs tabs={tabs} />);
    expect(getVisiblePanel()).toHaveTextContent('Content 1');
  });

  it('shows correct tabpanel on click', async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} />);
    await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(getVisiblePanel()).toHaveTextContent('Content 2');
  });

  it('sets aria-selected correctly', () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'false');
  });

  it('links tab and tabpanel via aria-controls and aria-labelledby', () => {
    render(<Tabs tabs={tabs} />);
    const tab = screen.getByRole('tab', { name: 'Tab 1' });
    const panel = screen.getByRole('tabpanel', { hidden: true, name: 'Tab 1' });
    expect(tab).toHaveAttribute('aria-controls');
    expect(panel).toHaveAttribute('aria-labelledby');
    expect(tab.getAttribute('aria-controls')).toBe(panel.getAttribute('id'));
  });

  it('uses defaultTab when provided', () => {
    render(<Tabs tabs={tabs} defaultTab="tab2" />);
    expect(getVisiblePanel()).toHaveTextContent('Content 2');
  });

  it('has tabIndex -1 on inactive tabs', () => {
    render(<Tabs tabs={tabs} />);
    const activeTab = screen.getByRole('tab', { name: 'Tab 1' });
    const inactiveTab = screen.getByRole('tab', { name: 'Tab 2' });
    expect(activeTab).toHaveAttribute('tabindex', '0');
    expect(inactiveTab).toHaveAttribute('tabindex', '-1');
  });

  it('supports arrow key navigation', async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} />);
    screen.getByRole('tab', { name: 'Tab 1' }).focus();
    await user.keyboard('{ArrowRight}');
    expect(getVisiblePanel()).toHaveTextContent('Content 2');
  });

  it('renders empty state gracefully', () => {
    render(<Tabs tabs={[]} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });
});
