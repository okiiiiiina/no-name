import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import Description from './Button.mdx';

const meta = {
  component: Button,
  parameters: {
    docs: {
      description: {
        component: Description,
      },
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    asChild: false,
    onClick: () => {},
  },
  argTypes: {
    onClick: {
      description: 'ボタンのクリックイベント',
      action: 'clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
    disabled: {
      description: 'ボタンの無効化状態',
      control: 'boolean',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
      },
    },
    type: {
      description: 'ボタンのタイプ',
      control: 'select',
      options: ['button', 'submit', undefined],
      defaultValue: 'button',
      table: {
        type: { summary: "'button' | 'submit' | undefined" },
      },
    },
    variant: {
      description: 'ボタンのバリエーション',
      control: 'select',
      options: ['primary', 'secondary', 'text', 'cancel', 'danger'],
      defaultValue: 'primary',
      table: {
        type: {
          summary: "'primary' | 'secondary' | 'text' | 'cancel' | 'danger'",
        },
      },
    },
    size: {
      description: 'ボタンのサイズ',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
      },
    },
    children: {
      description: 'ボタンのラベル',
      control: 'text',
      defaultValue: 'Button',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
} satisfies Meta<typeof Button>;

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

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};
