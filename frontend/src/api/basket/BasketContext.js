import React, { createContext, useContext, useState, useCallback } from 'react';
import { call } from '../auth/ApiService';

const BasketContext = createContext();

export const useCart = () => useContext(BasketContext);

export const BasketProvider = ({ children }) => {
  const [baskets, setBaskets] = useState([]);

  const fetchBaskets = useCallback(async (userId) => {
    try {
      const response = await call(`/basket/getBasket/${userId}`);
      if (!response.ok) {
        // throw new Error('Failed to fetch baskets');
      }
      setBaskets(response); // 상태 업데이트
    } catch (error) {
      console.error('Error fetching baskets:', error);
    }
  }, []);

  const removeFromCart = useCallback(async (basketId) => {
    try {
      const response = await call(`/basket/remove/${basketId}`, 'DELETE');
      if (!response.ok) {
        // throw new Error('Failed to remove item');
      }
      setBaskets((prev) => prev.filter((item) => item.basketId !== basketId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }, []);

  const addToCart = useCallback((newItem) => {
    setBaskets((prev) => [...prev, newItem]); // 이전 상태에 새 항목 추가
  }, []);

  return (
    <BasketContext.Provider
      value={{ baskets, fetchBaskets, removeFromCart, addToCart }}
    >
      {children}
    </BasketContext.Provider>
  );
};
