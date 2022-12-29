import { createRestaurantMenuItemTemplate } from '../views/templates/template-creator';

const RestaurantMenuItemInitiator = {
  init(foods, drinks) {
    const menus = {
      foodsList: '',
      drinksList: '',
    };

    foods.forEach((food) => {
      menus.foodsList += createRestaurantMenuItemTemplate(food.name);
    });

    drinks.forEach((drink) => {
      menus.drinksList += createRestaurantMenuItemTemplate(drink.name);
    });

    return menus;
  },
};

export default RestaurantMenuItemInitiator;
