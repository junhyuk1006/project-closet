import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FetchGetBasket } from '../../api/basket/FetchGetBasket';

import { useUser } from '../../api/auth/UserContext';
import './Cart.css';

function Cart({ isCartOpen, toggleCart }) {
  const [baskets, setBaskets] = useState([]); // 장바구니 데이터 상태 관리
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && user && user.id) {
      FetchGetBasket({ userId: user.id, onGetFetch: setBaskets });
    }
  }, [user, loading]);

  const handleRemoveItem = async (basketId) => {
    try {
      const response = await fetch(
        `http://localhost:80/api/basket/remove/${basketId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to remove item from basket.');
      }

      alert('Item removed successfully.');

      // 장바구니 상태 업데이트
      setBaskets((prevBaskets) =>
        prevBaskets.filter((item) => item.basketId !== basketId)
      );
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item. Please try again.');
    }
  };

  if (loading) {
    return loading;
  }

  if (!user || !user.id) {
    return user;
  }

  return (
    <div
      className={`wrap-header-cart js-panel-cart ${isCartOpen ? 'show-header-cart' : ''}`}
    >
      <div
        className="s-full js-hide-cart"
        onClick={() => toggleCart(isCartOpen)}
      ></div>

      <div className="header-cart flex-col-l p-l-45 p-r-25">
        <div className="header-cart-title flex-w flex-sb-m p-b-8 w-full">
          <span className="mtext-103 cl2">
            <b>장바구니</b>
          </span>
          <div
            className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart"
            onClick={() => toggleCart(isCartOpen)}
          >
            <i className="zmdi zmdi-close"></i>
          </div>
        </div>

        <div className="header-cart-content flex-w js-pscroll">
          <ul className="header-cart-wrapitem w-full">
            {baskets.length > 0 ? (
              baskets.map((item, index) => (
                <li
                  key={index}
                  className="header-cart-item flex-w flex-t m-b-12"
                >
                  <div className="header-cart-item-img">
                    <img
                      src={`images/${item.mainImage}`} // 이미지 URL
                      alt={item.itemName || '상품 이미지'}
                    />
                  </div>
                  <div className="header-cart-item-txt p-t-8">
                    <a
                      href="#"
                      className="header-cart-item-name m-b-18 hov-cl1 trans-04"
                    >
                      {item.itemName || '상품 이름'}
                    </a>
                    <span className="header-cart-item-info">
                      {item.itemCount} × {item.itemPrice?.toLocaleString()} 원
                    </span>
                  </div>
                  <div className="header-cart-item-remove p-t-8">
                    <button
                      className="btn-remove-item hov-cl1 trans-04"
                      onClick={() => handleRemoveItem(item.basketId)}
                    >
                      X
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="header-cart-item flex-w flex-t m-b-12">
                <div className="header-cart-item-txt p-t-8">
                  <span className="header-cart-item-name m-b-18 hov-cl1 trans-04">
                    장바구니가 비어 있습니다.
                  </span>
                </div>
              </li>
            )}
          </ul>

          <div className="w-full">
            <div className="header-cart-total w-full p-tb-40">
              Total:{' '}
              {baskets
                .reduce((acc, item) => acc + item.itemCount * item.itemPrice, 0)
                .toLocaleString()}{' '}
              원
            </div>
            <div className="header-cart-buttons flex-w w-full">
              <Link
                to="/ShoppingCart"
                className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10"
              >
                장바구니 이동
              </Link>
              <button className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10">
                주문하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
