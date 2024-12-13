export const FetchGetBasket = async ({ userId, onGetFetch }) => {
    try {
        if (userId) {
            const response = await fetch(`http://localhost:80/api/basket/getBasket/${userId}`);
            if (!response.ok) {
                throw new Error("getBasket API response error");
            }
            const data = await response.json();
            if (onGetFetch) {
                onGetFetch(data);
            }
        }
    } catch (error) {
        console.error("getBasket Fetch Error: ", error);
    }
};