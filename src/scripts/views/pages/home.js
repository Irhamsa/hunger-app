import '../../component/restaurant-list';
import RestaurantDBSource from '../../data/restaurantdb-source';
import LazyLoadimageInitiator from '../../utils/lazyload-image-initiator';
import PreloaderInitiator from '../../utils/preloader-initiator';
import NavItemHelper from '../../utils/nav-item-helper';

const Home = {
  async render() {
    return `
        <h2 aria-label="Explore Restaurant.">Explore Restaurant</h2>
        <restaurant-list></restaurant-list>
    `;
  },

  async afterRender() {
    const dataSource = await RestaurantDBSource.restaurantItem();
    const restaurantList = document.querySelector('restaurant-list');
    const navLinkHome = document.querySelector('.nav__link_home');

    NavItemHelper.nonActiveAllNavLinkItem();
    NavItemHelper.activeNavlinkItem(navLinkHome);

    if (dataSource.message === 'success') {
      restaurantList.config = {
        restaurants: dataSource.restaurants,
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
      dataSource === 'error' ? (message.innerHTML = 'network not available.') : (message.innerHTML = 'Failed to fetch data from resource.');
      restaurantList.appendChild(message);
    }
  },
};

export default Home;
