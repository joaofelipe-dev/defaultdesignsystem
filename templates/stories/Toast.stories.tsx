import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from '../ui/Toast';
import { Button } from '../ui/Button';
import { useState } from 'react';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'top-right', 'bottom-right'],
    },
    duration: { control: 'number' },
    closable: { control: 'boolean' },
    message: { control: 'text' },
  },
  args: {
    message: 'Toast notification message',
    variant: 'info',
    position: 'top-right',
    duration: 3000,
    closable: true,
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Info: Story = {
  args: { variant: 'info' },
};

export const Success: Story = {
  args: { variant: 'success', message: 'Operation completed successfully!' },
};

export const Error: Story = {
  args: { variant: 'error', message: 'Something went wrong.' },
};

export const Warning: Story = {
  args: { variant: 'warning', message: 'Please review this warning.' },
};

export const TopPosition: Story = {
  args: { position: 'top' },
};

export const BottomPosition: Story = {
  args: { position: 'bottom' },
};

export const NonClosable: Story = {
  args: { closable: false },
};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Click the button to show a toast notification.',
      },
    },
  },
  render: () => {
    const [show, setShow] = useState(false);
    return (
      <div className="space-y-4">
        <p className="text-xs text-muted-foreground/60 italic">Click the button to show a toast</p>
        <Button onClick={() => setShow(true)}>Show Toast</Button>
        {show && (
          <Toast
            message="This is an interactive toast!"
            variant="success"
            duration={3000}
            onClose={() => setShow(false)}
          />
        )}
      </div>
    );
  },
};
