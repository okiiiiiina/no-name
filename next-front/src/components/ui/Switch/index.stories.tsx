import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent } from '@storybook/test';
import { useState } from 'react';

import { Switch } from './index';

// ラベル付きSwitchのラッパーコンポーネント
const SwitchWithLabel = ({
  label,
  initialChecked = false,
  ...props
}: {
  label: string;
  initialChecked?: boolean;
} & Omit<
  React.ComponentProps<typeof Switch>,
  'checked' | 'onCheckedChange'
>) => {
  const [checked, setChecked] = useState(initialChecked);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Switch checked={checked} onCheckedChange={setChecked} {...props} />
      <label
        style={{
          fontSize: '14px',
          color: props.disabled ? '#999' : 'inherit',
        }}
        onClick={() => !props.disabled && setChecked(!checked)}
      >
        {label}
      </label>
    </div>
  );
};

const meta = {
  component: Switch,
  parameters: {
    docs: {
      description: {
        component:
          'オン/オフ状態を切り替えるためのSwitchコンポーネントです。設定の有効/無効を即座に切り替える場面で使用します。',
      },
    },
  },
  args: {
    checked: false,
    onCheckedChange: () => {},
    disabled: false,
    size: 'md',
  },
  argTypes: {
    checked: {
      description: 'Switchのチェック状態',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onCheckedChange: {
      description: 'チェック状態変更時のコールバック関数',
      action: 'checked-change',
      table: {
        type: { summary: '(checked: boolean) => void' },
      },
    },
    disabled: {
      description: 'Switchの無効化状態',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
    size: {
      description: 'Switchのサイズ',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
      },
    },
    'aria-label': {
      description: 'アクセシビリティ用のラベル',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    'aria-labelledby': {
      description: 'アクセシビリティ用のラベル参照',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    'data-testid': {
      description: 'テスト用のデータ属性',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    className: {
      description: '追加のCSSクラス',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    id: {
      description: 'HTML要素のID',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

// 基本的なSwitch
export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switchが存在することを確認
    const switchElement = canvas.getByRole('switch');
    await expect(switchElement).toBeInTheDocument();

    // 初期状態でチェックされていないことを確認
    await expect(switchElement).toHaveAttribute('aria-checked', 'false');

    // クリックしてチェック状態を変更
    await userEvent.click(switchElement);
    await expect(switchElement).toHaveAttribute('aria-checked', 'true');

    // もう一度クリックして元に戻す
    await userEvent.click(switchElement);
    await expect(switchElement).toHaveAttribute('aria-checked', 'false');
  },
};

// チェック済みのSwitch
export const Checked: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(true);
    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const switchElement = canvas.getByRole('switch');
    await expect(switchElement).toHaveAttribute('aria-checked', 'true');
    await expect(switchElement).toHaveAttribute('data-state', 'checked');
  },
};

// 無効状態のSwitch
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const switchElement = canvas.getByRole('switch');
    await expect(switchElement).toBeDisabled();
    await expect(switchElement).toHaveAttribute('data-disabled', 'true');

    // 無効状態ではクリックしても状態が変わらないことを確認
    await userEvent.click(switchElement);
    await expect(switchElement).toHaveAttribute('aria-checked', 'false');
  },
};

// チェック済み&無効状態のSwitch
export const CheckedDisabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    const [checked, setChecked] = useState(true);
    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};

// 小サイズのSwitch
export const Small: Story = {
  args: {
    size: 'sm',
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};

// 大サイズのSwitch
export const Large: Story = {
  args: {
    size: 'lg',
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};

// ラベル付きのSwitch
export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <SwitchWithLabel label="メール通知を受け取る" />
      <SwitchWithLabel label="プッシュ通知を有効にする" initialChecked={true} />
      <SwitchWithLabel label="自動保存機能" disabled />
      <SwitchWithLabel label="ダークモード" initialChecked={true} disabled />
    </div>
  ),
};

// サイズ比較
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <SwitchWithLabel label="Small" size="sm" />
        <span style={{ fontSize: '12px', color: '#666' }}>sm</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <SwitchWithLabel label="Medium" size="md" />
        <span style={{ fontSize: '12px', color: '#666' }}>md (default)</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <SwitchWithLabel label="Large" size="lg" />
        <span style={{ fontSize: '12px', color: '#666' }}>lg</span>
      </div>
    </div>
  ),
};

// キーボード操作のテスト
export const KeyboardInteraction: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    return (
      <div style={{ padding: '20px' }}>
        <p style={{ marginBottom: '16px', fontSize: '14px' }}>
          Switchにフォーカスを当てて、SpaceキーまたはEnterキーで切り替えができます。
        </p>
        <Switch
          {...args}
          checked={checked}
          onCheckedChange={setChecked}
          aria-label="キーボード操作テスト用のSwitch"
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const switchElement = canvas.getByRole('switch');

    // フォーカスを当てる
    switchElement.focus();
    await expect(switchElement).toHaveFocus();

    // Spaceキーで切り替え
    await userEvent.keyboard(' ');
    await expect(switchElement).toHaveAttribute('aria-checked', 'true');

    // Enterキーで切り替え
    await userEvent.keyboard('{Enter}');
    await expect(switchElement).toHaveAttribute('aria-checked', 'false');
  },
};
