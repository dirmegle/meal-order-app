import { MealsByDay, MealsUpdated } from '../hooks/useMealsUpdate';
import { UserProfile } from '../hooks/useUserProfile';
import fetchData from '../utils/fetchData';

export interface AvailableLunch {
  userId: UserProfile['id'];
  mealIds: number[];
  id: string;
}

export interface AvailableLunchUpdated extends AvailableLunch {
  name: UserProfile['name'];
  surname: UserProfile['surname'];
  img: UserProfile['img'];
  meals: MealsUpdated[];
}

export const updateAvailableLunch = async (
  users: UserProfile[],
  availableLunchData: AvailableLunch[],
  mealsUpdated: MealsByDay
): Promise<AvailableLunchUpdated[]> => {
  const availableLunchUpdated: AvailableLunchUpdated[] = await Promise.all(
    availableLunchData.map(async (lunch) => {
      const userIndex = users.findIndex((user) => +user.id === +lunch.userId);
      const meals: MealsUpdated[] = [];

      if (userIndex === -1) {
        return {
          userId: lunch.userId,
          name: 'Unknown',
          surname: '',
          img: 'src/assets/icons/defaultUserAvatar.svg',
          id: lunch.id,
          mealIds: lunch.mealIds,
          meals: [],
        };
      }

      lunch.mealIds.forEach((mealId: number) => {
        const availableMeal = mealsUpdated.Friday?.find(
          (meal: MealsUpdated) => +meal.id === +mealId
        );
        if (availableMeal) {
          meals.push(availableMeal);
        }
      });

      return {
        userId: lunch.userId,
        name: users[userIndex].name,
        surname: users[userIndex].surname,
        img: users[userIndex].img || 'src/assets/icons/defaultUserAvatar.svg',
        id: lunch.id,
        mealIds: lunch.mealIds,
        meals,
      };
    })
  );

  return availableLunchUpdated.reverse();
};

const fetchAvailableLunch = async (): Promise<AvailableLunch[]> => {
  try {
    const availableLunchData: AvailableLunch[] = await fetchData('availableLunch');
    return availableLunchData;
  } catch (error) {
    throw new Error();
  }
};

export const fetchAndUpdateAvailableLunch = async (
  users: UserProfile[],
  mealsUpdated: MealsByDay,
  setAvailableLunchUpdated: (meals: AvailableLunchUpdated[]) => void,
  setFilteredMealSearchSelect: (meals: MealsUpdated[]) => void,
  setDashboardData: (meals: MealsUpdated[]) => void
) => {
  if (users) {
    const availableLunchData: AvailableLunch[] = await fetchAvailableLunch();
    const lunchUpdated = await updateAvailableLunch(users, availableLunchData, mealsUpdated);
    setAvailableLunchUpdated(lunchUpdated);
    const allMeals = lunchUpdated.map((lunch) => lunch.meals).flat();
    setFilteredMealSearchSelect(allMeals);
    setDashboardData(allMeals);
  }
};

export const createSelectOptions = (meals: MealsUpdated[]) => {
  const vendorsIds = [...new Set(meals.map((meal) => meal.vendorId))];
  const selectOptions = [];
  vendorsIds.forEach((vendorId) => {
    const vendor = meals.find((meal) => meal.vendorId === vendorId);
    if (vendor) {
      selectOptions.push({ id: vendor.vendorId, name: vendor.vendorName });
    }
  });
  selectOptions.unshift({ id: 0, name: 'All vendors' });
  return selectOptions;
};

export const createAutocompleteData = (meals: MealsUpdated[]) => [
  ...new Set(meals.map((meal) => meal.title)),
];

export const createAvailableLunchTableData = (
  meals: MealsUpdated[],
  availableMeals: AvailableLunchUpdated[]
) =>
  availableMeals.filter((availableLunch) =>
    availableLunch.meals.find((meal) => meals.find((filteredLunch) => filteredLunch.id === meal.id))
  );

export default async function handleReservation(
  users: UserProfile[],
  signedUserProfile: UserProfile,
  reserveMeals: AvailableLunchUpdated,
  setShouldBeReserved: () => void,
  errorMsg: (msg: string) => void,
  setReservedMeal: (reservedMeal: AvailableLunchUpdated | null) => void
) {
  const { userId, id } = reserveMeals;
  const userIndex = users.findIndex((user) => +user.id === +userId);
  const takeItFromProfile = users[userIndex];
  const fridayOrderExists = signedUserProfile.orders.find((order) => order.weekDay === 'Friday');

  if (fridayOrderExists) {
    errorMsg('You already have Friday order');
    return;
  }

  signedUserProfile.orders.push({
    weekDay: 'Friday',
    mealIds: reserveMeals.mealIds,
  });

  signedUserProfile.orderHistory.push({
    date: new Date().toISOString(),
    mealsIds: reserveMeals.mealIds,
  });

  const orderToRemove = takeItFromProfile.orders.find((order) => order.weekDay === 'Friday');

  if (orderToRemove) {
    const fridayIndex = takeItFromProfile.orders.indexOf(orderToRemove);
    takeItFromProfile.orders.splice(fridayIndex, 1);
  }

  try {
    const responseDelete = await fetch(`http://localhost:3002/availableLunch/${id}`, {
      method: 'DELETE',
    });

    const responseUpdateSignedUserProfile = await fetch(
      `http://localhost:3002/users/${signedUserProfile.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signedUserProfile),
      }
    );

    const responseUpdateTakeItFromUserProfile = await fetch(
      `http://localhost:3002/users/${reserveMeals.userId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(takeItFromProfile),
      }
    );

    if (!responseUpdateSignedUserProfile.ok) {
      errorMsg('Failed to reserve your order. Please, refresh orders and try again later.');
      setReservedMeal(null);
    }

    setReservedMeal(reserveMeals);
    setShouldBeReserved();

    if (!responseDelete.ok) {
      throw new Error('Failed to delete data from availableLunch');
    }

    if (!responseUpdateTakeItFromUserProfile.ok) {
      throw new Error('Failed to delete orders from users orders');
    }
  } catch (error) {
    errorMsg('Failed to reserve your order. Please, refresh orders and try again later.');
    setReservedMeal(null);
  }
}
