import { useEffect } from 'react';
import { call } from '../auth/ApiService';

function FetchIdProduct({ id, onItemFetch }) {
  useEffect(() => {
    if (id) {
      call(`/itemDetail/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          if (onItemFetch) {
            onItemFetch(data);
          }
        })
        .catch((error) => console.log('Error fetching item data:', error));
    }
  }, [id]);

  return null; // UI 렌더링 없음
}

export default FetchIdProduct;
