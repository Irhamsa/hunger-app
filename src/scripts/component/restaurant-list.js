import {LitElement} from 'lit';
import './restaurant-item';
import PreloaderInitiator from '../utils/preloader-initiator';

class RestaurantList extends LitElement {
  connectedCallback() {
    PreloaderInitiator.init({ action: 'create', parentELement: this });
    const hero = document.getElementById('hero');
    hero.classList.contains('hidden') ? hero.classList.remove('hidden') : null;
  }

  set config({ restaurants }) {
    this._restaurants = restaurants;
    this.renderRestaurantItems(this._restaurants);
  }

  createRenderRoot() {
    return this;
  }

  renderRestaurantItems(restaurants) {
    PreloaderInitiator.init({ action: 'remove', parentELement: this });
    restaurants.forEach((restaurant) => {
      const restaurantItem = document.createElement('restaurant-item');
      restaurantItem.setAttribute('tabindex', '0');
      restaurantItem.config = {
        restaurant: restaurant,
      };
      this.appendChild(restaurantItem);
    });
  }
}

customElements.define('restaurant-list', RestaurantList);
