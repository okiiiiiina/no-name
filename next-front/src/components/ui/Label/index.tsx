import React from 'react';
import styles from './index.module.css';

// ラベルコンポーネントのProps型定義
type LabelProps = {
  /** ラベルに関連付けるinput要素のID */
  htmlFor: string;
  /** ラベルのテキスト */
  children: React.ReactNode;
  /** 追加のクラス名 */
  className?: string;
  /** インラインスタイル */
  style?: React.CSSProperties;
};

/**
 * Label コンポーネント
 *
 * フォーム要素に関連付けるラベルコンポーネントです。
 * ラジオボタン、チェックボックス、入力フィールドなどと組み合わせて使用します。
 *
 * @param htmlFor - ラベルに関連付けるinput要素のID
 * @param children - ラベルのテキスト
 * @param className - 追加のCSSクラス
 * @param style - インラインスタイル
 */
export const Label: React.FC<LabelProps> = ({
  htmlFor,
  children,
  className,
  style,
}) => {
  const labelClass = `${styles.label} ${className || ''}`.trim();

  return (
    <label htmlFor={htmlFor} className={labelClass} style={style}>
      {children}
    </label>
  );
};
