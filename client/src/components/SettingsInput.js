import styles from './SettingsInput.module.css';

const SettingsInput = ({ type, name, value, onChange, limit, children }) => {
  return (
    <div className={styles.main}>
      <label className={styles.label}>
        {children}
        <input
          className={styles.input}
          type={type}
          name={name}
          value={value}
          checked={type === 'checkbox' ? value : null}
          onChange={onChange}
          min={limit && limit.min}
          max={limit && limit.max}
        />
      </label>
    </div>
  );
};

export default SettingsInput;
