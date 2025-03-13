import React from 'react';
import styles from './SignupForm.module.css';

export const FormInput = ({ label, type = "text", placeholder, id }) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.inputLabel}>{label}</label>
      <input
        type={type}
        id={id}
        className={styles.inputField}
        placeholder={placeholder}
        aria-label={label}
      />
    </div>
  );
};