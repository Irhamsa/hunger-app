import * as testFactories from './helpers/testFactories';

describe('Customer Reviews', () => {
  const addContainerReviews = () => {
    document.body.innerHTML = `
    <div class="customer__reviews_list"></div>
    <a class="load_more_review" tabindex="0">Load more reviews</a>
    `;
  };

  beforeEach(async () => {
    addContainerReviews();
  });

  it('should display no more than five customer reviews', async () => {
    await testFactories.createRestaurantReview([
      { name: 'a', review: 'b', date: 'c' },
      { name: 'a', review: 'b', date: 'c' },
      { name: 'a', review: 'b', date: 'c' },
      { name: 'a', review: 'b', date: 'c' },
      { name: 'a', review: 'b', date: 'c' },
      { name: 'a', review: 'b', date: 'c' },
      { name: 'a', review: 'b', date: 'c' },
    ]);

    expect(document.querySelectorAll('.customer__review.show').length > 5).toBeFalsy();
  });

  it('should display the Load More button when the number of reviews is greater than five', async () => {
    await testFactories.createRestaurantReview([
      { name: 'a', review: 'b', date: 'c' },
      { name: 'a', review: 'b', date: 'c' },
      { name: 'a', review: 'b', date: 'c' },
      { name: 'a', review: 'b', date: 'c' },
      { name: 'a', review: 'b', date: 'c' },
      { name: 'a', review: 'b', date: 'c' },
      { name: 'a', review: 'b', date: 'c' },
    ]);

    expect(document.querySelector('.load_more_review')).toBeTruthy();
  });

  it('do not display the Load More button when the number of reviews is not greater than five', async () => {
    await testFactories.createRestaurantReview([
      { name: 'a', review: 'b', date: 'c' },
      { name: 'a', review: 'b', date: 'c' },
      { name: 'a', review: 'b', date: 'c' },
      { name: 'a', review: 'b', date: 'c' },
      { name: 'a', review: 'b', date: 'c' },
    ]);

    expect(document.querySelector('.load_more_review.hidden')).toBeTruthy();
  });

  it('should display all reviews when the Load More button is clicked', async () => {
    await testFactories.createRestaurantReview([
      { name: 'a', review: 'b', date: 'c' },
      { name: 'a', review: 'b', date: 'c' },
      { name: 'a', review: 'b', date: 'c' },
      { name: 'a', review: 'b', date: 'c' },
      { name: 'a', review: 'b', date: 'c' },
      { name: 'a', review: 'b', date: 'c' },
      { name: 'a', review: 'b', date: 'c' },
    ]);

    document.querySelector('.load_more_review').dispatchEvent(new Event('click'));

    expect(document.querySelectorAll('.customer__review.show').length > 5).toBeTruthy();
  });
});
