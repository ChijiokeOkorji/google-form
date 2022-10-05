import styles from './main-style.module.scss';

const Main = ({ children }) => {
  return (
    <main className={styles.main}>
      {children}
    </main>
  );
};

export { Main };
