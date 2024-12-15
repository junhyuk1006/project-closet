import React, { useState, useEffect } from "react";
import PriceDisplay from "../../hooks/PriceDisplay";

// CSS Imports
import "../../assets/styles/components/main.css";
import "../../assets/styles/components/util.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "font-awesome/css/font-awesome.min.css";
import "material-design-iconic-font/dist/css/material-design-iconic-font.min.css";

// Component Imports
import Footer from "../../components/Footer";

// Hook Imports
import { useUser } from "../../api/auth/UserContext"; // 사용자 정보를 가져오는 Hook
import { useCart } from "../../api/basket/BasketContext"; // 장바구니 관련 상태 관리



function ShoppingCart() {
  const { user, loading } = useUser(); // 사용자 정보 로드
  const { baskets, fetchBaskets } = useCart(); // 장바구니 데이터 관리
  const [quantities, setQuantities] = useState({}); // 각 제품의 수량 관리

  // 사용자에 따라 장바구니 데이터를 가져오기
  useEffect(() => {
    if (!loading && user && user.id) {
      fetchBaskets(user.id);
    }
  }, [user, loading, fetchBaskets]);

  // 수량 증가 함수
  const increaseQuantity = (basketId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [basketId]: (prevQuantities[basketId] || 1) + 1,
    }));
  };

  // 수량 감소 함수
  const decreaseQuantity = (basketId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [basketId]: Math.max((prevQuantities[basketId] || 1) - 1, 0),
    }));
  };

  // 로딩 상태 처리
  if (loading) {
    return <div>Loading user data...</div>;
  }

  // 로그인하지 않은 경우
  if (!user || !user.id) {
    return <div>Please log in to view your shopping cart.</div>;
  }

  return (
      <>
        <form className="bg0 p-t-75 p-b-85">
          <div className="container">
            <div
                className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg"
                style={{ marginTop: "-70px", marginBottom: "70px" }}
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
                      {/* 장바구니 데이터를 기반으로 상품 리스트 렌더링 */}
                      {baskets.map((item) => (
                          <tr className="table_row" key={item.basketId}>
                            <td className="column-1">
                              <div className="how-itemcart1">
                                <img
                                    src={`images/${item.mainImage}`}
                                    alt={item.itemName}
                                />
                              </div>
                            </td>
                            <td className="column-2">{item.itemName}</td>
                            <td className="column-3">
                              <PriceDisplay price={item.itemPrice}/>
                            </td>
                            <td className="column-4">
                              <div className="wrap-num-product flex-w m-l-auto m-r-0">
                                <div
                                    className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                                    onClick={() => decreaseQuantity(item.basketId)}
                                    style={{ cursor: "pointer" }}
                                >
                                  <i className="fs-16 zmdi zmdi-minus"></i>
                                </div>
                                <input
                                    className="mtext-104 cl3 txt-center num-product"
                                    type="number"
                                    value={
                                        quantities[item.basketId] || item.itemCount
                                    }
                                    readOnly
                                />
                                <div
                                    className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                                    onClick={() => increaseQuantity(item.basketId)}
                                    style={{ cursor: "pointer" }}
                                >
                                  <i className="fs-16 zmdi zmdi-plus"></i>
                                </div>
                              </div>
                            </td>
                            <td className="column-5">
                              {new Intl.NumberFormat('ko-KR', {
                                style: 'currency',
                                currency: 'KRW',
                                maximumFractionDigits: 0, // 소수점 제거
                              }).format(
                                  (quantities[item.basketId] || item.itemCount) * item.itemPrice
                              )}
                            </td>
                          </tr>
                      ))}
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
                        {new Intl.NumberFormat('ko-KR', {
                          style: 'currency',
                          currency: 'KRW',
                          maximumFractionDigits: 0, // 소수점 제거
                        }).format(
                            baskets.reduce(
                                (total, item) =>
                                    total +
                                    (quantities[item.basketId] || item.itemCount) * item.itemPrice,
                                0
                            )
                        )}
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