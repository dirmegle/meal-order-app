import IconButton from '../IconButton/IconButton';
import Order from '../Order/Order';
import { generateRandomKey, priceFormat } from '../OrderSummary/orderSummaryUtils';
import Delete from '../../assets/icons/buttons/bin.svg?react';
import { OrderChange, UserOrdersUpdate } from '../../store/cartContextConfig';
import styles from './cartOrdersList.module.css';

interface CartOrdersListProps {
  orders: UserOrdersUpdate[];
  ordersNumber: number;
  setRemoveOrder: (order: OrderChange) => void;
}
export default function CartOrdersList({
  orders,
  ordersNumber,
  setRemoveOrder,
}: CartOrdersListProps) {
  return ordersNumber === 0 ? (
    <div className={styles.emptyCart}>
      <img className={styles.basketImg} src="src/assets/images/basket.png" alt="" />
      <div>Your cart is empty</div>
    </div>
  ) : (
    orders.map(
      ({ weekDay, meals }) =>
        meals.length !== 0 && (
          <div key={weekDay} className={styles.ordersBox}>
            <div className={styles.weekDay}>
              {weekDay} <span className={styles.line} />
            </div>
            {meals.map(({ id, title, dishType, price, vendorName }) => (
              <span className={styles.order} key={generateRandomKey()}>
                <Order
                  imageSize="small"
                  textSize="medium"
                  title={title}
                  dishType={dishType}
                  vendorName={vendorName}>
                  {weekDay === 'Friday' ? 'Free' : `€${priceFormat(price)}`}
                  <IconButton
                    size="medium"
                    category="tertiary"
                    ariaLabel="Delete order"
                    onClick={() =>
                      setRemoveOrder({
                        oldOrder: { weekDay, mealIds: [id] },
                        newOrder: null,
                      })
                    }>
                    <Delete />
                  </IconButton>
                </Order>
              </span>
            ))}
          </div>
        )
    )
  );
}
