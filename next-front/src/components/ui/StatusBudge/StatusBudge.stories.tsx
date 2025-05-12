import type { Meta, StoryObj } from '@storybook/react';

import { StatusBudge } from './StatusBudge';

const meta: Meta<typeof StatusBudge> = {
  component: StatusBudge,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof StatusBudge>;

export const Default: Story = {};