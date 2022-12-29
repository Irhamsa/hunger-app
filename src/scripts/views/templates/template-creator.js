import { html } from 'lit';
import CONFIG from '../../globals/config';

const createPreloaderTemplate = () => `
<div class="preloader">
</div>
`;

const createRestaurantItemTemplate = (restaurant) => {
  return html`
    <img src="${CONFIG.PLACEHOLDER_IMAGE_PATH}" data-src="${CONFIG.BASE_IMAGE_URL}medium/${restaurant.pictureId}" alt="restaurant ${restaurant.name} image">
    <div class="restaurant__city" aria-label="from ${restaurant.city}.">
        <p>${restaurant.city}</p>
    </div>
    <div class="restaurant__content">
        <p class="restaurant__rating" aria-label="With Rating ${restaurant.rating}.">Rating: ★${restaurant.rating}</p>
        <h3 class="restaurant__title" aria-label="restaurant ${restaurant.name}."><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h3>
        <p class="restaurant__description">${restaurant.description} <a href="/#/detail/${restaurant.id}" tabindex="0">Read more</a></p>
    </div>
    `;
};

const createRestaurantDetailTemplate = (restaurant, menus) => {
  return `
  <h2 id="restaurantTitle" aria-label="restaurant ${restaurant.name}." tabindex="0">${restaurant.name}</h2>
  <div class="restaurant__picture" aria-label="image restaurant ${restaurant.name}" tabindex="0">
    <div id="favoriteButtonContainer"></div>
    <img src="${CONFIG.BASE_IMAGE_URL}large/${restaurant.pictureId}" alt="restaurant ${restaurant.name} image">
  </div>
  <div class="restaurant__info">
    <h4 aria-label="restaurant name" tabindex="0">Name :</h4>
    <p tabindex="0">${restaurant.name}</p>
    <h4 aria-label="restaurant address" tabindex="0">Address :</h4>
    <p tabindex="0">${restaurant.address}</p>
    <h4 tabindex="0">City :</h4>
    <p tabindex="0">${restaurant.city}</p>
    <h4 aria-label="restaurant description" tabindex="0">Description :</h4>
    <p tabindex="0">${restaurant.description}</p>
  </div>
  <div class="restaurant__menus">
    <h3 aria-label="restaurant menu" tabindex="0">Menu</h3>
    <div class="menu__list">
      <div class="foods">
        <h4 tabindex="-">Foods :</h4>
        <ul>${menus.foodsList}</ul>
      </div>
      <div class="drinks">
        <h4 tabindex="0">Drinks :</h4>
        <ul>${menus.drinksList}</ul>
      </div>
    </div>
  </div>
  <h3 aria-label="customer reviews" tabindex="0">Reviews</h3>
  <div class="customer__reviews_list">
  </div>
  <a class="load_more_review" tabindex="0">Load more reviews</a>
  <h3 tabindex="0">Add new review</h3>
  <form class="input_new_review">
    <p class="message add_review hidden">add review can't work offline</p>
    <input tabindex="" type="text" class="input__name" id="inputName" placeholder="Your name." autocomplete="off" data-submit="false" required>
    <textArea tabindex="0" aria-label="give your review here." class="input__review" id="inputReview" rows="5" placeholder="give your review here." autocomplete="off" data-submit="false" required></textArea>
    <button tabindex="0" aria-label="button submit" type="submit" id="buttonSubmitReview">Submit</button>
  </form>
  `;
};

const createRestaurantMenuItemTemplate = (menuItem) => `<li tabindex="0">${menuItem}</li>`;

const createCustomerReviewTemplate = (customer, isHidden = 'show') => `
<div class="customer__review ${isHidden}">
  <h4 class="name" tabindex="0" aria-label="name. ${customer.name}"><i class="fa-solid fa-circle-user"></i> ${customer.name}</h4>
  <p class="review" tabindex="0" aria-label="review. ${customer.review}">${customer.review}</p>
  <p class="date" tabindex="0" aria-label="at the date of ${customer.date}">${customer.date}</p>
</div>
`;

const createFavoriteRestaurantButtonTemplate = () => `
    <button class="favorite" id="favoriteButton" aria-label="favorite button" tabindex="0">
      <i class="fa-regular fa-star"></i>
    </button>
`;

const createUnfavoriteRestaurantButtonTemplate = () => `
    <button class="favorited" id="favoritedButton" aria-label="unfavorite button" tabindex="0">
      <i class="fa-solid fa-star"></i>
    </button>
`;

export {
  createPreloaderTemplate,
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createRestaurantMenuItemTemplate,
  createCustomerReviewTemplate,
  createFavoriteRestaurantButtonTemplate,
  createUnfavoriteRestaurantButtonTemplate,
};
