'use client';

import { createContext, useContext, useEffect, useState } from 'react';
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

// TabsコンポーネントのProps型定義
type TabsProps = {
  defaultValue?: string;
  children: React.ReactNode;
};

// メインのTabsコンポーネント
export const Tabs: React.FC<TabsProps> = ({ defaultValue, children }) => {
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
      <div className={styles.tabs} data-testid="tabs">
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// TabsListコンポーネントのProps型定義
type TabsListProps = {
  children: React.ReactNode;
};

// タブリストコンポーネント
export const TabsList: React.FC<TabsListProps> = ({ children }) => {
  return (
    <div className={styles.tabsList} role="tablist">
      {children}
    </div>
  );
};

// TabTriggerコンポーネントのProps型定義
type TabTriggerProps = {
  value: string;
  children: React.ReactNode;
};

// トリガーコンポーネント
export const TabTrigger: React.FC<TabTriggerProps> = ({ value, children }) => {
  const { activeTab, setActiveTab, registerTab } = useTabs();
  const isActive = activeTab === value;

  // コンポーネントがマウントされたときにタブを登録
  useEffect(() => {
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
      className={`${styles.tabTrigger} ${isActive ? styles.active : ''}`}
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

// TabContentコンポーネントのProps型定義
type TabContentProps = {
  value: string;
  children: React.ReactNode;
};

// コンテンツコンポーネント
export const TabContent: React.FC<TabContentProps> = ({ value, children }) => {
  const { activeTab } = useTabs();
  const isActive = activeTab === value;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      className={styles.tabContent}
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
    >
      {children}
    </div>
  );
};
