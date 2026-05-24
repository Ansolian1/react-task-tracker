import React from 'react';
import styles from './Checkbox.module.css';

const Checkbox = ({ label, checked, onChange, ...props }) => {
  return (
    <label className={styles.labelWrapper}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      {label && <span>{label}</span>}
    </label>
  );
};

export default Checkbox;
