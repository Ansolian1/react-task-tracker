import React from 'react';
import styles from './Button.module.css'; 
const Button = ({ children, onClick, variant, ...rest }) => {
  let buttonClass = styles.btn;
  if (variant === 'danger') {
    buttonClass = `${styles.btn} ${styles.danger}`;
  }

  return (
    <button 
      className={buttonClass} 
      onClick={onClick} 
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
