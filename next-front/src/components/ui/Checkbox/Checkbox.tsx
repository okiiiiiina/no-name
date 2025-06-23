import styles from './Checkbox.module.css';

type Props = {
  /** チェックボックスのラベル */
  label: string;
  /** チェック状態かどうか */
  checked: boolean;
  /** チェック状態の変更イベントハンドラ */
  onChange: (checked: boolean) => void;
  /** disabled状態の管理 */
  disabled?: boolean;
  /** エラー状態の管理 */
  hasError?: boolean;
};

export const Checkbox: React.FC<Props> = ({
  label,
  checked,
  onChange,
  disabled = false,
  hasError = false,
}) => {
  const checkboxStyle = `${styles.checkbox} ${
    disabled ? styles.disabled : ''
  } ${hasError ? styles.error : ''}`;

  const containerStyle = `${styles.container} ${
    disabled ? styles.containerDisabled : ''
  } ${hasError ? styles.containerError : ''}`;

  const handleClick = () => {
    if (disabled) return;
    onChange(!checked);
  };

  return (
    <div onClick={handleClick} className={containerStyle}>
      <input
        type="checkbox"
        className={checkboxStyle}
        checked={checked}
        disabled={disabled}
      />
      <label className={styles.label}>{label}</label>
    </div>
  );
};
