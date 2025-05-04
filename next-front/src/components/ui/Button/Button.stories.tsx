import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  args: {
    onClick: action('clicked'),
    disabled: false,
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['button', 'submit', undefined],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'text', 'cancel', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
  },
};

export const Cancel: Story = {
  args: {
    variant: 'cancel',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
};
