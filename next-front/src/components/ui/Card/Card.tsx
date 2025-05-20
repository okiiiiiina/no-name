import styles from './Card.module.css';

type Props = {
  children: React.ReactNode;
};

/**
 * メインのCardコンポーネント
 * CardコンポーネントでHeaderやBodyをwrapして使用する。
 */
export const Card: React.FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

/**
 * ヘッダー
 */
export const CardHeader: React.FC<Props> = ({ children }) => {
  return <div className={styles.header}>{children}</div>;
};

/**
 * ボディ
 */
export const CardBody: React.FC<Props> = ({ children }) => {
  return <div className={styles.content}>{children}</div>;
};

/**
 * タイトル
 */
export const CardTitle: React.FC<Props> = ({ children }) => {
  return <div className={styles.title}>{children}</div>;
};

/**
 * 説明
 */
export const CardDescription: React.FC<Props> = ({ children }) => {
  return <div className={styles.description}>{children}</div>;
};

/**
 * フッター
 */
export const CardFooter: React.FC<Props> = ({ children }) => {
  return <div className={styles.footer}>{children}</div>;
};
