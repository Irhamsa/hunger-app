import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as testFactories from './helpers/testFactories';

describe('Unfavorite a restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = `<div id="favoriteButtonContainer"></div>`;
  };

  beforeEach(async () => {
    addFavoriteButtonContainer();
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should display unfavorite button when the restaurant has been favorited', async () => {
    await testFactories.createFavoriteButtonPresenterWithRetaurant({ id: 1 });

    expect(document.querySelector('[aria-label="unfavorite button"]')).toBeTruthy();
  });

  it('should not display favorite button when the restaurant has been favorited', async () => {
    await testFactories.createFavoriteButtonPresenterWithRetaurant({ id: 1 });

    expect(document.querySelector('[aria-label="favorite button"]')).toBeFalsy();
  });

  it('should be able to remove favorit rstaurant from the list', async () => {
    await testFactories.createFavoriteButtonPresenterWithRetaurant({ id: 1 });

    document.querySelector('[aria-label="unfavorite button"]').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  it('should not throw error if the unfavorite restaurant is not in the list', async () => {
    await testFactories.createFavoriteButtonPresenterWithRetaurant({ id: 1 });

    await FavoriteRestaurantIdb.deleteRestaurant(1);

    document.querySelector('[aria-label="unfavorite button"]').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
