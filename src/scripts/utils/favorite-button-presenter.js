import { createFavoriteRestaurantButtonTemplate, createUnfavoriteRestaurantButtonTemplate } from '../views/templates/template-creator';

const FavoriteButtonPresenter = {
  async init({ restaurant, favoriteRestaurant, favoriteButtonContainer }) {
    this._favoriteButtonContainer = favoriteButtonContainer;
    this._restaurant = restaurant;
    this._favoriteRestaurant = favoriteRestaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;
    if (await this._isRestaurantExist(id)) {
      this._renderFavoritedButton();
    } else {
      this._renderFavoriteButton();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await this._favoriteRestaurant.getRestaurant(id);
    return !!restaurant;
  },

  async _addTofavorite() {
    await this._favoriteRestaurant.putRestaurant(this._restaurant);
  },

  async _removeFromfavorite() {
    await this._favoriteRestaurant.deleteRestaurant(this._restaurant.id);
  },

  _renderFavoriteButton() {
    this._favoriteButtonContainer.innerHTML = createFavoriteRestaurantButtonTemplate();

    const favoriteButton = document.querySelector('.favorite');

    favoriteButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this._renderFavoritedButton(this._favoriteButtonContainer);
      this._addTofavorite();
    });
  },

  _renderFavoritedButton() {
    this._favoriteButtonContainer.innerHTML = createUnfavoriteRestaurantButtonTemplate();

    const favoritedButton = document.querySelector('.favorited');

    favoritedButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this._renderFavoriteButton(this._favoriteButtonContainer);
      this._removeFromfavorite();
    });
  },
};

export default FavoriteButtonPresenter;
