import {LitElement} from 'lit';
import { createRestaurantItemTemplate } from '../views/templates/template-creator';

class RestaurantItem extends LitElement {
  set config({ restaurant}) {
    this._restaurant = restaurant;
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return createRestaurantItemTemplate(this._restaurant);
  }
};

customElements.define('restaurant-item', RestaurantItem);

