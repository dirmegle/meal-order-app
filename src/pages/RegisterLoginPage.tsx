import registerLoginPageImage from '../assets/images/registerLoginLayoutImage.png';
import Footer from '../components/Footer/Footer';
import LoginRegisterCard from '../components/LoginRegisterCard/LoginRegisterCard';
import styles from './registerLoginPage.module.css';

export default function RegisterLoginLayout() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <img src={registerLoginPageImage} alt="" className={styles.image} />
        <div className={styles.form}>
          <LoginRegisterCard />
        </div>
      </main>
      <Footer />
    </div>
  );
}
