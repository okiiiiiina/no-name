import styles from "./StatusBudge.module.css"

type Props = {
  children: React.ReactNode;
}

export const StatusBudge: React.FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};