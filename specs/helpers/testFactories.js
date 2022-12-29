import FavoriteButtonPresenter from '../../src/scripts/utils/favorite-button-presenter';
import FavoriteRestaurantIdb from '../../src/scripts/data/favorite-restaurant-idb';
import RestaurantReviewsInitiator from '../../src/scripts/utils/restaurant-reviews-initiator';

const createFavoriteButtonPresenterWithRetaurant = async (restaurant) => {
  await FavoriteButtonPresenter.init({
    favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
    favoriteRestaurant: FavoriteRestaurantIdb,
    restaurant,
  });
};

const createRestaurantReview = async (reviews) => {
  await RestaurantReviewsInitiator.init({
    containerReviews: document.querySelector('.customer__reviews_list'),
    reviews,
  });
};

export { createFavoriteButtonPresenterWithRetaurant, createRestaurantReview };
