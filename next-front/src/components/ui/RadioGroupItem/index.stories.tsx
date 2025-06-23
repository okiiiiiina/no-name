import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent } from '@storybook/test';
import { useState } from 'react';

import { RadioGroupItem, RadioGroupContext } from './index';

// テスト用のRadioGroupContextProvider
const MockRadioGroupProvider: React.FC<{
  children: React.ReactNode;
  selectedValue?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}> = ({ children, selectedValue, disabled = false, onValueChange }) => {
  const [value, setValue] = useState(selectedValue);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onValueChange?.(newValue);
  };

  const contextValue = {
    selectedValue: value,
    onValueChange: handleValueChange,
    name: 'mock-radio-group',
    groupDisabled: disabled,
  };

  return (
    <RadioGroupContext.Provider value={contextValue}>
      {children}
    </RadioGroupContext.Provider>
  );
};

const meta = {
  component: RadioGroupItem,
  parameters: {
    docs: {
      description: {
        component:
          'ラジオボタンの個別アイテムです。RadioGroupコンポーネント内で使用します。',
      },
    },
  },
  args: {
    value: 'option1',
    id: 'radio-item-1',
    disabled: false,
  },
  argTypes: {
    value: {
      description: 'ラジオボタンの値',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    id: {
      description: 'ラジオボタンのID（ラベルとの関連付けに使用）',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      description: 'ラジオボタンのラベル',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      description: 'コンポーネントの無効化状態',
      control: 'boolean',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
      },
    },
    className: {
      description: '追加のCSSクラス',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof RadioGroupItem>;

export default meta;

type Story = StoryObj<typeof RadioGroupItem>;

/**
 * 基本的なRadioGroupItemの使用例です。
 */
export const Default: Story = {
  render: (args) => (
    <MockRadioGroupProvider>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioGroupItem {...args} />
        <label htmlFor={args.id}>ラジオボタン</label>
      </div>
    </MockRadioGroupProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // RadioGroupItemが存在することを確認
    const radioItem = canvas.getByTestId('radio-item-option1');
    await expect(radioItem).toBeInTheDocument();

    // ラジオボタンがクリック可能であることを確認
    await userEvent.click(radioItem);
    await expect(radioItem).toBeChecked();
  },
};

/**
 * 選択された状態のRadioGroupItemです。
 */
export const Selected: Story = {
  render: (args) => (
    <MockRadioGroupProvider selectedValue="option1">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioGroupItem {...args} label="選択されたラジオボタン" />
      </div>
    </MockRadioGroupProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // RadioGroupItemが選択されていることを確認
    const radioItem = canvas.getByTestId('radio-item-option1');
    await expect(radioItem).toBeChecked();
  },
};

/**
 * 無効化されたRadioGroupItemです。
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <MockRadioGroupProvider>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioGroupItem {...args} label="無効化されたラジオボタン" />
      </div>
    </MockRadioGroupProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // RadioGroupItemが無効化されていることを確認
    const radioItem = canvas.getByTestId('radio-item-option1');
    await expect(radioItem).toBeDisabled();
  },
};

/**
 * グループ全体が無効化されている状態のRadioGroupItemです。
 */
export const GroupDisabled: Story = {
  render: (args) => (
    <MockRadioGroupProvider disabled={true}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioGroupItem {...args} label="グループ無効化されたラジオボタン" />
      </div>
    </MockRadioGroupProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // RadioGroupItemがグループレベルで無効化されていることを確認
    const radioItem = canvas.getByTestId('radio-item-option1');
    await expect(radioItem).toBeDisabled();
  },
};

/**
 * 複数のRadioGroupItemの動作例です。
 */
export const MultipleItems: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('option2');

    return (
      <div>
        <p>
          選択された値: <strong>{selectedValue}</strong>
        </p>
        <MockRadioGroupProvider
          selectedValue={selectedValue}
          onValueChange={setSelectedValue}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RadioGroupItem
                value="option1"
                id="multi-option1"
                label="オプション 1"
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RadioGroupItem
                value="option2"
                id="multi-option2"
                label="オプション 2"
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RadioGroupItem
                value="option3"
                id="multi-option3"
                label="オプション 3"
              />
            </div>
          </div>
        </MockRadioGroupProvider>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 初期値が選択されていることを確認
    const option2 = canvas.getByTestId('radio-item-option2');
    await expect(option2).toBeChecked();

    // 他のオプションをクリックして選択状態が変わることを確認
    const option1 = canvas.getByTestId('radio-item-option1');
    await userEvent.click(option1);
    await expect(option1).toBeChecked();
    await expect(option2).not.toBeChecked();
  },
};
