import { call } from '../auth/ApiService';

export default async function FetchAllReview({ itemId, onReviewFetch } = {}) {
  if (!itemId) {
    return;
  }

  try {
    const response = await call(`/findAllReview/${itemId}`);
    console.log(response);

    if (!response.ok) {
      // throw new Error('Network response was not ok');
    }

    if (Array.isArray(response)) {
      onReviewFetch(response);
    }
  } catch (error) {
    console.error('Error fetching item data:', error);
  }
}
