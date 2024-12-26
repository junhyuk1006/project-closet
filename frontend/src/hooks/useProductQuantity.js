import { useState } from 'react';

function useProductQuantity(initialValue = 1) {
  const [quantity, setQuantity] = useState(initialValue);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    quantity > 1
      ? setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0))
      : alert(`수량은 ${quantity}개 이상이어야 합니다.`);
  };

  return { quantity, increaseQuantity, decreaseQuantity };
}

export default useProductQuantity;
