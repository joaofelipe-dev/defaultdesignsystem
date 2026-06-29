import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../ui/Switch';
import { useState } from 'react';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'danger'],
    },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
  args: {
    size: 'md',
    color: 'primary',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Success: Story = {
  args: { color: 'success', checked: true },
};

export const Danger: Story = {
  args: { color: 'danger', checked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true },
};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Click the switch to toggle it on and off.',
      },
    },
  },
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground/60 italic">Click the switch to toggle</p>
        <div className="flex items-center gap-4">
          <Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          <span className="text-sm text-muted-foreground">{checked ? 'On' : 'Off'}</span>
        </div>
      </div>
    );
  },
};
