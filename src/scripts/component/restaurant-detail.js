import {LitElement} from 'lit';
import PreloaderInitiator from '../utils/preloader-initiator';
import { createRestaurantDetailTemplate } from '../views/templates/template-creator';
import RestaurantMenuItemInitiator from '../utils/retaurant-menu-item-initiator';

class RestaurantDetail extends LitElement {
  connectedCallback() {
    const hero = document.getElementById('hero');
    hero.classList.add('hidden');
    this.scrollIntoView();
    PreloaderInitiator.init({ action: 'create', parentELement: this });
  }

  set config({ restaurant }) {
    this._restaurant = restaurant;
    this._foods = restaurant.menus.foods;
    this._drinks = restaurant.menus.drinks;

    this.renderDetail();
  }

  createRenderRoot() {
    return this;
  }

  menuItemTemplate() {
    return RestaurantMenuItemInitiator.init(this._foods, this._drinks);
  }

  renderDetail() {
    this.innerHTML = createRestaurantDetailTemplate(this._restaurant, this.menuItemTemplate());
  }
}

customElements.define('restaurant-detail', RestaurantDetail);
