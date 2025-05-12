import type { Meta, StoryObj } from '@storybook/react';

import { StatusBudge } from './StatusBudge';

const meta: Meta<typeof StatusBudge> = {
  component: StatusBudge,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['todo', 'in_progress', 'done'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof StatusBudge>;

export const Todo: Story = {
  args: {
    status: 'todo',
  },
};

export const InProgress: Story = {
  args: {
    status: 'in_progress',
  },
};

export const Done: Story = {
  args: {
    status: 'done',
  },
};
