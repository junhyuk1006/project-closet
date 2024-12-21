import React, { useEffect } from 'react';

function FetchCountInquiry({ itemId, onCountFetch }) {
  useEffect(() => {
    if (itemId) {
      fetch(`http://localhost:8090/api/inquiry/getCountInquiries/${itemId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('no');
          }
          return response.json();
        })
        .then((data) => {
          if (onCountFetch) {
            onCountFetch(data);
          }
        })
        .catch((error) => console.error('this error(Count Inquiry): ', error));
    }
  }, [onCountFetch]);
  return null;
}

export default FetchCountInquiry;
