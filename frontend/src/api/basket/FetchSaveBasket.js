import { call } from '../auth/ApiService';

export default async function fetchSaveBasket({ basketData, onSaveFetch }) {
  try {
    const response = await call(
      `/basket/saveBasket`,
      'POST',
      JSON.stringify(basketData)
    );

    if (!response.ok) {
      // throw new Error('Failed to save basket');
    }

    if (onSaveFetch) {
      onSaveFetch(response);
    }

    return response;
  } catch (error) {
    console.error('Error in fetchSaveBasket:', error);
    throw error;
  }
}
