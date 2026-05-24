
import React from 'react';
import styles from './TaskSearch.module.css';
import Input from '../ui/Input';

const TaskSearch = ({ searchQuery, onSearchChange }) => {
  return (
    <div className={styles.searchContainer}>
      <Input 
        className={styles.searchInput}
        placeholder="Поиск задач по тексту..." 
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default TaskSearch;
