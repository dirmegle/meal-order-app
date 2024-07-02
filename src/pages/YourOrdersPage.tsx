import TitleAndDescription from '../components/TitleAndDescription/TitleAndDescription';
import getFormatedDateRange from '../utils/dates';
import styles from './pagesStyles.module.css';

export default function YourOrdersPage() {
  const { dateStartsWithDay } = getFormatedDateRange();

  return (
    <div className={styles.container}>
      <section>
        <TitleAndDescription title="Your Orders" description={`Week of ${dateStartsWithDay}`} />
      </section>
      <section />
      <section />
    </div>
  );
}
