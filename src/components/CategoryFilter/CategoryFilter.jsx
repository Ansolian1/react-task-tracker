
import React from 'react';
import styles from './CategoryFilter.module.css';

const categories = ['Все', 'Работа', 'Дом', 'Учеба', 'Личное'];

const CategoryFilter = ({ currentFilter, onFilterChange }) => {
  return (
    <div className={styles.filterContainer}>
      {categories.map(cat => (
        <button
          key={cat}
          className={`${styles.filterBtn} ${currentFilter === cat ? styles.activeBtn : ''}`}
          onClick={() => onFilterChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
