import React from 'react';
import styles from './Stats.module.css';

const Stats = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const active = total - completed;

  return (
    <div className={styles.card}>
      <div className={styles.statItem}>
        <span className={styles.statValue}>{total}</span>
        <span className={styles.statLabel}>Всего задач</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.statValue} style={{ color: '#10b981' }}>{completed}</span>
        <span className={styles.statLabel}>Выполнено</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.statValue} style={{ color: '#f59e0b' }}>{active}</span>
        <span className={styles.statLabel}>Осталось</span>
      </div>
    </div>
  );
};

export default Stats;
