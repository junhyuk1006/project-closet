import React, { useEffect } from 'react';

function FetchAllProduct({ onItemFetch }) {
  useEffect(() => {
    fetch('http://localhost:8090/api/itemAll')
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
  }, [onItemFetch]);
  return null;
}

export default FetchAllProduct;
