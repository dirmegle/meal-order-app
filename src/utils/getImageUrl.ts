function getImageUrl(dishType: string): string {
  const dishTypeObj = {
    burger: 'burger.png',
    chicken: 'chicken.png',
    corn: 'corn.png',
    wrap: 'kebab.png',
    pizza: 'pizza.png',
    pretzel: 'pretzel.png',
    bowl: 'bowl.png',
    thai: 'ramen.png',
    sandwich: 'sandwich.png',
    soup: 'bowl.png',
  };

  const selectedDishType = dishTypeObj[dishType as keyof typeof dishTypeObj];

  return selectedDishType === undefined
    ? `../../src/assets/dishTypeIllustrations/default.png`
    : `../../src/assets/dishTypeIllustrations/${selectedDishType}`;
}

export default getImageUrl;
