import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Gallery } from './Showcase.stories';

beforeEach(() => {
  class MockIntersectionObserver {
    observe = vi.fn();
    disconnect = vi.fn();
    unobserve = vi.fn();
  }
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver as unknown as typeof IntersectionObserver);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function openPopup() {
  return userEvent.setup().click(screen.getByText('Appearance'));
}

describe('Gallery theme popup', () => {
  it('opens when theme button is clicked', async () => {
    render(<Gallery />);
    await openPopup();

    await waitFor(() => {
      expect(screen.getAllByText('Accent Color').length).toBe(2);
    });
  });

  it('closes on Escape key', async () => {
    render(<Gallery />);
    await openPopup();

    await waitFor(() => {
      expect(screen.getAllByText('Accent Color').length).toBe(2);
    });

    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryAllByText('Accent Color').length).toBe(0);
    });
  });

  it('stays open when clicking inside the popup', async () => {
    render(<Gallery />);
    await openPopup();

    await waitFor(() => {
      expect(screen.getAllByText('Accent Color').length).toBe(2);
    });

    await userEvent.click(screen.getAllByText('Accent Color')[0]);

    expect(screen.getAllByText('Accent Color').length).toBe(2);
  });

  it('closes when clicking the backdrop', async () => {
    render(<Gallery />);
    await openPopup();

    await waitFor(() => {
      expect(screen.getAllByText('Accent Color').length).toBe(2);
    });

    const backdrops = document.querySelectorAll('.fixed.inset-0.z-50 > .absolute.inset-0');
    if (backdrops.length > 0) {
      await userEvent.click(backdrops[0]);
      await waitFor(() => {
        expect(screen.queryAllByText('Accent Color').length).toBe(0);
      });
    }
  });
});
