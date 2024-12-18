import React, { createContext, useContext, useState, useCallback } from "react";

const BasketContext = createContext();

export const useCart = () => useContext(BasketContext);

export const BasketProvider = ({ children }) => {
    const [baskets, setBaskets] = useState([]);

    const fetchBaskets = useCallback(async (userId) => {
        try {
            const response = await fetch(`http://localhost:80/api/basket/getBasket/${userId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch baskets");
            }
            const data = await response.json();
            setBaskets(data); // 상태 업데이트
        } catch (error) {
            console.error("Error fetching baskets:", error);
        }
    }, []);

    const removeFromCart = useCallback(async (basketId) => {
        try {
            const response = await fetch(`http://localhost:80/api/basket/remove/${basketId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to remove item");
            }
            setBaskets((prev) => prev.filter((item) => item.basketId !== basketId));
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    }, []);

    const addToCart = useCallback((newItem) => {
        setBaskets((prev) => [...prev, newItem]); // 이전 상태에 새 항목 추가
    }, []);

    return (
        <BasketContext.Provider value={{ baskets, fetchBaskets, removeFromCart, addToCart }}>
            {children}
        </BasketContext.Provider>
    );
};