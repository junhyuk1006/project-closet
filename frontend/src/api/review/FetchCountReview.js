import { call } from '../auth/ApiService';

export default async function FetchCountReview({ itemId, onCountFetch } = {}) {
  if (itemId) {
    try {
      const response = await call(`/countReview/${itemId}`);
      console.log(response);

      if (!response.ok) {
        // throw new Error('error');
      }

      if (onCountFetch) {
        onCountFetch(response);
      }
    } catch (error) {
      console.error('this error is', error);
    }
  }
}
