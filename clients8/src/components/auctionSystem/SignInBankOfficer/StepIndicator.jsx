import React from 'react';
import styles from './SignupForm.module.css';

export const StepIndicator = ({ active }) => {
  return (
    <div className={`${styles.stepDot} ${active ? styles.stepDotActive : ''}`} />
  );
};