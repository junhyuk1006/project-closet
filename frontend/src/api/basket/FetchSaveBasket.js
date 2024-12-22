import { call } from '../auth/ApiService';

export const fetchSaveBasket = async ({ basketData, onSaveFetch }) => {
  try {
    const response = await call(`/basket/saveBasket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(basketData),
    });

    if (!response.ok) {
      throw new Error('Failed to save basket');
    }

    const data = await response.json();

    if (onSaveFetch) {
      onSaveFetch(data);
    }

    return data;
  } catch (error) {
    console.error('Error in fetchSaveBasket:', error);
    throw error;
  }
};
