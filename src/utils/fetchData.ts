interface Error {
  name: string;
  message: string;
  stack?: string;
}

const BASE_URL = 'http://localhost:3002/';

export const loaderState = {
  isLoaderVisible: false,
};

const fetchData = async (path: string) => {
  const url = `${BASE_URL}${path}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return await response.json();
  } catch (error) {
    const err = error as Error;
    throw new Error(`Error fetching data: ${err.message}`);
  }
};

export default fetchData;
