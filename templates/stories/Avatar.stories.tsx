import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../ui/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'busy'],
    },
    fallback: { control: 'text' },
  },
  args: {
    fallback: 'JD',
    size: 'md',
    shape: 'circle',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Initials: Story = {};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=default',
    fallback: 'User',
  },
};

export const Online: Story = {
  args: { status: 'online' },
};

export const Offline: Story = {
  args: { status: 'offline' },
};

export const Busy: Story = {
  args: { status: 'busy' },
};

export const Square: Story = {
  args: { shape: 'square', fallback: 'SQ' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const ExtraLarge: Story = {
  args: { size: 'xl', fallback: 'XL' },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="sm" fallback="S" />
      <Avatar size="md" fallback="M" />
      <Avatar size="lg" fallback="L" />
      <Avatar size="xl" fallback="XL" />
    </div>
  ),
};
