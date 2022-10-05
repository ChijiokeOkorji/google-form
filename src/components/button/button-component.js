import styles from './button-style.module.scss';

const Button = ({ label, disabled }) => {
  return (
    <button 
      className={styles.button}
      disabled={disabled}
    >
      <span className={styles.label}>{label.toUpperCase()}</span>
    </button>
  );
};

export { Button };
