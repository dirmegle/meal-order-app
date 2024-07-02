import { useState, useEffect } from 'react';
import fetchData from '../utils/fetchData';

export interface Meal {
  id: number;
  vendorId: number;
  title: string;
  description: string;
  price: number;
  ordersCount: number;
  weekDays: string[];
  vegetarian: boolean;
  spicy: boolean;
  mealType: string;
  dishType: string;
}

const useMealsData = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isMealsLoadingScreenVisible, setLoadingScreenVisibility] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      setLoadingScreenVisibility(true);
      try {
        const data = await fetchData('meals');
        setMeals(data);
      } catch (error) {
        throw new Error();
      } finally {
        setLoadingScreenVisibility(false);
      }
    };

    fetchMeals();
  }, []);

  return { meals, isMealsLoadingScreenVisible };
};

export default useMealsData;
