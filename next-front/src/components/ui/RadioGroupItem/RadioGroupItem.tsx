import React from 'react';
import styles from './RadioGroupItem.module.css';
import { Label } from '../Label/Label';

// RadioGroupItemのProps型定義
type RadioGroupItemProps = {
  /** ラジオボタンの値 */
  value: string;
  /** ラジオボタンのID */
  id: string;
  /** ラジオボタンのラベル */
  label: string;
  /** disabled状態の管理 */
  disabled?: boolean;
  /** 追加のクラス名 */
  className?: string;
};

// RadioGroupのコンテキスト型定義（RadioGroupから共通で使用）
type RadioGroupContextType = {
  selectedValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  groupDisabled?: boolean;
};

// RadioGroupコンテキストの作成（RadioGroupから共通で使用）
export const RadioGroupContext =
  React.createContext<RadioGroupContextType | null>(null);

/**
 * RadioGroupItem コンポーネント
 *
 * ラジオボタンの個別アイテムです。RadioGroupコンポーネント内で使用します。
 *
 * @param value - ラジオボタンの値
 * @param id - ラジオボタンのID（ラベルとの関連付けに使用）
 * @param disabled - コンポーネントの無効化状態
 * @param className - 追加のCSSクラス
 */
export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
  value,
  id,
  label,
  disabled = false,
  className,
}) => {
  // RadioGroupコンテキストから値を取得
  const context = React.useContext(RadioGroupContext);

  if (!context) {
    throw new Error('RadioGroupItem must be used within a RadioGroup');
  }

  const { selectedValue, onValueChange, name, groupDisabled } = context;
  const isChecked = selectedValue === value;
  const isDisabled = disabled || groupDisabled;

  // ラジオボタンのクラス名を生成
  const radioClass = `${styles.radioItem} ${isChecked ? styles.checked : ''} ${
    isDisabled ? styles.disabled : ''
  } ${className || ''}`.trim();

  const labelClass = `${styles.label} ${
    isDisabled ? styles.disabled : ''
  }`.trim();

  // 値変更ハンドラー
  const handleChange = () => {
    if (isDisabled) return;
    onValueChange?.(value);
  };

  return (
    <div className={styles.container}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        onChange={handleChange}
        className={radioClass}
        data-testid={`radio-item-${value}`}
      />
      <Label htmlFor={id} className={labelClass}>
        {label}
      </Label>
    </div>
  );
};
