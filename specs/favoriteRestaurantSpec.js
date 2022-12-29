import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as testFactories from './helpers/testFactories';

describe('Favorite A Restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = `<div id="favoriteButtonContainer"></div>`;
  };

  beforeEach(() => {
    addFavoriteButtonContainer();
  });

  it('should show favorite button when restaurant has not been favorite before', async () => {
    await testFactories.createFavoriteButtonPresenterWithRetaurant({ id: 1 });

    expect(document.querySelector('[aria-label="favorite button"]'))
        .toBeTruthy();
  });

  it('should not show the unfavourite button when restaurant has not been previously favourited', async () => {
    await testFactories.createFavoriteButtonPresenterWithRetaurant({ id: 1 });

    expect(document.querySelector('[aria-label="unfavorite button"]'))
        .toBeFalsy();
  });

  it('should be able to add their restaurant to a favorites list', async () => {
    await testFactories.createFavoriteButtonPresenterWithRetaurant({ id: 1 });

    document.querySelector('[aria-label="favorite button"]').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant again when it\'s already favorited', async () => {
    await testFactories.createFavoriteButtonPresenterWithRetaurant({ id: 1 });

    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });

    document.querySelector('[aria-label="favorite button"]').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([{ id: 1 }]);

    FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await testFactories.createFavoriteButtonPresenterWithRetaurant({});

    document.querySelector('[aria-label="favorite button"]').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
