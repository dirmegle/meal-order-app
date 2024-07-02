import { useEffect, useState } from 'react';
import fetchData from '../utils/fetchData';
import { getUser } from '../utils/authorizeUser';

export interface UserProfile {
  id: string;
  name: string;
  surname: string;
  balance: number;
  img: string;
  orders: {
    weekDay: string;
    mealIds: number[];
  }[];
  orderHistory: {
    date: string; // Date format: "YYYY-MM-DDTHH:MM:SS.sssZ"
    mealsIds: number[];
  }[];
}

const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const user = getUser();
  const [isLoadingScreenVisible, setLoadingScreenVisibility] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoadingScreenVisibility(true);
      try {
        const [profile] = await fetchData(`users?id=${user?.userId}`);
        setUserProfile(profile);
      } catch (error) {
        throw new Error();
      } finally {
        setLoadingScreenVisibility(false);
      }
    };

    fetchUserProfile();
  }, [user?.userId, setLoadingScreenVisibility]);

  return { userProfile, isLoadingScreenVisible };
};

export default useUserProfile;
