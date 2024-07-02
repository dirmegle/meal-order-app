import { useEffect, useState } from 'react';
import fetchData from '../utils/fetchData';

interface Vendor {
  id: number;
  name: string;
}

const useVendorsData = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    const fetchVendors = async () => {
      const data = await fetchData('vendors');
      setVendors(data);
    };

    fetchVendors();
  }, []);

  return { vendors };
};

export default useVendorsData;
