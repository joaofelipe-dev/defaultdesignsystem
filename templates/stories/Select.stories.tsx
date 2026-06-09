import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../ui/Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'filled'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    status: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
  },
  args: {
    variant: 'default',
    size: 'md',
    status: 'default',
    disabled: false,
    multiple: false,
    children: (
      <>
        <option value="">Select an option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const Outline: Story = {
  args: { variant: 'outline' },
};

export const Filled: Story = {
  args: { variant: 'filled' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Error: Story = {
  args: { status: 'error' },
};

export const Success: Story = {
  args: { status: 'success' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Multiple: Story = {
  args: {
    multiple: true,
    size: 'md',
    children: (
      <>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
      </>
    ),
  },
};
