import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../ui/Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    interactive: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    children: 'This is a card component with some content.',
    variant: 'default',
    padding: 'md',
    interactive: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const Outlined: Story = {
  args: { variant: 'outlined' },
};

export const Elevated: Story = {
  args: { variant: 'elevated' },
};

export const Interactive: Story = {
  args: { interactive: true, children: 'Hover me!' },
};

export const NoPadding: Story = {
  args: { padding: 'none', children: 'No padding content.' },
};

export const WithCustomContent: Story = {
  render: () => (
    <Card className="max-w-sm">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Card Title</h3>
        <p className="text-sm text-muted-foreground">
          This is a card with a title and description. Cards are used to group related information.
        </p>
        <div className="pt-2">
          <button className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-9 px-4 py-2 text-sm font-medium">
            Action
          </button>
        </div>
      </div>
    </Card>
  ),
};
