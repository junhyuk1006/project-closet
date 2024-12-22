import { call } from '../auth/ApiService';

export default async function FetchInquiry({ itemId, onInquiryFetch }) {
  try {
    const response = await call(`/inquiry/getInquiries/${itemId}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    if (response) {
      onInquiryFetch(response);
    }
  } catch (error) {
    console.log('Error fetching item data:', error);
  }
}
