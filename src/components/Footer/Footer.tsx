import styles from './footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <span>Sourcery Academy</span>
      <span>Lunch App</span>
      <span>© {currentYear} Cognizant</span>
    </footer>
  );
}
