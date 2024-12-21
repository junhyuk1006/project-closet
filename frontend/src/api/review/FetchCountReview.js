import React, { useState, useEffect } from 'react';

function FetchCountReview({ itemId, onCountFetch }) {
  useEffect(() => {
    fetch(`http://localhost:8090/api/countReview/${itemId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('error');
        }
        return response.json(); // JSON 데이터를 파싱하여 반환
      })
      .then((data) => {
        if (onCountFetch) {
          onCountFetch(data);
        }
      })
      .catch((error) => console.error('this error is', error));
  }, []);
  return null;
}

export default FetchCountReview;
