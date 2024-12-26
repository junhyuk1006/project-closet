import { call } from '../auth/ApiService';

export default async function FetchIdProduct({ id, onItemFetch }) {
  if (id) {
    console.log('FetchIdProduct :' + id);
    try {
      const response = await call(`/itemDetail/${id}`);
      await console.log('response---------------------------');
      await console.log(response);
      if (!response.ok) {
        // throw new Error('Network response was not ok');
      }
      if (onItemFetch) {
        onItemFetch(response);
      }
    } catch (error) {
      console.log('Error fetching item data:', error);
    }
  }
}
