import React from 'react';

// import CSS
import '../../assets/styles/cart/Cart.css'; // cart 스타일
import { Link } from 'react-router-dom';

function Cart({ isCartOpen, toggleCart }) {
  return (
    <>
      {isCartOpen && (
        <div className="wrap-header-cart js-panel-cart show-header-cart">
          {/* 배경 클릭 시 장바구니 닫기 */}
          <div
            className="s-full js-hide-cart"
            onClick={() => toggleCart(isCartOpen)}
          ></div>

          {/* p-l-65 -> p-l-45로 조정 (좌측 padding값 65 -> 45) */}
          <div className="header-cart flex-col-l p-l-45 p-r-25">
            {/* 장바구니 타이틀 */}
            {/* 닫기 버튼의 위치를 정상적인 위치로 조정하기 위해 w-full 속성 적용 */}
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

            {/* 장바구니 내용 */}
            <div className="header-cart-content flex-w js-pscroll">
              <ul className="header-cart-wrapitem w-full">
                {/* 상품 리스트 */}
                <li className="header-cart-item flex-w flex-t m-b-12">
                  <div className="header-cart-item-img">
                    <img
                      src="images/item-cart-01.jpg"
                      alt="White Shirt Pleat"
                    />
                  </div>
                  <div className="header-cart-item-txt p-t-8">
                    <a
                      href="#"
                      className="header-cart-item-name m-b-18 hov-cl1 trans-04"
                    >
                      [CL7] 데일리 7부 화이트 셔츠
                    </a>
                    <span className="header-cart-item-info">1 × 25,000원</span>
                  </div>
                </li>

                <li className="header-cart-item flex-w flex-t m-b-12">
                  <div className="header-cart-item-img">
                    <img
                      src="images/item-cart-02.jpg"
                      alt="Converse All Star"
                    />
                  </div>
                  <div className="header-cart-item-txt p-t-8">
                    <a
                      href="#"
                      className="header-cart-item-name m-b-18 hov-cl1 trans-04"
                    >
                      [CL52] 컨버스 하이탑 스니커즈
                    </a>
                    <span className="header-cart-item-info">1 × 95,000원</span>
                  </div>
                </li>

                <li className="header-cart-item flex-w flex-t m-b-12">
                  <div className="header-cart-item-img">
                    <img
                      src="images/item-cart-03.jpg"
                      alt="Nixon Porter Leather"
                    />
                  </div>
                  <div className="header-cart-item-txt p-t-8">
                    <a
                      href="#"
                      className="header-cart-item-name m-b-18 hov-cl1 trans-04"
                    >
                      [CL96] Nixon Porter 가죽시계
                    </a>
                    <span className="header-cart-item-info">1 × 130,000원</span>
                  </div>
                </li>
              </ul>

              {/* 총합과 버튼 */}
              <div className="w-full">
                <div className="header-cart-total w-full p-tb-40">
                  Total: 260,000원
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
      )}
    </>
  );
}

export default Cart;
