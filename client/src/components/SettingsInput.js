import styles from './SettingsInput.module.css';

const SettingsInput = ({ type, name, value, onChange, children }) => {
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
          required={type !== 'checkbox'}
          onFocus={(e) => e.currentTarget.select()}
        />
      </label>
    </div>
  );
};

export default SettingsInput;
