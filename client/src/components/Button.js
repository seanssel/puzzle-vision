import styles from './Button.module.css';

const Button = ({
  className = styles.button,
  clickAction,
  children,
  description,
}) => {
  return (
    <button
      className={className}
      onClick={clickAction}
      aria-label={description}
    >
      {children}
    </button>
  );
};

export default Button;
