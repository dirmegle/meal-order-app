import { useEffect, useState } from 'react';
import useMealsData, { Meal } from './useMealsData';
import useRatingsData from './useRatingsData';
import useVendorsData from './useVendorsData';
import useUserData from './useUserData';

interface MealAndScores {
  [key: number | string]: { sum: number; count: number };
}

interface AverageScores {
  mealId: number;
  rating: number;
}

export interface Comment {
  userName: string;
  userSurname: string;
  userImg: string;
  comment: string;
}

export interface MealsUpdated extends Meal {
  vendorName: string;
  rating: number;
  comments: Comment[];
}

export interface MealsByDay {
  [day: string]: MealsUpdated[];
}

export default function useMealsUpdate() {
  const { meals } = useMealsData();
  const { vendors } = useVendorsData();
  const { ratings } = useRatingsData();
  const { users } = useUserData();
  const [mealsUpdated, setMealsUpdated] = useState<MealsByDay>({});

  useEffect(() => {
    const updateMeals = async () => {
      const mealAndScores: MealAndScores = {};

      ratings.forEach(({ mealId, rating }) => {
        const { score } = rating;
        if (mealAndScores[mealId]) {
          mealAndScores[mealId].sum += score;
          mealAndScores[mealId].count += 1;
        } else {
          mealAndScores[mealId] = { sum: score, count: 1 };
        }
      });

      const averageScores: AverageScores[] = Object.keys(mealAndScores).map((mealId) => ({
        mealId: +mealId,
        rating: mealAndScores[mealId].sum / mealAndScores[mealId].count,
      }));

      const findVendorName = (vendorId: number) =>
        vendors.find((vendor) => vendorId === +vendor.id)?.name || '';

      const mealsWithVendorAndRating = meals.map((meal) => {
        const vendorName = findVendorName(meal.vendorId);
        const ratingObj = averageScores.find((mealScore) => +meal.id === mealScore.mealId);
        const rating = ratingObj ? ratingObj.rating : 0;

        const filteredRatings = ratings.filter((userRating) => userRating.mealId === +meal.id);

        const comments: Comment[] = filteredRatings.map((userRating) => {
          const {
            name: userName,
            surname: userSurname,
            img: userImg,
          } = users.find((user) => +user.id === userRating.rating.userId) || {
            name: 'Unknown',
            surname: 'Unknown',
            img: '../assets/icons/defaultUserAvatar.svg',
          };

          return {
            userName,
            userSurname,
            userImg: userImg || '../assets/icons/defaultUserAvatar.svg',
            comment: userRating.rating.comment,
          };
        });
        return { ...meal, vendorName, rating, comments };
      });

      const mealsByDay: MealsByDay = {};

      mealsWithVendorAndRating.forEach((meal) => {
        meal.weekDays.forEach((day) => {
          if (!mealsByDay[day]) {
            mealsByDay[day] = [];
          }
          const mealCopy = { ...meal };
          mealsByDay[day].push(mealCopy);
        });
      });

      if (mealsByDay.Friday) {
        mealsByDay.Friday.forEach((meal) => {
          meal.price = 0;
        });
      }

      setMealsUpdated(mealsByDay);
    };

    updateMeals();
  }, [meals, vendors, ratings, users]);

  return { mealsUpdated };
}
