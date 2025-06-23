import React from 'react';
import styles from './index.module.css';
import { RadioGroupContext } from '../RadioGroupItem';

// RadioGroupのProps型定義
type RadioGroupProps = {
  /** 現在選択されている値 */
  value?: string;
  /** デフォルトで選択される値 */
  defaultValue?: string;
  /** 値が変更された時のコールバック関数 */
  onValueChange?: (value: string) => void;
  /** disabled状態の管理 */
  disabled?: boolean;
  /** 子要素 */
  children: React.ReactNode;
  /** 追加のクラス名 */
  className?: string;
  /** data-testid for testing */
  'data-testid'?: string;
  /** HTML要素のname属性 */
  name?: string;
  /** インラインスタイル */
  style?: React.CSSProperties;
};

// RadioGroupのコンテキスト型定義
type RadioGroupContextType = {
  selectedValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  groupDisabled?: boolean;
};

/**
 * RadioGroup コンポーネント
 *
 * ラジオボタンのグループを管理するコンポーネントです。
 * 複数の選択肢から一つだけを選択できます。
 *
 * @param value - 制御された値（外部から管理される値）
 * @param defaultValue - デフォルトで選択される値
 * @param onValueChange - 値が変更された時のコールバック関数
 * @param disabled - グループ全体の無効化状態
 * @param children - RadioGroupItemコンポーネントを含む子要素
 * @param className - 追加のCSSクラス
 * @param data-testid - テスト用のデータ属性
 * @param name - HTML要素のname属性
 * @param style - インラインスタイル
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  children,
  className,
  'data-testid': dataTestId = 'radio-group',
  name = 'radio-group',
  style,
}) => {
  // 内部状態の管理（非制御コンポーネント用）
  const [internalValue, setInternalValue] = React.useState<string | undefined>(
    defaultValue
  );

  // 制御された値か内部値かを判定
  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;

  // 値変更ハンドラー
  const handleValueChange = (newValue: string) => {
    if (disabled) return;

    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  // RadioGroupのクラス名を生成
  const radioGroupClass = `${styles.radioGroup} ${
    disabled ? styles.groupDisabled : ''
  } ${className || ''}`.trim();

  // コンテキストの値
  const contextValue: RadioGroupContextType = {
    selectedValue,
    onValueChange: handleValueChange,
    name,
    groupDisabled: disabled,
  };

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div
        className={radioGroupClass}
        role="radiogroup"
        data-testid={dataTestId}
        data-disabled={disabled ? 'true' : 'false'}
        style={style}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

// 便利なエクスポート（分離されたコンポーネントの再エクスポート）
export { RadioGroupItem } from '../RadioGroupItem';
export { Label } from '../Label';
