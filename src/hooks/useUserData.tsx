import { useEffect, useState } from 'react';
import fetchData from '../utils/fetchData';

export interface Users {
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

const useUserData = () => {
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchData('users');
      setUsers(data);
    };

    fetchUser();
  }, []);

  return { users };
};

export default useUserData;
