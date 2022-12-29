const { expect } = require('chai');

Feature('Customer Reviews Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('Displays A Reviews', async ({ I }) => {
  I.seeElement('.btn_explore_now');
  I.click(locate('.btn_explore_now').first());

  I.wait(2);
  I.seeElement('restaurant-item');
  I.click(locate('restaurant-item').first());

  I.seeElement('.restaurant__content');
  I.click(locate('.restaurant__content').first());

  I.seeElement('.restaurant__title a');
  I.click(locate('.restaurant__title a').first());

  I.wait(2);
  I.seeElement('.customer__review.show');

  const reviewShow = await I.grabNumberOfVisibleElements('.customer__review.show');
  expect(reviewShow).to.be.at.most(5);

  const loadMoreButton = await I.grabNumberOfVisibleElements('.load_more_review');
  if (loadMoreButton) {
    I.seeElement('.load_more_review');
    I.click(locate('.load_more_review').first());
    const allReview = await I.grabNumberOfVisibleElements('.customer__review.show');
    expect(allReview).to.be.at.greaterThan(5);
  }
});

Scenario('Added A New Review', async ({ I }) => {
  I.seeElement('.btn_explore_now');
  I.click(locate('.btn_explore_now').first());

  I.wait(2);
  I.seeElement('restaurant-item');
  I.click(locate('restaurant-item').first());

  I.seeElement('.restaurant__content');
  I.click(locate('.restaurant__content').first());

  I.seeElement('.restaurant__title a');
  I.click(locate('.restaurant__title a').first());

  I.wait(2);
  const offlineMessage = await I.grabNumberOfVisibleElements('.message.add_review');
  if (!offlineMessage) {
    I.seeElement('.input__name');
    I.fillField('.input__name', 'John Doe');

    I.seeElement('.input__review');
    I.fillField('.input__review', 'all the food is delicious.');
    I.click('#buttonSubmitReview');

    I.wait(2);
    const nameInputValue = await I.grabValueFrom('.input__name');
    const reviewInputValue = await I.grabValueFrom('.input__review');

    I.seeElement('.customer__review.show');
    I.seeElement(locate('.customer__review.show .name').withText(nameInputValue));
    I.seeElement(locate('.customer__review.show .review').withText(reviewInputValue));
  }
});
