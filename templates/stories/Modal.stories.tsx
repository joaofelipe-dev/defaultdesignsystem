import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useState } from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    variant: {
      control: 'select',
      options: ['default', 'fullscreen', 'centered'],
    },
    closeOnOverlayClick: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    open: false,
    title: 'Modal Title',
    description: 'Modal description goes here.',
    children: 'Modal content',
    size: 'md',
    variant: 'centered',
    closeOnOverlayClick: true,
    closeOnEsc: true,
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Modal Title"
          description="This is a description for the modal."
        >
          <p>This is the modal content. You can put anything here.</p>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </div>
        </Modal>
      </>
    );
  },
};

export const Small: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Small Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Small Modal"
          size="sm"
        >
          <p>Small modal content.</p>
        </Modal>
      </>
    );
  },
};

export const Large: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Large Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Large Modal"
          size="lg"
        >
          <p>Large modal content with more space.</p>
        </Modal>
      </>
    );
  },
};

export const WithoutDescription: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="No Description">
          <p>This modal has no description.</p>
        </Modal>
      </>
    );
  },
};
