import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../ui/Checkbox';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
  args: {
    size: 'md',
    indeterminate: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
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
        story: 'Click the checkbox to toggle it on and off.',
      },
    },
  },
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground/60 italic">Click the checkbox to toggle</p>
        <div className="flex items-center gap-4">
          <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          <span className="text-sm text-muted-foreground">{checked ? 'Checked' : 'Unchecked'}</span>
        </div>
      </div>
    );
  },
};
