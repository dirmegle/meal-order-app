import { useContext } from 'react';
import Info from '../../assets/icons/toast/infoOutline.svg?react';
import { MealsUpdated } from '../../hooks/useMealsUpdate';
import { CartContext } from '../../store/CartContext';
import { CartContextValue, OrderChange } from '../../store/cartContextConfig';
import FoodCard from '../FoodCard/FoodCard';
import { ToastContext, ToastContextValue } from '../../store/ToastContext';
import styles from './foodMenuCardsList.module.css';

interface FoodMenuCardsListProps {
  meals: MealsUpdated[];
  selectedTab: string;
}

export default function FoodMenuCardsList({ meals, selectedTab }: FoodMenuCardsListProps) {
  const toastMessageInfo = ' has been added to your cart. Excellent choice!';
  const { setOrderChange } = useContext(CartContext) as CartContextValue;
  const { addToast, removeToast } = useContext(ToastContext) as ToastContextValue;

  const handleClick = (order: OrderChange, title: string) => {
    setOrderChange(order);
    const id = addToast({
      icon: <Info />,
      children: `${title} ${toastMessageInfo}`,
      toastType: 'info',
      onClose: () => removeToast(id),
    });
  };

  if (meals?.length === 0) {
    return <div className={styles.noResults}>No results</div>;
  }

  return (
    <ul className={styles.mappingBox}>
      {meals?.map((meal) => (
        <li key={meal.id}>
          <FoodCard
            meal={meal}
            onClick={() =>
              handleClick(
                {
                  newOrder: { weekDay: selectedTab, mealIds: [meal.id] },
                  oldOrder: null,
                },
                meal.title
              )
            }
          />
        </li>
      ))}
    </ul>
  );
}
