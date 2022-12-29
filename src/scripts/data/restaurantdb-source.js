import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantDBSource {
  static async restaurantItem() {
    try {
      const response = await fetch(API_ENDPOINT.HOME);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
      return 'error';
    }
  }

  static async restaurantDetail(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.log(error);
      return 'error';
    }
  }

  static async customerReviews(data) {
    try {
      if (data.name === '' || data.date === '') return 'error';
      const response = await fetch(API_ENDPOINT.REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      return 'error';
    }
  }
}

export default RestaurantDBSource;
