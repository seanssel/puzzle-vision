import { forwardRef } from 'react';
import styles from './Button.module.css';

const Button = forwardRef(
  ({ className = styles.button, clickAction, children }, ref) => {
    return (
      <button ref={ref} className={className} onClick={clickAction}>
        {children}
      </button>
    );
  },
);

export default Button;
