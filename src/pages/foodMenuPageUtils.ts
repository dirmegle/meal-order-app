import { MealsUpdated } from '../hooks/useMealsUpdate';

export type SortBy = 'ordersCount' | 'price' | 'rating';

export const createTabsPropData = (days: string[], isMobile: boolean, previousDays: string[]) =>
  days.map((day) => ({
    label: isMobile ? day.substring(0, 3).toUpperCase() : day,
    isDisabled: previousDays.includes(day),
    key: day,
  }));

export const sortMeals = (array: MealsUpdated[] | [], sortingKey: SortBy, isDescending: boolean) =>
  array
    ?.slice()
    .sort((a, b) => (isDescending ? a[sortingKey] - b[sortingKey] : b[sortingKey] - a[sortingKey]));
