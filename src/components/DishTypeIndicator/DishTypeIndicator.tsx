import veganIcon from '../../assets/icons/vegan.svg';
import spicyIcon from '../../assets/icons/spicy.svg';
import styles from './DishTypeIndicator.module.css';

interface DishTypeIndicatorProps {
  isSpicy?: boolean;
  isVegan?: boolean;
}

export default function DishTypeIndicator({ isSpicy, isVegan }: DishTypeIndicatorProps) {
  return (
    <div className={styles.container}>
      {isVegan && <img src={veganIcon} alt="Vegan dish" />}
      {isSpicy && <img src={spicyIcon} alt="Spicy dish" />}
    </div>
  );
}
