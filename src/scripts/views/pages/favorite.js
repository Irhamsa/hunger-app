import '../../component/restaurant-list';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import LazyLoadimageInitiator from '../../utils/lazyload-image-initiator';
import PreloaderInitiator from '../../utils/preloader-initiator';
import NavItemHelper from '../../utils/nav-item-helper';

const Favorite = {
  async render() {
    return `
        <h2 aria-label="Favorite Restaurant.">Favorite Restaurant</h2>
        <restaurant-list></restaurant-list>
    `;
  },

  async afterRender() {
    const restaurantIdb = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantList = document.querySelector('restaurant-list');
    const hero = document.getElementById('hero');
    const navLinkFavorite = document.querySelector('.nav__link_favorite');

    hero.classList.add('hidden');
    NavItemHelper.nonActiveAllNavLinkItem();
    NavItemHelper.activeNavlinkItem(navLinkFavorite);

    if (restaurantIdb.length) {
      restaurantList.config = {
        restaurants: restaurantIdb,
      };
      LazyLoadimageInitiator.init({
        root: document,
        rootMargin: '0px',
        threshold: 0.6,
        isMultipleTarget: true,
        target: document.querySelectorAll('restaurant-item'),
      });
    } else {
      const restaurantList = document.querySelector('restaurant-list');
      const message = document.createElement('div');
      PreloaderInitiator.init({ action: 'remove', parentELement: restaurantList });
      message.classList.add('message');
      message.innerHTML = 'No restaurants have been added to your favorites list yet.';
      restaurantList.appendChild(message);
    }
  },
};

export default Favorite;
