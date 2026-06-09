import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from '../ui/RadioGroup';
import { useState } from 'react';

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    name: 'radio-group',
    options,
    size: 'md',
    orientation: 'vertical',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Vertical: Story = {
  args: { value: 'a' },
};

export const Horizontal: Story = {
  args: { orientation: 'horizontal', value: 'a' },
};

export const Small: Story = {
  args: { size: 'sm', value: 'a' },
};

export const Large: Story = {
  args: { size: 'lg', value: 'a' },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'a' },
};

export const WithDisabledOption: Story = {
  args: {
    value: 'a',
    options: [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b', disabled: true },
      { label: 'Option C', value: 'c' },
    ],
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('a');
    return (
      <div className="space-y-4">
        <RadioGroup
          name="interactive"
          options={options}
          value={value}
          onChange={setValue}
        />
        <p className="text-sm text-muted-foreground">Selected: {value}</p>
      </div>
    );
  },
};
