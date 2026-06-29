import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '../ui/Tabs';

const sampleTabs = [
  { id: 'tab1', label: 'Tab 1', content: <p>Content for Tab 1</p> },
  { id: 'tab2', label: 'Tab 2', content: <p>Content for Tab 2</p> },
  { id: 'tab3', label: 'Tab 3', content: <p>Content for Tab 3</p> },
];

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Click a tab to switch its content.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'solid', 'pills'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    fullWidth: { control: 'boolean' },
  },
  args: {
    tabs: sampleTabs,
    variant: 'line',
    size: 'md',
    orientation: 'horizontal',
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Line: Story = {};

export const Solid: Story = {
  args: { variant: 'solid' },
};

export const Pills: Story = {
  args: { variant: 'pills' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
};

export const ManyTabs: Story = {
  args: {
    tabs: Array.from({ length: 8 }, (_, i) => ({
      id: `tab${i + 1}`,
      label: `Tab ${i + 1}`,
      content: <p>Content for tab {i + 1}</p>,
    })),
  },
};
