import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../ui/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft'],
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    children: { control: 'text' },
  },
  args: {
    children: 'Badge',
    variant: 'solid',
    color: 'primary',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {};

export const Success: Story = {
  args: { color: 'success', children: 'Success' },
};

export const Warning: Story = {
  args: { color: 'warning', children: 'Warning' },
};

export const Danger: Story = {
  args: { color: 'danger', children: 'Danger' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
};

export const Soft: Story = {
  args: { variant: 'soft', children: 'Soft' },
};

export const Small: Story = {
  args: { size: 'sm', children: 'Small' },
};

export const Large: Story = {
  args: { size: 'lg', children: 'Large' },
};

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 items-center">
      <Badge color="primary">Primary</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="danger">Danger</Badge>
    </div>
  ),
};
