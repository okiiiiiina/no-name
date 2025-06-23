import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Label } from './index';

const meta = {
  component: Label,
  parameters: {
    docs: {
      description: {
        component:
          'フォーム要素に関連付けるラベルコンポーネントです。ラジオボタン、チェックボックス、入力フィールドなどと組み合わせて使用します。',
      },
    },
  },
  args: {
    htmlFor: 'form-input',
    children: 'ラベルテキスト',
  },
  argTypes: {
    htmlFor: {
      description: 'ラベルに関連付けるinput要素のID',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      description: 'ラベルのテキスト',
      control: 'text',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    className: {
      description: '追加のCSSクラス',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    style: {
      description: 'インラインスタイル',
      control: 'object',
      table: {
        type: { summary: 'React.CSSProperties' },
      },
    },
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof Label>;

/**
 * 基本的なLabelの使用例です。
 */
export const Default: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <input type="text" id={args.htmlFor} placeholder="テキスト入力" />
      <Label {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Labelが存在することを確認
    const label = canvas.getByText('ラベルテキスト');
    await expect(label).toBeInTheDocument();

    // ラベルがfor属性を持っていることを確認
    await expect(label).toHaveAttribute('for', 'form-input');
  },
};

/**
 * チェックボックスと組み合わせたLabelの使用例です。
 */
export const WithCheckbox: Story = {
  args: {
    htmlFor: 'checkbox-input',
    children: 'チェックボックスのラベル',
  },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <input type="checkbox" id={args.htmlFor} />
      <Label {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // チェックボックス用のラベルが存在することを確認
    const label = canvas.getByText('チェックボックスのラベル');
    await expect(label).toBeInTheDocument();
  },
};

/**
 * ラジオボタンと組み合わせたLabelの使用例です。
 */
export const WithRadio: Story = {
  args: {
    htmlFor: 'radio-input',
    children: 'ラジオボタンのラベル',
  },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <input type="radio" id={args.htmlFor} name="radio-group" />
      <Label {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ラジオボタン用のラベルが存在することを確認
    const label = canvas.getByText('ラジオボタンのラベル');
    await expect(label).toBeInTheDocument();
  },
};

/**
 * カスタムスタイルを適用したLabelの使用例です。
 */
export const CustomStyle: Story = {
  args: {
    htmlFor: 'custom-input',
    children: 'カスタムスタイルのラベル',
    style: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#2563eb',
    },
  },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <input type="text" id={args.htmlFor} placeholder="カスタム入力" />
      <Label {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // カスタムスタイルが適用されたラベルが存在することを確認
    const label = canvas.getByText('カスタムスタイルのラベル');
    await expect(label).toBeInTheDocument();
  },
};

/**
 * 長いテキストのLabelの使用例です。
 */
export const LongText: Story = {
  args: {
    htmlFor: 'long-text-input',
    children:
      'これは非常に長いラベルテキストの例です。複数行にわたる場合やテキストが長い場合の表示を確認するために使用します。',
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        maxWidth: '400px',
      }}
    >
      <input type="checkbox" id={args.htmlFor} style={{ marginTop: '2px' }} />
      <Label {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 長いテキストのラベルが存在することを確認
    const label = canvas.getByText(/これは非常に長いラベルテキストの例です/);
    await expect(label).toBeInTheDocument();
  },
};

/**
 * 必須フィールドのLabelの使用例です。
 */
export const Required: Story = {
  args: {
    htmlFor: 'required-input',
    children: (
      <>
        メールアドレス
        <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>
      </>
    ),
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <Label {...args} />
      <input
        type="email"
        id={args.htmlFor}
        placeholder="example@email.com"
        required
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 必須マークを含むラベルが存在することを確認
    const label = canvas.getByText('メールアドレス');
    await expect(label).toBeInTheDocument();

    // 必須マーク（アスタリスク）が存在することを確認
    const requiredMark = canvas.getByText('*');
    await expect(requiredMark).toBeInTheDocument();
  },
};
