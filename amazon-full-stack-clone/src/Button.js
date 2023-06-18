import React from 'react';
import styles from './Button.module.css';

const Button = ({onClickMethod,actionText}) => {
  return (
        <button className={styles.btn} onClick={onClickMethod}>
            {actionText}
        </button>
  )
}

export default Button