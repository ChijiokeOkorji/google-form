import { useCallback } from 'react';

import styles from './form-style.module.scss';

// title prop displays a form title
// onSubmit prop holds the logic for form submission
const Form = ({ children, title, onSubmit }) => {
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    onSubmit();
  }, [onSubmit]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {title && <div className={styles.title}>{title}</div>}

      {children}
    </form>
  );
};

export { Form };
