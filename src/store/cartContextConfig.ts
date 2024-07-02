import { MealsByDay, MealsUpdated } from '../hooks/useMealsUpdate';
import { UserProfile } from '../hooks/useUserProfile';

export interface AllOrders extends UserOrders {
  id: UserProfile['id'];
}

export interface UserOrders {
  orders: UserProfile['orders'];
}

export interface OrderChange {
  newOrder: Pick<UserProfile['orders'][number], 'mealIds' | 'weekDay'> | null;
  oldOrder: Pick<UserProfile['orders'][number], 'mealIds' | 'weekDay'> | null;
}

export interface UserOrdersUpdate {
  weekDay: string;
  meals: MealsUpdated[];
}
export interface CartContextValue {
  userProfile: UserProfile;
  mealsUpdated: MealsByDay;
  updatedOrders: UserOrdersUpdate[];
  cartCount: number;
  isSubmited: boolean;
  errorMessage: string;
  totalCartPrice: number;
  setErrorMessage: (error: string) => void;
  updateUserOrders: () => void;
  setIsSubmited: (isSubmited: boolean) => void;
  setOrderChange: (order: OrderChange) => void;
}

export const KEY_FOR_CART = 'orders';

export const ORDERS_RENEW_TIME = { day: 'Saturday', hour: 7 };

export const ORDERS_LIMIT = { day: 'Friday', maxOrders: 2 };

export const ERROR_FRIDAY_CART =
  'You have more than 2 meals on Friday. Please remove some meals to proceed ordering.';
export const ERROR_FRIDAY_ORDERED =
  'You already ordered 2 meals for Friday. Please remove Friday meals orders to proceed ordering.';
export const ERROR_FRIDAY_CART_AND_DATA =
  'You already ordered 1 meal for Friday. You can order 2 meals.';
export const ERROR_PREV_DAYS_CART =
  'You have previous days orders. Please remove it and try again to confirm your order.';
export const ERROR_CURRENT_DAY_ORDER_PASS_11 =
  "You cannot order todays orders when it is past 11 o'clock. Please remove it and try again to confirm your order.";
export const ERROR_BALANCE =
  'Your balance is not enough for your order. Please remove some meals or update your balance.';
export const ERROR_SERVER = 'Error in confirming your order. Please, try again later.';
