import { call } from '../auth/ApiService';

export default async function FetchGetBasket({ userId, onGetFetch }) {
  try {
    if (userId) {
      const response = await call(`/basket/getBasket/${userId}`);
      if (!response.ok) {
        // throw new Error('getBasket API response error');
      }

      if (onGetFetch) {
        onGetFetch(response);
      }
    }
  } catch (error) {
    console.error('getBasket Fetch Error: ', error);
  }
}
