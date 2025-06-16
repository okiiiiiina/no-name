import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Sidebar } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Sidebarのタイトル',
    },
    isOpen: {
      control: 'boolean',
      defaultValue: false,
      description: 'Sidebarの開閉状態',
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Sidebarの位置',
    },
    variant: {
      control: 'select',
      options: ['permanent', 'temporary'],
      description: 'Sidebarの表示形式',
    },
    width: {
      control: 'text',
      description: 'Sidebarの幅（CSS値）',
    },
    disableAnimation: {
      control: 'boolean',
      description: 'アニメーションを無効にするか',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

// アイコンコンポーネント（デモ用）
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <title>ホームアイコン</title>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const DashboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <title>ダッシュボードアイコン</title>
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <title>設定アイコン</title>
    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
  </svg>
);

const HelpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <title>ヘルプアイコン</title>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
  </svg>
);

const InteractiveSidebar = ({
  ...args
}: React.ComponentProps<typeof Sidebar>) => {
  const [isOpen, setIsOpen] = useState(args.isOpen || false);

  // ナビゲーションアイテムをコンポーネント内で生成（React要素を含むため）
  const navigationItems = [
    { title: 'ホーム', href: '/home', icon: <HomeIcon /> },
    { title: 'ダッシュボード', href: '/dashboard', icon: <DashboardIcon /> },
    { title: '設定', href: '/settings', icon: <SettingsIcon /> },
    { title: 'ヘルプ', href: '/help', icon: <HelpIcon /> },
  ];

  // childrenがデフォルトの場合、navigationItemsを使用
  const sidebarChildren =
    args.children === 'navigation' ? navigationItems : args.children;

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        height: '100vh',
        flexDirection: args.variant === 'permanent' ? 'row' : 'column',
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'absolute',
          top: '20px',
          left:
            isOpen && args.position === 'left'
              ? `calc(${args.width || '280px'} + 20px)`
              : args.variant === 'permanent' && args.position === 'right'
              ? '20px'
              : '20px',
          right:
            isOpen && args.position === 'right'
              ? `calc(${args.width || '280px'} + 20px)`
              : 'auto',
          zIndex: 1001,
          width: '200px',
          padding: '8px 16px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
        }}
      >
        {isOpen ? 'Sidebarを閉じる' : 'Sidebarを開く'}
      </button>

      {args.variant === 'permanent' && args.position === 'left' && isOpen && (
        <Sidebar {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {sidebarChildren}
        </Sidebar>
      )}

      {/* メインコンテンツ */}
      <div
        style={{
          padding: '20px',
          transition:
            args.variant === 'permanent' ? 'none' : 'margin 0.3s ease',
          flex: 1,
          marginLeft:
            args.variant === 'temporary' && isOpen && args.position === 'left'
              ? args.width || '280px'
              : '0',
          marginRight:
            args.variant === 'temporary' && isOpen && args.position === 'right'
              ? args.width || '280px'
              : '0',
        }}
      >
        <h1>メインコンテンツ</h1>
        <p>
          これはページのメインコンテンツです。Sidebarの動作を確認してください。
        </p>
        <p>
          ナビゲーションアイテムには、ホバー効果、フォーカス効果、アクティブ状態のスタイリングが適用されています。
        </p>
      </div>

      {((args.variant === 'permanent' && args.position === 'right' && isOpen) ||
        args.variant === 'temporary') && (
        <Sidebar {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {sidebarChildren}
        </Sidebar>
      )}
    </div>
  );
};

/**
 * デフォルトのSidebar（permanentバリアント、左側配置）
 */
export const Default: Story = {
  render: (args) => <InteractiveSidebar {...args} />,
  args: {
    title: 'ナビゲーション',
    children: 'navigation',
    isOpen: true,
    position: 'left',
    variant: 'permanent',
    width: '280px',
    disableAnimation: false,
  },
};

/**
 * temporaryバリアントのSidebar（オーバーレイ付き）
 */
export const Temporary: Story = {
  render: (args) => <InteractiveSidebar {...args} />,
  args: {
    title: 'メニュー',
    children: 'navigation',
    isOpen: false,
    position: 'left',
    variant: 'temporary',
    width: '280px',
    disableAnimation: false,
  },
};

/**
 * 右側配置のSidebar
 */
export const RightPosition: Story = {
  render: (args) => <InteractiveSidebar {...args} />,
  args: {
    title: '設定パネル',
    children: 'navigation',
    isOpen: true,
    position: 'right',
    variant: 'permanent',
    width: '280px',
    disableAnimation: false,
  },
};

/**
 * カスタム幅のSidebar
 */
export const CustomWidth: Story = {
  render: (args) => <InteractiveSidebar {...args} />,
  args: {
    title: 'ワイドナビゲーション',
    children: 'navigation',
    isOpen: true,
    position: 'left',
    variant: 'permanent',
    width: '350px',
    disableAnimation: false,
  },
};

/**
 * アニメーション無効のSidebar
 */
export const NoAnimation: Story = {
  render: (args) => <InteractiveSidebar {...args} />,
  args: {
    title: 'アニメーション無効',
    children: 'navigation',
    isOpen: false,
    position: 'left',
    variant: 'temporary',
    width: '280px',
    disableAnimation: true,
  },
};

/**
 * カスタムコンテンツのSidebar
 */
export const CustomContent: Story = {
  render: (args) => <InteractiveSidebar {...args} />,
  args: {
    title: 'カスタムコンテンツ',
    children: (
      <div style={{ padding: '16px' }}>
        <h3>カスタムコンテンツ</h3>
        <p>Sidebarには任意のReactコンポーネントを表示できます。</p>
        <button
          type="button"
          style={{ marginTop: '16px', padding: '8px 16px' }}
        >
          カスタムボタン
        </button>
      </div>
    ),
    isOpen: true,
    position: 'left',
    variant: 'permanent',
    width: '300px',
    disableAnimation: false,
  },
};

/**
 * モバイル表示シミュレーション
 */
export const Mobile: Story = {
  render: (args) => <InteractiveSidebar {...args} />,
  args: {
    title: 'モバイルメニュー',
    children: 'navigation',
    isOpen: false,
    position: 'left',
    variant: 'temporary',
    width: '280px',
    disableAnimation: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
