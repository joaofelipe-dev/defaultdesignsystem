import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../ui/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    status: {
      control: 'select',
      options: ['default', 'error', 'success', 'warning'],
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    placeholder: 'Placeholder',
    variant: 'default',
    size: 'md',
    status: 'default',
    fullWidth: false,
    disabled: false,
    readOnly: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Filled: Story = {
  args: { variant: 'filled' },
};

export const Outline: Story = {
  args: { variant: 'outline' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Error: Story = {
  args: { status: 'error', placeholder: 'Error state' },
};

export const Success: Story = {
  args: { status: 'success', placeholder: 'Success state' },
};

export const Warning: Story = {
  args: { status: 'warning', placeholder: 'Warning state' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithIcons: Story = {
  args: {
    leftIcon: <span>🔍</span>,
    rightIcon: <span>✕</span>,
    placeholder: 'Search...',
  },
};
