import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../ui/Tooltip';
import { Button } from '../ui/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    variant: {
      control: 'select',
      options: ['dark', 'light'],
    },
    delay: { control: 'number' },
    content: { control: 'text' },
  },
  args: {
    content: 'Tooltip content',
    position: 'top',
    variant: 'dark',
    delay: 200,
    disabled: false,
    children: <Button>Hover me</Button>,
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {};

export const Bottom: Story = {
  args: { position: 'bottom' },
};

export const Left: Story = {
  args: { position: 'left' },
};

export const Right: Story = {
  args: { position: 'right' },
};

export const Light: Story = {
  args: { variant: 'light' },
};

export const LongContent: Story = {
  args: {
    content: 'This is a longer tooltip message with more details.',
  },
};

export const AllPositions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Hover over each button to see the tooltip in different positions.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground/60 italic">Hover over each button to see the tooltip</p>
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 lg:gap-16 p-4 sm:p-8 lg:p-16">
        <Tooltip content="Top tooltip" position="top">
          <Button>Top</Button>
        </Tooltip>
        <Tooltip content="Bottom tooltip" position="bottom">
          <Button>Bottom</Button>
        </Tooltip>
        <Tooltip content="Left tooltip" position="left">
          <Button>Left</Button>
        </Tooltip>
        <Tooltip content="Right tooltip" position="right">
          <Button>Right</Button>
        </Tooltip>
      </div>
    </div>
  ),
};
