import React from 'react';
import styles from './Switch.module.css';

type Props = {
  /** Switchのチェック状態 */
  checked: boolean;
  /** チェック状態の変更イベントハンドラ */
  onCheckedChange: (checked: boolean) => void;
  /** disabled状態の管理 */
  disabled?: boolean;
  /** Switchのサイズ */
  size?: 'sm' | 'md' | 'lg';
  /** アクセシビリティ用のaria-label */
  'aria-label'?: string;
  /** アクセシビリティ用のaria-labelledby */
  'aria-labelledby'?: string;
  /** data-testid for testing */
  'data-testid'?: string;
  /** 追加のクラス名 */
  className?: string;
  /** id属性 */
  id?: string;
};

/**
 * Switch コンポーネント
 *
 * ユーザーがオン/オフ状態を切り替えることができるインタラクティブな要素です。
 * チェックボックスとは異なり、即座に設定が適用される場面で使用されます。
 *
 * @param checked - Switchのチェック状態
 * @param onCheckedChange - チェック状態が変更された時のコールバック関数
 * @param disabled - コンポーネントの無効化状態
 * @param size - Switchのサイズ (sm, md, lg)
 * @param aria-label - アクセシビリティ用のラベル
 * @param aria-labelledby - アクセシビリティ用のラベル参照
 * @param data-testid - テスト用のデータ属性
 * @param className - 追加のCSSクラス
 * @param id - HTML要素のID
 */
export const Switch: React.FC<Props> = ({
  checked,
  onCheckedChange,
  disabled = false,
  size = 'md',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'data-testid': dataTestId = 'switch',
  className,
  id,
}) => {
  // Switchのルートクラス名を生成
  const switchClass = `${styles.switch} ${styles[`size-${size}`]} ${
    checked ? styles.checked : ''
  } ${disabled ? styles.disabled : ''} ${className || ''}`.trim();

  // トラックのクラス名を生成
  const trackClass = `${styles.track} ${checked ? styles.trackChecked : ''} ${
    disabled ? styles.trackDisabled : ''
  }`;

  // サムのクラス名を生成
  const thumbClass = `${styles.thumb} ${checked ? styles.thumbChecked : ''}`;

  // クリックハンドラー
  const handleClick = () => {
    if (disabled) return;
    onCheckedChange(!checked);
  };

  // キーダウンハンドラー（スペースキーとEnterキーでトグル）
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      onCheckedChange(!checked);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      data-testid={dataTestId}
      data-state={checked ? 'checked' : 'unchecked'}
      data-disabled={disabled ? 'true' : 'false'}
      className={switchClass}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      id={id}
    >
      <span className={trackClass}>
        <span className={thumbClass} />
      </span>
    </button>
  );
};
