import { useEffect, useState } from 'react';
import fetchData from '../utils/fetchData';

export interface Rating {
  mealId: number;
  rating: {
    userId: number;
    score: number;
    comment: string;
  };
}

const useRatingsData = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);

  useEffect(() => {
    const fetchRatings = async () => {
      const data = await fetchData('ratings');
      setRatings(data);
    };

    fetchRatings();
  }, []);

  return { ratings };
};

export default useRatingsData;
