import { AvailableLunchUpdated } from '../../pages/availableLunchPageUtils';
import BlankCard, { CardContent } from '../BlankCard/BlankCard';
import Button from '../Button/Button';
import Order from '../Order/Order';
import styles from './availableLunchCard.module.css';

interface AvailableLunchCardProps {
  availableLunch: AvailableLunchUpdated;
  onClick: () => void;
}

export default function AvailableLunchCard({ availableLunch, onClick }: AvailableLunchCardProps) {
  const { img, meals, name, surname } = availableLunch;
  return (
    <BlankCard className={styles.container}>
      <CardContent className={styles.cardContent}>
        <div className={styles.labels}>
          <span>Order Summary</span>
          <span>Vendor</span>
        </div>
        <ul className={styles.mappingBox}>
          {meals.map(({ title, dishType, vendorName, id }) => (
            <li className={styles.orderSummary} key={id}>
              <div className={styles.order}>
                <Order imageSize="small" title={title} textSize="large" dishType={dishType} />
              </div>
              <span className={styles.vendor}>{vendorName}</span>
            </li>
          ))}
        </ul>
        <span className={styles.takeItFrom}>Take It From</span>
        <div className={styles.userInfo}>
          <img className={styles.userImage} src={img} alt="user avatar" />
          <div>
            {name} {surname}
          </div>
        </div>
        <div className={styles.button}>
          <Button size="small" category="secondary" onClick={onClick}>
            Reserve
          </Button>
        </div>
      </CardContent>
    </BlankCard>
  );
}
