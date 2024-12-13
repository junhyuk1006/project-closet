import React, { useEffect, useState } from 'react';

// import CSS
import '../../assets/styles/cart/Cart.css'; // cart 스타일
import { Link } from 'react-router-dom';
import { call } from '../../api/auth/ApiService';

function Cart({ isCartOpen, toggleCart, baskets }) {
  return (
    <div
      className={`wrap-header-cart js-panel-cart ${isCartOpen ? 'show-header-cart' : ''}`}
    >
      {/* 배경 클릭 시 장바구니 닫기 */}
      <div
        className="s-full js-hide-cart"
        onClick={() => toggleCart(isCartOpen)}
      ></div>

      <div className="header-cart flex-col-l p-l-45 p-r-25">
        {/* 장바구니 타이틀 */}
        <div className="header-cart-title flex-w flex-sb-m p-b-8 w-full">
          <span className="mtext-103 cl2">
            <b>장바구니</b>
          </span>
          <div
            className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart"
            onClick={() => {
              toggleCart(isCartOpen);
            }}
          >
            <i className="zmdi zmdi-close"></i>
          </div>
        </div>

        {/* 장바구니 내용 */}
        <div className="header-cart-content flex-w js-pscroll">
          <ul className="header-cart-wrapitem w-full">
            {/* 상품 리스트 */}
            {baskets.map((basket) => (
              <li
                className="header-cart-item flex-w flex-t m-b-12"
                key={basket.id}
              >
                <div className="header-cart-item-img">
                  <img
                    src={`images/${basket.mainImage}`}
                    alt={basket.itemName}
                  />
                </div>
                <div className="header-cart-item-txt p-t-8">
                  <a
                    href="#"
                    className="header-cart-item-name m-b-18 hov-cl1 trans-04"
                  >
                    {basket.itemName}
                  </a>
                  <span className="header-cart-item-info">
                    {basket.itemCount} × {basket.itemPrice}원
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {/* 총합과 버튼 */}
          <div className="w-full">
            <div className="header-cart-total w-full p-tb-40">
              Total:{' '}
              {baskets.reduce(
                (total, basket) => total + basket.itemCount * basket.itemPrice,
                0
              )}
              원
            </div>
            <div className="header-cart-buttons flex-w w-full">
              <Link
                to="/ShoppingCart"
                className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10"
              >
                장바구니 이동
              </Link>
              <a
                href="../../../../../Downloads/cozastore-master/shoping-cart.html"
                className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10"
              >
                주문하기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
