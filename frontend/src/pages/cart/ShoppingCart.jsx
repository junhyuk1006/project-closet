import React, { useState } from 'react';

// CSS Imports
import '../../assets/styles/components/main.css'; // 메인 스타일
import '../../assets/styles/components/util.css'; // 유틸리티 스타일
import 'slick-carousel/slick/slick.css'; // 슬릭 캐러셀 스타일
import 'slick-carousel/slick/slick-theme.css'; // 슬릭 캐러셀 테마
import 'font-awesome/css/font-awesome.min.css'; // Font Awesome 아이콘
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css'; // Material Design 아이콘

// Component Imports
import Footer from '../../components/Footer'; // 하단 푸터 컴포넌트

// Hook Imports
import useProductQuantity from '../../hooks/useProductQuantity'; // 상품 수량 증가/감소 관리 {이건 아직 DB 연결이 되어 있지 않아 사용 X}

function ShoppingCart() {
  // 장바구니 열기/닫기 상태 관리

  // 각 제품의 개별 수량 관리
  const [quantities, setQuantities] = useState({
    product1: 1, // 첫 번째 상품 수량
    product2: 1, // 두 번째 상품 수량
  });

  // 수량 증가 함수
  const increaseQuantity = (product) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product]: prevQuantities[product] + 1,
    }));
  };

  // 수량 감소 함수 (최소값 0으로 제한)
  const decreaseQuantity = (product) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product]: Math.max(prevQuantities[product] - 1, 0),
    }));
  };

  return (
    <>
      {/* ShoppingCart Main Container */}
      <form className="bg0 p-t-75 p-b-85">
        <div className="container">
          {/* Breadcrumb Navigation: 현재 페이지 위치 표시 */}
          <div
            className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg"
            style={{ marginTop: '-70px', marginBottom: '70px' }} // 페이지 간격 설정
          >
            <a href="/" className="stext-109 cl8 hov-cl1 trans-04">
              Home
              <i
                className="fa fa-angle-right m-l-9 m-r-10"
                aria-hidden="true"
              ></i>
            </a>
            <span className="stext-109 cl4">Shopping Cart</span>
          </div>

          <div className="row">
            {/* Shopping Cart Table: 상품 리스트와 수량/총액 표시 */}
            <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
              <div className="m-l-25 m-r--38 m-lr-0-xl">
                <div className="wrap-table-shopping-cart">
                  <table className="table-shopping-cart">
                    <thead>
                      <tr className="table_head">
                        <th className="column-1">Product</th>
                        <th className="column-2"></th>
                        <th className="column-3">Price</th>
                        <th className="column-4">Quantity</th>
                        <th className="column-5">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* 첫 번째 상품 */}{' '}
                      {/* 이 부분은 추후 DB 연동 하여 Map으로 구현할 예정*/}
                      <tr className="table_row">
                        <td className="column-1">
                          <div className="how-itemcart1">
                            <img src="/images/item-cart-04.jpg" alt="IMG" />
                          </div>
                        </td>
                        <td className="column-2">Fresh Strawberries</td>
                        <td className="column-3">$ 36.00</td>
                        <td className="column-4">
                          {/* 여기서 부터가 제품 수량 선택하는 곳 */}
                          <div className="wrap-num-product flex-w m-l-auto m-r-0">
                            {/* 수량 감소 */}{' '}
                            {/* onClick -> decreaseQuantity 함수 호출 (return 위 함수 참조)*/}
                            <div
                              className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                              onClick={() => decreaseQuantity('product1')}
                              style={{ cursor: 'pointer' }}
                            >
                              {' '}
                              <i className="fs-16 zmdi zmdi-minus"></i>{' '}
                            </div>
                            {/* 양 버튼에 따른 숫자 반영 */} {/* 기본값: 1 */}
                            <input
                              className="mtext-104 cl3 txt-center num-product"
                              type="number"
                              value={quantities.product1}
                              readOnly
                            />
                            {/* 수량 증가 */}{' '}
                            {/* onClick -> increaseQuantity 함수 호출 (return 위 함수 참조)*/}
                            <div
                              className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                              onClick={() => increaseQuantity('product1')}
                              style={{ cursor: 'pointer' }}
                            >
                              {' '}
                              <i className="fs-16 zmdi zmdi-plus"></i>{' '}
                            </div>
                          </div>
                        </td>
                        <td className="column-5">
                          ${quantities.product1 * 36.0}
                        </td>
                      </tr>
                      {/* 두 번째 상품 */}
                      <tr className="table_row">
                        <td className="column-1">
                          <div className="how-itemcart1">
                            <img src="/images/item-cart-05.jpg" alt="IMG" />
                          </div>
                        </td>
                        <td className="column-2">Lightweight Jacket</td>
                        <td className="column-3">$ 16.00</td>
                        <td className="column-4">
                          <div className="wrap-num-product flex-w m-l-auto m-r-0">
                            <div
                              className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                              onClick={() => decreaseQuantity('product2')}
                              style={{ cursor: 'pointer' }}
                            >
                              <i className="fs-16 zmdi zmdi-minus"></i>
                            </div>
                            <input
                              className="mtext-104 cl3 txt-center num-product"
                              type="number"
                              value={quantities.product2}
                              readOnly
                            />
                            <div
                              className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                              onClick={() => increaseQuantity('product2')}
                              style={{ cursor: 'pointer' }}
                            >
                              <i className="fs-16 zmdi zmdi-plus"></i>
                            </div>
                          </div>
                        </td>
                        <td className="column-5">
                          ${quantities.product2 * 16.0}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Cart Totals: 총액 및 배송 계산 */}
            <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
              <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                <h4 className="mtext-109 cl2 p-b-30">Cart Totals</h4>
                <div className="flex-w flex-t bor12 p-b-13">
                  <div className="size-208">
                    <span className="stext-110 cl2">Subtotal:</span>
                  </div>
                  <div className="size-209">
                    <span className="mtext-110 cl2">
                      ${quantities.product1 * 36.0 + quantities.product2 * 16.0}
                    </span>
                  </div>
                </div>

                {/* 배송 정보 */}
                <div className="flex-w flex-t bor12 p-t-15 p-b-30">
                  <div className="size-208 w-full-ssm">
                    <span className="stext-110 cl2">Shipping:</span>
                  </div>
                  <div className="size-209 p-r-18 p-r-0-sm w-full-ssm">
                    <p className="stext-111 cl6 p-t-2">
                      There are no shipping methods available. Please double
                      check your address, or contact us if you need any help.
                    </p>
                    <div className="p-t-15">
                      <span className="stext-112 cl8">Calculate Shipping</span>
                      <div className="rs1-select2 rs2-select2 bor8 bg0 m-b-12 m-t-9">
                        <select className="js-select2" name="time">
                          <option>Select a country...</option>
                          <option>USA</option>
                          <option>UK</option>
                        </select>
                        <div className="dropDownSelect2"></div>
                      </div>
                      <div className="bor8 bg0 m-b-12">
                        <input
                          className="stext-111 cl8 plh3 size-111 p-lr-15"
                          type="text"
                          name="state"
                          placeholder="State /  country"
                        />
                      </div>
                      <div className="bor8 bg0 m-b-22">
                        <input
                          className="stext-111 cl8 plh3 size-111 p-lr-15"
                          type="text"
                          name="postcode"
                          placeholder="Postcode / Zip"
                        />
                      </div>
                      <div className="flex-w">
                        <div className="flex-c-m stext-101 cl2 size-115 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer">
                          Update Totals
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 총합 */}
                <div className="flex-w flex-t p-t-27 p-b-33">
                  <div className="size-208">
                    <span className="mtext-101 cl2">Total:</span>
                  </div>
                  <div className="size-209 p-t-1">
                    <span className="mtext-110 cl2">
                      ${quantities.product1 * 36.0 + quantities.product2 * 16.0}
                    </span>
                  </div>
                </div>

                <button className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default ShoppingCart;
