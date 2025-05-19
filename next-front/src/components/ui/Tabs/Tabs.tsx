'use client';

import React, { createContext, useContext, useState } from 'react';
import styles from './tabs.module.css';

// タブのコンテキスト型定義
type TabsContextType = {
  activeTab: string;
  setActiveTab: (id: string) => void;
  tabsIds: string[];
  registerTab: (id: string) => void;
};

// タブのコンテキスト作成
const TabsContext = createContext<TabsContextType | null>(null);

// コンテキストを使用するためのフック
const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
};

// Tabsコンポーネントのプロップス型定義
type TabsProps = {
  defaultValue?: string;
  children: React.ReactNode;
  className?: string;
};

// メインのTabsコンポーネント
export const Tabs = ({ defaultValue, children, className = '' }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultValue || '');
  const [tabsIds, setTabsIds] = useState<string[]>([]);

  // タブを登録する関数
  const registerTab = (id: string) => {
    setTabsIds((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });

    // 最初のタブをデフォルトでアクティブにする（defaultValueが指定されていない場合）
    if (!defaultValue && tabsIds.length === 0) {
      setActiveTab(id);
    }
  };

  return (
    <TabsContext.Provider
      value={{ activeTab, setActiveTab, tabsIds, registerTab }}
    >
      <div className={`${styles.tabs} ${className}`} data-testid="tabs">
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// TabsListコンポーネントのプロップス型定義
type TabsListProps = {
  children: React.ReactNode;
  className?: string;
};

// タブリストコンポーネント
export const TabsList = ({ children, className = '' }: TabsListProps) => {
  return (
    <div className={`${styles.tabsList} ${className}`} role="tablist">
      {children}
    </div>
  );
};

// TabTriggerコンポーネントのプロップス型定義
type TabTriggerProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
};

// タブトリガーコンポーネント
export const TabTrigger = ({
  value,
  children,
  className = '',
}: TabTriggerProps) => {
  const { activeTab, setActiveTab, registerTab } = useTabs();
  const isActive = activeTab === value;

  // コンポーネントがマウントされたときにタブを登録
  React.useEffect(() => {
    registerTab(value);
  }, [value, registerTab]);

  // キーボードナビゲーション用のハンドラー
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTab(value);
    }
  };

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      className={`${styles.tabTrigger} ${
        isActive ? styles.active : ''
      } ${className}`}
      onClick={() => setActiveTab(value)}
      onKeyDown={handleKeyDown}
      id={`tab-${value}`}
      aria-controls={`tabpanel-${value}`}
      data-state={isActive ? 'active' : 'inactive'}
    >
      {children}
      {isActive && <div className={styles.activeIndicator} />}
    </button>
  );
};

// TabContentコンポーネントのプロップス型定義
type TabContentProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
};

// タブコンテンツコンポーネント
export const TabContent = ({
  value,
  children,
  className = '',
}: TabContentProps) => {
  const { activeTab } = useTabs();
  const isActive = activeTab === value;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      className={`${styles.tabContent} ${className}`}
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
    >
      {children}
    </div>
  );
};
