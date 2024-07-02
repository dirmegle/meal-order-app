import { UserProfile } from '../hooks/useUserProfile';
import { currentWorkday, getHourOfToday, previousDays } from '../utils/dates';
import {
  OrderChange,
  UserOrders,
  AllOrders,
  ERROR_BALANCE,
  ERROR_CURRENT_DAY_ORDER_PASS_11,
  ERROR_PREV_DAYS_CART,
  ERROR_FRIDAY_CART,
  ERROR_FRIDAY_ORDERED,
  ERROR_SERVER,
  ORDERS_LIMIT,
  UserOrdersUpdate,
  ERROR_FRIDAY_CART_AND_DATA,
} from './cartContextConfig';

const getOrdersFromLs = (key: string) => JSON.parse(localStorage.getItem(key) || '[]');

const setOrdersToLs = (key: string, value: AllOrders[]) =>
  localStorage.setItem(key, JSON.stringify(value));

const findOrderByDay = (orders: UserOrders['orders'], weekDay: string) =>
  orders.find((order) => order.weekDay === weekDay);

const getCurrentTime = () => new Date().toISOString();

export const calculateTotalPrice = (userOrders: UserOrdersUpdate[]) =>
  userOrders.reduce((total, userOrder) => {
    const dayPrice = userOrder.meals.reduce((dayTotal, meal) => {
      if (userOrder.weekDay === 'Friday') {
        return dayTotal;
      }
      return dayTotal + meal.price;
    }, 0);

    return total + dayPrice;
  }, 0);

const validateFridayOrder = (
  userProfile: UserProfile,
  allOrders: AllOrders[],
  setErrorMessage: (error: string) => void,
  userIndex: number
) => {
  const fridayOrderInData = userProfile.orders.find((order) => order.weekDay === ORDERS_LIMIT.day);
  const fridayOrderInCart = allOrders[userIndex].orders.find(
    (order) => order.weekDay === ORDERS_LIMIT.day
  );

  if (fridayOrderInCart) {
    if (fridayOrderInCart.mealIds.length > ORDERS_LIMIT.maxOrders) {
      setErrorMessage(ERROR_FRIDAY_CART);
      return true;
    }
  }
  if (fridayOrderInData && fridayOrderInCart) {
    if (
      fridayOrderInData.mealIds.length === ORDERS_LIMIT.maxOrders &&
      fridayOrderInCart.mealIds.length > 0
    ) {
      setErrorMessage(ERROR_FRIDAY_ORDERED);
      return true;
    }
    if (
      fridayOrderInCart.mealIds.length + fridayOrderInData.mealIds.length >
      ORDERS_LIMIT.maxOrders
    ) {
      setErrorMessage(ERROR_FRIDAY_CART_AND_DATA);
      return true;
    }
  }

  return false;
};

const validatePreviuosDaysOrders = (
  allOrders: AllOrders[],
  userIndex: number,
  setErrorMessage: (error: string) => void
) =>
  allOrders[userIndex].orders.some((order) => {
    if (previousDays.includes(order.weekDay) && order.mealIds.length !== 0) {
      setErrorMessage(ERROR_PREV_DAYS_CART);
      return true;
    }
    if (currentWorkday === order.weekDay && getHourOfToday() >= 11 && order.mealIds.length !== 0) {
      setErrorMessage(ERROR_CURRENT_DAY_ORDER_PASS_11);
      return true;
    }
    return false;
  });

export const removeOrdersFromLs = (key: string) => localStorage.removeItem(key);

export const readOrders = (key: string, id: UserProfile['id']) => {
  const allOrders: AllOrders[] = getOrdersFromLs(key);
  const userIndex = allOrders.findIndex((user) => +user.id === +id);

  return allOrders[userIndex] || null;
};

export const modifyUserOrders = (
  key: string,
  value: OrderChange,
  id: UserProfile['id'],
  setOrders: (orders: UserOrders) => void
) => {
  const allOrders: AllOrders[] = getOrdersFromLs(key);
  let userOrders = allOrders.find((user) => +user.id === +id);

  if (!userOrders) {
    userOrders = { id, orders: [] };
    allOrders.push(userOrders);
  }

  if (value.newOrder) {
    let ordersByDay = findOrderByDay(userOrders.orders, value.newOrder.weekDay);
    if (!ordersByDay) {
      ordersByDay = { weekDay: value.newOrder.weekDay, mealIds: [] };
      userOrders.orders.push(ordersByDay);
    }
    ordersByDay.mealIds.push(...value.newOrder.mealIds);
  }

  if (value.oldOrder) {
    const ordersByDay = findOrderByDay(userOrders.orders, value.oldOrder.weekDay);
    if (ordersByDay) {
      value.oldOrder.mealIds.forEach((mealId) => {
        const mealIndex = ordersByDay.mealIds.indexOf(mealId);
        if (mealIndex !== -1) {
          ordersByDay.mealIds.splice(mealIndex, 1);
        }
      });
    }
  }

  setOrdersToLs(key, allOrders);
  setOrders(userOrders);
};

export async function userOrdersUpdate(
  key: string,
  id: UserProfile['id'],
  userProfile: UserProfile,
  cartPrice: number,
  setErrorMessage: (error: string) => void,
  setOrders: (orders: UserOrders) => void,
  setIsSubmited: (isSubmited: boolean) => void
) {
  const allOrders: AllOrders[] = getOrdersFromLs(key);
  const userIndex = allOrders.findIndex((user) => +user.id === +id);

  if (userIndex === -1) {
    setIsSubmited(false);
    return;
  }

  if (cartPrice > userProfile.balance) {
    setIsSubmited(false);
    setErrorMessage(ERROR_BALANCE);
    return;
  }

  if (validatePreviuosDaysOrders(allOrders, userIndex, setErrorMessage)) {
    setIsSubmited(false);
    return;
  }

  if (validateFridayOrder(userProfile, allOrders, setErrorMessage, userIndex)) {
    setIsSubmited(false);
    return;
  }

  allOrders[userIndex].orders.forEach((newOrder) => {
    const existingOrder = userProfile.orders.find((order) => order.weekDay === newOrder.weekDay);

    if (existingOrder) {
      existingOrder.mealIds.push(...newOrder.mealIds.map(Number));
    } else {
      userProfile.orders.push({ ...newOrder, mealIds: newOrder.mealIds.map(Number) });
    }

    userProfile.orderHistory.push({
      date: getCurrentTime(),
      mealsIds: newOrder.mealIds.map(Number),
    });
  });

  userProfile.balance -= cartPrice;

  try {
    const response = await fetch(`http://localhost:3002/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userProfile),
    });
    if (response.ok) {
      setIsSubmited(true);
      allOrders[userIndex].orders = [];
      setOrdersToLs(key, allOrders);
      setOrders(allOrders[userIndex]);
    } else {
      setIsSubmited(false);
      setErrorMessage(ERROR_SERVER);
    }
  } catch (error) {
    setIsSubmited(false);
    setErrorMessage(ERROR_SERVER);
  }
}
