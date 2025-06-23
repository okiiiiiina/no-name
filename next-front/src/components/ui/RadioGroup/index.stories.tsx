import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent } from '@storybook/test';
import { useState } from 'react';

import { RadioGroup, RadioGroupItem, Label } from './index';

const meta = {
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component:
          'ラジオボタンのグループを管理するコンポーネントです。複数の選択肢から一つだけを選択できます。',
      },
    },
  },
  args: {
    defaultValue: 'option1',
    disabled: false,
    name: 'radio-group-story',
    'data-testid': 'radio-group',
  },
  argTypes: {
    value: {
      description: '制御された値（外部から管理される値）',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    defaultValue: {
      description: 'デフォルトで選択される値',
      control: 'text',
      defaultValue: 'option1',
      table: {
        type: { summary: 'string' },
      },
    },
    onValueChange: {
      description: '値が変更された時のコールバック関数',
      action: 'valueChanged',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    disabled: {
      description: 'グループ全体の無効化状態',
      control: 'boolean',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
      },
    },
    name: {
      description: 'HTML要素のname属性',
      control: 'text',
      defaultValue: 'radio-group',
      table: {
        type: { summary: 'string' },
      },
    },
    'data-testid': {
      description: 'テスト用のデータ属性',
      control: 'text',
      defaultValue: 'radio-group',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof RadioGroup>;

/**
 * 基本的なRadioGroupの使用例です。
 */
export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioGroupItem value="option1" id="option1" />
        <Label htmlFor="option1">オプション 1</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioGroupItem value="option2" id="option2" />
        <Label htmlFor="option2">オプション 2</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioGroupItem value="option3" id="option3" />
        <Label htmlFor="option3">オプション 3</Label>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // RadioGroupが存在することを確認
    const radioGroup = canvas.getByTestId('radio-group');
    await expect(radioGroup).toBeInTheDocument();

    // デフォルト値が選択されていることを確認
    const option1 = canvas.getByTestId('radio-item-option1');
    await expect(option1).toBeChecked();

    // 他のオプションをクリックして選択状態が変わることを確認
    const option2 = canvas.getByTestId('radio-item-option2');
    await userEvent.click(option2);
    await expect(option2).toBeChecked();
    await expect(option1).not.toBeChecked();
  },
};

/**
 * 制御されたRadioGroupの使用例です。
 */
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('comfortable');

    return (
      <div>
        <p>
          選択された値: <strong>{value}</strong>
        </p>
        <RadioGroup {...args} value={value} onValueChange={setValue}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RadioGroupItem value="default" id="controlled-default" />
            <Label htmlFor="controlled-default">デフォルト</Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RadioGroupItem value="comfortable" id="controlled-comfortable" />
            <Label htmlFor="controlled-comfortable">快適</Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RadioGroupItem value="compact" id="controlled-compact" />
            <Label htmlFor="controlled-compact">コンパクト</Label>
          </div>
        </RadioGroup>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 初期値が表示されていることを確認
    const valueDisplay = canvas.getByText('選択された値:');
    await expect(valueDisplay).toBeInTheDocument();

    // "デフォルト"をクリックして値が変更されることを確認
    const defaultOption = canvas.getByTestId('radio-item-default');
    await userEvent.click(defaultOption);
    await expect(defaultOption).toBeChecked();
  },
};

/**
 * 無効化されたRadioGroupの使用例です。
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <RadioGroup {...args}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioGroupItem value="option1" id="disabled-option1" />
        <Label htmlFor="disabled-option1">無効化されたオプション 1</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioGroupItem value="option2" id="disabled-option2" />
        <Label htmlFor="disabled-option2">無効化されたオプション 2</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioGroupItem value="option3" id="disabled-option3" />
        <Label htmlFor="disabled-option3">無効化されたオプション 3</Label>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // RadioGroupが無効化されていることを確認
    const radioGroup = canvas.getByTestId('radio-group');
    await expect(radioGroup).toHaveAttribute('data-disabled', 'true');

    // すべてのラジオボタンが無効化されていることを確認
    const options = canvas.getAllByRole('radio');
    for (const option of options) {
      await expect(option).toBeDisabled();
    }
  },
};

/**
 * 個別のラジオボタンが無効化されたRadioGroupの使用例です。
 */
export const PartiallyDisabled: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioGroupItem value="option1" id="partial-option1" />
        <Label htmlFor="partial-option1">有効なオプション 1</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioGroupItem value="option2" id="partial-option2" disabled />
        <Label htmlFor="partial-option2">無効化されたオプション 2</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioGroupItem value="option3" id="partial-option3" />
        <Label htmlFor="partial-option3">有効なオプション 3</Label>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 無効化されたオプションがクリックできないことを確認
    const disabledOption = canvas.getByTestId('radio-item-option2');
    await expect(disabledOption).toBeDisabled();

    // 有効なオプションは選択できることを確認
    const enabledOption = canvas.getByTestId('radio-item-option3');
    await userEvent.click(enabledOption);
    await expect(enabledOption).toBeChecked();
  },
};

/**
 * 横並びレイアウトのRadioGroupの使用例です。
 */
export const HorizontalLayout: Story = {
  render: (args) => (
    <RadioGroup
      {...args}
      style={{
        flexDirection: 'row',
        gap: '24px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioGroupItem value="small" id="horizontal-small" />
        <Label htmlFor="horizontal-small">小</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioGroupItem value="medium" id="horizontal-medium" />
        <Label htmlFor="horizontal-medium">中</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioGroupItem value="large" id="horizontal-large" />
        <Label htmlFor="horizontal-large">大</Label>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 横並びレイアウトが適用されていることを確認
    const radioGroup = canvas.getByTestId('radio-group');
    await expect(radioGroup).toBeInTheDocument();

    // すべてのオプションが選択可能であることを確認
    const mediumOption = canvas.getByTestId('radio-item-medium');
    await userEvent.click(mediumOption);
    await expect(mediumOption).toBeChecked();
  },
};

/**
 * 通知設定のような実用的な使用例です。
 */
export const NotificationSettings: Story = {
  render: (args) => {
    const [notification, setNotification] = useState('mentions');

    return (
      <div
        style={{
          padding: '16px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
        }}
      >
        <h3
          style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}
        >
          通知設定
        </h3>
        <p style={{ marginBottom: '16px', color: '#6b7280' }}>
          どのような通知を受け取りますか？
        </p>
        <RadioGroup
          value={notification}
          onValueChange={setNotification}
          name="notification-settings"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '8px',
            }}
          >
            <RadioGroupItem value="all" id="notification-all" />
            <div>
              <Label htmlFor="notification-all" style={{ fontWeight: '500' }}>
                すべての新しいメッセージ
              </Label>
              <p
                style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  margin: '4px 0 0 0',
                }}
              >
                すべてのメッセージの通知を受け取ります
              </p>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '8px',
            }}
          >
            <RadioGroupItem value="mentions" id="notification-mentions" />
            <div>
              <Label
                htmlFor="notification-mentions"
                style={{ fontWeight: '500' }}
              >
                ダイレクトメッセージとメンション
              </Label>
              <p
                style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  margin: '4px 0 0 0',
                }}
              >
                あなた宛のメッセージのみ通知を受け取ります
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <RadioGroupItem value="none" id="notification-none" />
            <div>
              <Label htmlFor="notification-none" style={{ fontWeight: '500' }}>
                通知しない
              </Label>
              <p
                style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  margin: '4px 0 0 0',
                }}
              >
                通知を受け取りません
              </p>
            </div>
          </div>
        </RadioGroup>
        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f3f4f6',
            borderRadius: '6px',
          }}
        >
          <strong>現在の設定:</strong>{' '}
          {notification === 'all'
            ? 'すべての新しいメッセージ'
            : notification === 'mentions'
            ? 'ダイレクトメッセージとメンション'
            : '通知しない'}
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 通知設定の見出しが表示されていることを確認
    const heading = canvas.getByText('通知設定');
    await expect(heading).toBeInTheDocument();

    // "すべての新しいメッセージ"を選択
    const allOption = canvas.getByTestId('radio-item-all');
    await userEvent.click(allOption);
    await expect(allOption).toBeChecked();

    // 設定が反映されていることを確認
    const currentSetting = canvas.getByText('現在の設定:');
    await expect(currentSetting).toBeInTheDocument();
  },
};
