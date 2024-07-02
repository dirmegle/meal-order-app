import { UserProfile } from '../../hooks/useUserProfile';
import { AvailableLunchUpdated } from '../../pages/availableLunchPageUtils';

export default async function handleCancelReservation(
  userId: UserProfile['id'],
  reserveMeals: AvailableLunchUpdated,
  setErrMsg: (msg: string) => void,
  setReservedMeal: () => void
) {
  const { mealIds } = reserveMeals;

  try {
    const response = await fetch(`http://localhost:3002/availableLunch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, mealIds }),
    });

    if (!response.ok) {
      setErrMsg('Failed to cancel your order. Please try again');
    }
    setReservedMeal();
  } catch (error) {
    setErrMsg('Failed to cancel your order. Please try again');
  }
}
