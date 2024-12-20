import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../api/basket/BasketContext';
import { useUser } from '../../api/auth/UserContext';
import './Cart.css';

function Cart({ isCartOpen, toggleCart }) {
  const { baskets, removeFromCart, fetchBaskets } = useCart();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && user && user.id) {
      fetchBaskets(user.id);
    }
  }, [user, loading]);

  const handleRemoveItem = async (basketId) => {
    if (!basketId) {
      console.error('basketId is undefined');
      return;
    }
    try {
      await removeFromCart(basketId);
      await fetchBaskets(user.id); // 삭제 후 데이터 새로고침
      alert('Item removed successfully.');
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

  // Filter active baskets
  const activeBaskets = baskets.filter((item) => item.status === 'active');

  const totalAmount = activeBaskets.reduce(
      (acc, item) => acc + (item.itemCount * item.itemPrice || 0),
      0
  );

  return (
      <>
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
                {activeBaskets.length > 0 ? (
                    activeBaskets.map((item) => (
                        <li
                            key={item.basketId}
                            className="header-cart-item flex-w flex-t m-b-12"
                        >
                          <div className="header-cart-item-img">
                            <img
                                src={`images/${item.mainImage}`}
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
                  Total: {totalAmount.toLocaleString()} 원
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
      </>
  );
}

export default Cart;
