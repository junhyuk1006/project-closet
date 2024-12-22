import { useEffect } from 'react';
import { call } from '../auth/ApiService';

function FetchInquiry({ item_id, onInquiryFetch }) {
  useEffect(() => {
    call(`/inquiry/getInquiries/${item_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          onInquiryFetch(data);
        }
      })
      .catch((error) => console.log('Error fetching item data:', error));
  }, [onInquiryFetch]);
  return null;
}
export default FetchInquiry;
