import { createCustomerReviewTemplate } from '../views/templates/template-creator';

const RestaurantReviewsInitiator = {
  async init({ containerReviews, reviews }) {
    this._reviews = reviews;
    this._containerReviews = containerReviews;

    await this._render();
    await this._loadMoreButtonHandler();
  },

  async _createAllCustomerReviewsTemplate(indexLimit) {
    let reviewsTemplate = '';
    this._reviews.forEach((review, index) => {
      (index < indexLimit) ? reviewsTemplate += createCustomerReviewTemplate(review) : reviewsTemplate += createCustomerReviewTemplate(review, 'hidden');
    });
    return reviewsTemplate;
  },

  async _loadMoreButtonHandler() {
    const loadMoreReviewButton = document.querySelector('.load_more_review');
    const customerReviewsLength = this._reviews.length;

    (customerReviewsLength <= 5) ? loadMoreReviewButton.classList.add('hidden') : null;
    (customerReviewsLength > 5 && loadMoreReviewButton.classList.contains('hidden')) ? loadMoreReviewButton.classList.remove('hidden') : null;

    loadMoreReviewButton.addEventListener('click', async (event) => {
      await this._renderAll();
      event.target.classList.add('hidden');
    });

    loadMoreReviewButton.addEventListener('keypress', async (event) => {
      if (event.key === 'Enter') {
        await this._renderAll();
      }
    });
  },

  async _renderAll() {
    const hiddenReviews = document.querySelectorAll('.customer__review.hidden');

    hiddenReviews.forEach((review) => {
      review.classList.remove('hidden');
      review.classList.add('show');
    });
  },

  async _render(indexLimit = 5) {
    this._containerReviews.innerHTML = await this._createAllCustomerReviewsTemplate(indexLimit);
  },
};

export default RestaurantReviewsInitiator;
