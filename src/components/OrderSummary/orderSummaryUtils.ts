export const generateRandomKey = () => Math.random().toString(36).substring(2, 10);

export const priceFormat = (price: number) => price.toFixed(2).toString().replace('.', ',');
