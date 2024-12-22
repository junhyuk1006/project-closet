import { call } from '../auth/ApiService';

export default async function FetchIdProduct({ id, onItemFetch }) {
  try {
    const response = await call(`/itemDetail/${id}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    if (onItemFetch) {
      onItemFetch(response);
    }
  } catch (error) {
    console.log('Error fetching item data:', error);
  }
}
