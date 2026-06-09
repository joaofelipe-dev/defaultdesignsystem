import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '../ui/Table';

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
];

const sampleHeaders = ['Name', 'Email', 'Role'];

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['simple', 'striped', 'bordered'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    hoverable: { control: 'boolean' },
    selectable: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: {
    variant: 'simple',
    size: 'md',
    hoverable: false,
    selectable: false,
    loading: false,
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Simple: Story = {
  render: () => (
    <Table>
      <thead>
        <tr>
          {sampleHeaders.map((h) => (
            <th key={h} className="text-left font-medium text-muted-foreground">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sampleData.map((row) => (
          <tr key={row.id}>
            <td className="font-medium">{row.name}</td>
            <td>{row.email}</td>
            <td>{row.role}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  ),
};

export const Striped: Story = {
  args: { variant: 'striped' },
  render: (args) => (
    <Table {...args}>
      <thead>
        <tr>
          {sampleHeaders.map((h) => (
            <th key={h} className="text-left font-medium text-muted-foreground">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sampleData.map((row) => (
          <tr key={row.id}>
            <td className="font-medium">{row.name}</td>
            <td>{row.email}</td>
            <td>{row.role}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  ),
};

export const Bordered: Story = {
  args: { variant: 'bordered' },
  render: (args) => (
    <Table {...args}>
      <thead>
        <tr>
          {sampleHeaders.map((h) => (
            <th key={h} className="text-left font-medium text-muted-foreground">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sampleData.map((row) => (
          <tr key={row.id}>
            <td className="font-medium">{row.name}</td>
            <td>{row.email}</td>
            <td>{row.role}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  ),
};

export const Small: Story = {
  args: { size: 'sm' },
  render: (args) => (
    <Table {...args}>
      <thead>
        <tr>
          {sampleHeaders.map((h) => (
            <th key={h} className="text-left font-medium text-muted-foreground">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sampleData.map((row) => (
          <tr key={row.id}>
            <td className="font-medium">{row.name}</td>
            <td>{row.email}</td>
            <td>{row.role}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  ),
};

export const Large: Story = {
  args: { size: 'lg' },
  render: (args) => (
    <Table {...args}>
      <thead>
        <tr>
          {sampleHeaders.map((h) => (
            <th key={h} className="text-left font-medium text-muted-foreground">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sampleData.map((row) => (
          <tr key={row.id}>
            <td className="font-medium">{row.name}</td>
            <td>{row.email}</td>
            <td>{row.role}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  ),
};

export const Hoverable: Story = {
  args: { hoverable: true },
  render: (args) => (
    <Table {...args}>
      <thead>
        <tr>
          {sampleHeaders.map((h) => (
            <th key={h} className="text-left font-medium text-muted-foreground">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sampleData.map((row) => (
          <tr key={row.id}>
            <td className="font-medium">{row.name}</td>
            <td>{row.email}</td>
            <td>{row.role}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  ),
};

export const Loading: Story = {
  args: { loading: true },
  render: (args) => (
    <Table {...args}>
      <thead>
        <tr>
          {sampleHeaders.map((h) => (
            <th key={h} className="text-left font-medium text-muted-foreground">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sampleData.map((row) => (
          <tr key={row.id}>
            <td className="font-medium">{row.name}</td>
            <td>{row.email}</td>
            <td>{row.role}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  ),
};
