import '../../component/restaurant-detail';
import RestaurantDBSource from '../../data/restaurantdb-source';
import UrlParser from '../../routes/url-parser';
import PreloaderInitiator from '../../utils/preloader-initiator';
import RestaurantReviewsInitiator from '../../utils/restaurant-reviews-initiator';
import SubmitReviewInitiator from '../../utils/submit-review-initiator';
import FavoriteButtonPresenter from '../../utils/favorite-button-presenter';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Detail = {
  async render() {
    return `
      <restaurant-detail></restaurant-detail>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const dataSource = await RestaurantDBSource.restaurantDetail(url.id);
    const restaurantDetail = document.querySelector('restaurant-detail');

    if (dataSource.message === 'success') {
      PreloaderInitiator.init({ action: 'remove', parentELement: restaurantDetail });
      restaurantDetail.config = {
        restaurant: dataSource.restaurant,
      };

      await RestaurantReviewsInitiator.init({
        containerReviews: document.querySelector('.customer__reviews_list'),
        reviews: dataSource.restaurant.customerReviews,
      });
      await FavoriteButtonPresenter.init({
        favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
        favoriteRestaurant: FavoriteRestaurantIdb,
        restaurant: dataSource.restaurant,
      });
      SubmitReviewInitiator.init(url.id);
    } else {
      const message = document.createElement('div');
      PreloaderInitiator.init({ action: 'remove', parentELement: restaurantDetail });
      message.classList.add('message');
      dataSource === 'error' ? (message.innerHTML = 'network not available.') : (message.innerHTML = 'Failed to fetch data from resource.');
      restaurantDetail.appendChild(message);
    }
  },
};

export default Detail;
