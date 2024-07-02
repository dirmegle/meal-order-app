import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import useUserProfile, { UserProfile } from '../hooks/useUserProfile';
import {
  CartContextValue,
  KEY_FOR_CART,
  ORDERS_RENEW_TIME,
  UserOrders,
  OrderChange,
  UserOrdersUpdate,
} from './cartContextConfig';
import {
  calculateTotalPrice,
  modifyUserOrders,
  readOrders,
  removeOrdersFromLs,
  userOrdersUpdate,
} from './cartContextUtils';
import { WORKDAYS, getHourOfToday, weekDayOfToday } from '../utils/dates';
import useMealsUpdate, { MealsUpdated } from '../hooks/useMealsUpdate';

export const CartContext = createContext<CartContextValue | null>(null);

interface CartContextProviderProps {
  children: ReactNode;
}

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [currentOrders, setCurrentOrders] = useState<UserOrders | null>(null);
  const [updatedOrders, setUpdatedOrders] = useState<UserOrdersUpdate[]>([]);
  const [isSubmited, setIsSubmited] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const { userProfile } = useUserProfile();
  const { id, balance } = (userProfile || {}) as Required<UserProfile>;
  const { mealsUpdated } = useMealsUpdate();
  const totalCartPrice = calculateTotalPrice(updatedOrders);

  useEffect(() => {
    setCurrentOrders(readOrders(KEY_FOR_CART, id));
  }, [id, balance]);

  useEffect(() => {
    if (
      weekDayOfToday === ORDERS_RENEW_TIME.day &&
      currentOrders &&
      getHourOfToday() === ORDERS_RENEW_TIME.hour
    ) {
      removeOrdersFromLs(KEY_FOR_CART);
      setCurrentOrders(null);
    }
  }, [currentOrders]);

  useEffect(() => {
    if (currentOrders) {
      const ordersCount = currentOrders.orders.reduce(
        (total, order) => total + order.mealIds.length || 0,
        0
      );

      const orders: UserOrdersUpdate[] = currentOrders.orders
        .map((order) => ({
          weekDay: order.weekDay,
          meals: order.mealIds
            .map((mealIds: number) => {
              const meal = mealsUpdated[order.weekDay]?.find(
                (mealForDay) => +mealForDay.id === +mealIds
              );
              return meal ? { ...meal } : null;
            })
            .filter((meal) => meal !== undefined && meal !== null) as MealsUpdated[],
        }))
        .sort((a, b) => WORKDAYS.indexOf(a.weekDay) - WORKDAYS.indexOf(b.weekDay));

      setUpdatedOrders(orders);
      setCartCount(ordersCount);
    }
  }, [currentOrders, mealsUpdated]);

  const updateUserOrders = useCallback(async () => {
    if (userProfile) {
      await userOrdersUpdate(
        KEY_FOR_CART,
        id,
        userProfile,
        totalCartPrice,
        setErrorMessage,
        setCurrentOrders,
        setIsSubmited
      );
    }
  }, [id, userProfile, totalCartPrice]);

  const cartCtxValues = useMemo(
    () => ({
      userProfile: (userProfile || {}) as Required<UserProfile>,
      mealsUpdated,
      updatedOrders,
      cartCount,
      isSubmited,
      errorMessage,
      totalCartPrice,
      setErrorMessage,
      setIsSubmited,
      updateUserOrders,
      setOrderChange: (value: OrderChange) =>
        modifyUserOrders(KEY_FOR_CART, value, id, setCurrentOrders),
    }),
    [
      userProfile,
      mealsUpdated,
      updatedOrders,
      cartCount,
      id,
      isSubmited,
      errorMessage,
      totalCartPrice,
      updateUserOrders,
    ]
  );

  return <CartContext.Provider value={cartCtxValues}>{children}</CartContext.Provider>;
}
