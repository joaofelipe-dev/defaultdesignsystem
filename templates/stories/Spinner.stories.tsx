import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '../ui/Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['circular', 'dots', 'bars'],
    },
    color: {
      control: 'select',
      options: ['primary', 'neutral', 'white'],
    },
  },
  args: {
    size: 'md',
    variant: 'circular',
    color: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Circular: Story = {};

export const Dots: Story = {
  args: { variant: 'dots' },
};

export const Bars: Story = {
  args: { variant: 'bars' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg', variant: 'circular' },
};

export const Neutral: Story = {
  args: { color: 'neutral' },
};

export const White: Story = {
  args: { color: 'white' },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4 sm:gap-8">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Circular</span>
        <Spinner variant="circular" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Dots</span>
        <Spinner variant="dots" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Bars</span>
        <Spinner variant="bars" />
      </div>
    </div>
  ),
};
