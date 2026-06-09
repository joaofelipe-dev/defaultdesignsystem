import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '../ui/Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed'],
    },
    spacing: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    spacing: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {};

export const Dashed: Story = {
  args: { variant: 'dashed' },
};

export const SmallSpacing: Story = {
  args: { spacing: 'sm' },
};

export const LargeSpacing: Story = {
  args: { spacing: 'lg' },
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  decorators: [
    (Story) => (
      <div className="flex items-center h-16 gap-4">
        <span>Left</span>
        <Story />
        <span>Right</span>
      </div>
    ),
  ],
};

export const VerticalDashed: Story = {
  args: { orientation: 'vertical', variant: 'dashed' },
  decorators: [
    (Story) => (
      <div className="flex items-center h-16 gap-4">
        <span>Left</span>
        <Story />
        <span>Right</span>
      </div>
    ),
  ],
};

export const WithText: Story = {
  render: () => (
    <div className="space-y-2">
      <p>Section above the divider</p>
      <Divider />
      <p>Section below the divider</p>
    </div>
  ),
};
