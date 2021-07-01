import { forwardRef } from 'react';
import styles from './Button.module.css';

const Button = forwardRef(
  ({ className = styles.button, clickAction, children, description }, ref) => {
    return (
      <button
        ref={ref}
        className={className}
        onClick={clickAction}
        aria-label={description}
      >
        {children}
      </button>
    );
  },
);

export default Button;
