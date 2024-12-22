import { call } from '../auth/ApiService';

export default async function FetchCountReview({ itemId, onCountFetch }) {
  try {
    const response = await call(`/countReview/${itemId}`);
    if (!response.ok) {
      throw new Error('error');
    }

    if (onCountFetch) {
      onCountFetch(response);
    }
  } catch (error) {
    console.error('this error is', error);
  }
}
