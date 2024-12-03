import { useState } from "react";

function useProductQuantity(initialValue = 1) {
    const [quantity, setQuantity] = useState(initialValue);

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 0 ? prevQuantity - 1 : 0));
    };

    return { quantity, increaseQuantity, decreaseQuantity };
}

export default useProductQuantity;