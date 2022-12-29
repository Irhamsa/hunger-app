import RestaurantDBSource from '../data/restaurantdb-source';
import RestaurantReviewsInitiator from './restaurant-reviews-initiator';

const SubmitReviewInitiator = {
  init(id) {
    const submitButton = document.getElementById('buttonSubmitReview');

    this._id = id;
    this._isOnline();

    submitButton.addEventListener('click', (event) => {
      this._submitReview(event);
    });
  },

  _isOnline() {
    const inputName = document.getElementById('inputName');
    const inputReview = document.getElementById('inputReview');
    const submitButton = document.getElementById('buttonSubmitReview');
    const message = document.querySelector('.message.add_review');

    if (!window.navigator.onLine) {
      (message.classList.contains('hidden')) ? message.classList.remove('hidden') : null;
      (!inputName.classList.contains('hidden')) ? inputName.classList.add('hidden') : null;
      (!inputReview.classList.contains('hidden')) ? inputReview.classList.add('hidden') : null;
      (!submitButton.classList.contains('hidden')) ? submitButton.classList.add('hidden') : null;
    } else {
      (!message.classList.contains('hidden')) ? message.classList.add('hidden') : null;
      (inputName.classList.contains('hidden')) ? inputName.classList.remove('hidden') : null;
      (inputReview.classList.contains('hidden')) ? inputReview.classList.remove('hidden') : null;
      (submitButton.classList.contains('hidden')) ? submitButton.classList.remove('hidden') : null;
    }
  },

  async _submitReview(event) {
    const inputName = document.getElementById('inputName');
    const inputReview = document.getElementById('inputReview');

    if (inputName.value !== '' || inputReview.value !== '') {
      event.preventDefault();
    } else {
      inputName.dataset.submit = 'false';
      inputReview.dataset.submit = 'false';
      return;
    }

    inputName.dataset.submit = 'true';
    inputReview.dataset.submit = 'true';

    const data = {
      'id': this._id,
      'name': inputName.value,
      'review': inputReview.value,
    };
    const response = await RestaurantDBSource.customerReviews(data);
    if (response === 'error') return;
    const responseReviews = response.customerReviews.reverse();
    await RestaurantReviewsInitiator.init({
      containerReviews: document.querySelector('.customer__reviews_list'),
      reviews: responseReviews,
    });

    inputReview.value = '';
  },
};

export default SubmitReviewInitiator;
