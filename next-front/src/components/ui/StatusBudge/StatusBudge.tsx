import styles from './StatusBudge.module.css';

type Status = 'todo' | 'in_progress' | 'done';

type Props = {
  status: Status;
};

const statusLabel = {
  todo: 'Todo',
  in_progress: 'In Progress',
  done: 'Done',
};

export const StatusBudge: React.FC<Props> = ({ status }) => {
  const style = `${styles.container} ${styles[status]}`;

  return <div className={style}>{statusLabel[status]}</div>;
};
