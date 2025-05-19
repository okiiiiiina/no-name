import type { Meta, StoryObj } from '@storybook/react';

import { TabContent, Tabs, TabsList, TabTrigger } from './Tabs';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  tags: ['autodocs'],
  args: {
    defaultValue: 'tab1',
    children: ['tab1', 'tab2', 'tab3'],
  },
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'デフォルトで選択されるタブの値',
      table: {
        type: {
          summary: 'string',
        },
      },
      defaultValue: 'tab1',
    },
    children: {
      description: 'タブの内容',
      control: {
        type: 'object',
        select: ['tab1', 'tab2', 'tab3'],
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabTrigger value="tab1">プロフィール</TabTrigger>
        <TabTrigger value="tab2">設定</TabTrigger>
        <TabTrigger value="tab3">通知</TabTrigger>
      </TabsList>
      <TabContent value="tab1">
        <h2>プロフィール</h2>
        <p>
          ここにプロフィール情報が表示されます。ユーザー情報の確認や編集ができます。
        </p>
      </TabContent>
      <TabContent value="tab2">
        <h2>設定</h2>
        <p>アカウント設定やプライバシー設定などを変更できます。</p>
      </TabContent>
      <TabContent value="tab3">
        <h2>通知</h2>
        <p>通知の設定や履歴を確認できます。</p>
      </TabContent>
    </Tabs>
  ),
};
