const { expect } = require('chai');

Feature('Favorite Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('Favoriting A restaurant', async ({ I }) => {
  I.see('No restaurants have been added to your favorites list yet.', '.message');

  I.amOnPage('/');

  I.seeElement('.btn_explore_now');
  I.click(locate('.btn_explore_now').first());

  I.wait(2);
  I.seeElement('restaurant-item');
  I.click(locate('restaurant-item').first());

  I.seeElement('.restaurant__content');
  I.click(locate('.restaurant__content').first());

  const firstRestaurant = locate('.restaurant__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.wait(2);
  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');

  I.amOnPage('/#/favorite');
  I.seeElement('restaurant-item');
  const favoriteRestaurantTitle = await I.grabTextFrom('.restaurant__title');
  expect(firstRestaurantTitle).to.equal(favoriteRestaurantTitle);

  I.click(locate('restaurant-item').first());

  I.seeElement('.restaurant__content');
  I.click(locate('.restaurant__content').first());

  I.seeElement('.restaurant__title a');
  I.click(locate('.restaurant__title a').first());

  I.wait(2);
  I.seeElement('#favoritedButton');
  I.click('#favoritedButton');

  I.amOnPage('/#/favorite');
  I.see('No restaurants have been added to your favorites list yet.', '.message');
});
