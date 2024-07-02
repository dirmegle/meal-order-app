import ratingStarYellow from '../../assets/icons/ratingStarYellow.svg';
import DishTypeIndicator from '../DishTypeIndicator/DishTypeIndicator';
import getImageUrl from '../../utils/getImageUrl';
import { MealsUpdated } from '../../hooks/useMealsUpdate';
import styles from './foodItem.module.css';

interface FoodItemProps {
  meal: MealsUpdated;
}

export default function FoodItem({ meal }: FoodItemProps) {
  const { dishType, title, spicy, vegetarian, description, price, vendorName, rating } = meal;
  const ratingValidation = (num: number | undefined): number[] | null => {
    if (num === undefined || num === 0) {
      return null;
    }
    const roundedNumber = Math.round(num);
    return Array.from({ length: roundedNumber }, (_, index) => index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleImageBg}>
        <img src={getImageUrl(dishType)} alt={dishType} />
      </div>
      <div className={styles.titleText}>
        <div>
          <div className={styles.vendorName}>{vendorName}</div>
          <div className={styles.titleAndIndicator}>
            <div className={styles.dishName}>{title}</div>
            <DishTypeIndicator isSpicy={spicy} isVegan={vegetarian} />
          </div>
          <div className={styles.ratingWrapper}>
            <div className={styles.stars}>
              {ratingValidation(rating)
                ? ratingValidation(rating)?.map((i) => (
                    <img key={i} src={ratingStarYellow} alt="star rating" />
                  ))
                : 'Not rated yet'}
            </div>
            <div className={styles.ratingNumber} aria-label="Rating score">
              {ratingValidation(rating) && rating?.toFixed(1)}
            </div>
          </div>
        </div>
        <p className={styles.mealDescription}>{description}</p>
        <div className={styles.priceBlock}>
          <p className={styles.priceTitle}>Price</p>
          <p className={styles.priceValue}>
            {price === 0 ? 'Free' : `€${price.toFixed(2).toString().replace('.', ',')}`}
          </p>
        </div>
      </div>
    </div>
  );
}
