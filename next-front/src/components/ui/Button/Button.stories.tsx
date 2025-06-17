import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent } from '@storybook/test';

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
    asChild: {
      description: 'ボタンの子要素を使用するかどうか',
      control: 'boolean',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  play: async ({ canvasElement }) => {
    // キャンバス要素を取得してテスト範囲を設定
    const canvas = within(canvasElement);

    // ボタンが存在することを確認
    const button = canvas.getByRole('button', { name: 'Button' });
    await expect(button).toBeInTheDocument();

    // data属性でプライマリーバリアントが適用されていることを確認
    await expect(button).toHaveAttribute('data-variant', 'primary');

    // ボタンがクリック可能であることを確認
    await userEvent.click(button);
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ボタンが存在することを確認
    const button = canvas.getByRole('button', { name: 'Button' });
    await expect(button).toBeInTheDocument();

    // data属性でSecondaryが適用されていることを確認
    await expect(button).toHaveAttribute('data-variant', 'secondary');

    // ボタンがクリック可能であることを確認
    await userEvent.click(button);
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ボタンが存在することを確認
    const button = canvas.getByRole('button', { name: 'Button' });
    await expect(button).toBeInTheDocument();

    // data属性でTextが適用されていることを確認
    await expect(button).toHaveAttribute('data-variant', 'text');

    // ボタンがクリック可能であることを確認
    await userEvent.click(button);
  },
};

export const Cancel: Story = {
  args: {
    variant: 'cancel',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ボタンが存在することを確認
    const button = canvas.getByRole('button', { name: 'Button' });
    await expect(button).toBeInTheDocument();

    // data属性でCancelが適用されていることを確認
    await expect(button).toHaveAttribute('data-variant', 'cancel');

    // ボタンがクリック可能であることを確認
    await userEvent.click(button);
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ボタンが存在することを確認
    const button = canvas.getByRole('button', { name: 'Button' });
    await expect(button).toBeInTheDocument();

    // data属性でDangerが適用されていることを確認
    await expect(button).toHaveAttribute('data-variant', 'danger');

    // ボタンがクリック可能であることを確認
    await userEvent.click(button);
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ボタンが存在することを確認
    const button = canvas.getByRole('button', { name: 'Button' });
    await expect(button).toBeInTheDocument();

    // data属性でSmallが適用されていることを確認
    await expect(button).toHaveAttribute('data-size', 'sm');

    // ボタンがクリック可能であることを確認
    await userEvent.click(button);
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ボタンが存在することを確認
    const button = canvas.getByRole('button', { name: 'Button' });
    await expect(button).toBeInTheDocument();

    // data属性でMediumが適用されていることを確認
    await expect(button).toHaveAttribute('data-size', 'md');

    // ボタンがクリック可能であることを確認
    await userEvent.click(button);
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ボタンが存在することを確認
    const button = canvas.getByRole('button', { name: 'Button' });
    await expect(button).toBeInTheDocument();

    // data属性でLargeが適用されていることを確認
    await expect(button).toHaveAttribute('data-size', 'lg');

    // ボタンがクリック可能であることを確認
    await userEvent.click(button);
  },
};

// 無効状態のテスト用ストーリーを追加
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ボタンが存在することを確認
    const button = canvas.getByRole('button', { name: 'Button' });
    await expect(button).toBeInTheDocument();

    // ボタンが無効状態であることを確認
    await expect(button).toBeDisabled();
  },
};
