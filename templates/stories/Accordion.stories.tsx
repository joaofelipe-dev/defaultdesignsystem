import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '../ui/Accordion';

const sampleItems = [
  {
    id: 'item1',
    title: 'Accordion Item 1',
    content: <p>This is the content for accordion item 1.</p>,
  },
  {
    id: 'item2',
    title: 'Accordion Item 2',
    content: <p>This is the content for accordion item 2.</p>,
  },
  {
    id: 'item3',
    title: 'Accordion Item 3',
    content: <p>This is the content for accordion item 3.</p>,
  },
];

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Click an item to expand its content.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'separated'],
    },
    multiple: { control: 'boolean' },
    collapsible: { control: 'boolean' },
  },
  args: {
    items: sampleItems,
    variant: 'default',
    multiple: false,
    collapsible: true,
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {};

export const Bordered: Story = {
  args: { variant: 'bordered' },
};

export const Separated: Story = {
  args: { variant: 'separated' },
};

export const MultipleOpen: Story = {
  args: { multiple: true },
};

export const NonCollapsible: Story = {
  args: { collapsible: false, defaultOpen: ['item1'] },
};

export const DefaultOpen: Story = {
  args: { defaultOpen: ['item1', 'item3'] },
};
