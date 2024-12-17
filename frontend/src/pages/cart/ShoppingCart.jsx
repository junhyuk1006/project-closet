import React, { useState, useEffect } from "react";
import PriceDisplay from "../../hooks/PriceDisplay";
import { savePoint } from '../../api/point/FetchSavePoint';
import axios from "axios";

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
  const { user } = useUser(); // 사용자 정보 로드
  const { baskets, fetchBaskets } = useCart(); // 장바구니 데이터 관리
  const [quantities, setQuantities] = useState({}); // 각 제품의 수량 관리
  const [totalPoints, setTotalPoints] = useState(0); // 사용자 포인트
  const [usePoints, setUsePoints] = useState(""); // 사용할 포인트 (빈 상태 초기화)
  const [finalPrice, setFinalPrice] = useState(0); // 최종 결제 금액

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://nsp.pay.naver.com/sdk/js/naverpay.min.js";
    script.async = true;
    script.onload = () => console.log("Naver Pay SDK loaded successfully");
    document.body.appendChild(script);
  }, []);

  const userId =  user?.id || '';

  console.log("현재 장바구니 데이터:", baskets);

  // 사용자 포인트와 장바구니 데이터를 가져오기
  useEffect(() => {
      fetchBaskets(userId); // 장바구니 데이터 가져오기
      fetchTotalPoints(); // 사용자 포인트 가져오기
  }, [fetchBaskets]);

  const fetchTotalPoints = async () => {
    try {
      const response = await axios.post("http://localhost:80/api/point/getTotalPointByUserid", {
        userId: user.id, // JSON 형태로 사용자 ID 전달
      });
      console.log("Total points:", response.data);
      setTotalPoints(response.data); // 사용자 포인트 설정
    } catch (error) {
      console.error("Error fetching total points:", error);
    }
  };

  // 최종 결제 금액 계산
  useEffect(() => {
    const calculateFinalPrice = () => {
      const subtotal = baskets.reduce(
          (total, item) =>
              total + (quantities[item.basketId] || item.itemCount) * item.itemPrice,
          0
      );
      const pointsToUse = usePoints ? parseInt(usePoints, 10) : 0; // 입력값이 없을 때 0 처리
      setFinalPrice(Math.max(subtotal - pointsToUse, 0)); // 포인트 차감 후 금액
    };
    calculateFinalPrice();
  }, [usePoints, baskets, quantities]);

  const calculatePointsEarned = () => {
    const earnedRate = 0.01; // 포인트 적립 비율 (1%)
    return Math.floor(finalPrice * earnedRate); // 소수점 제거 후 반환
  };

  // 포인트 사용 입력 핸들러
  const handleUsePointsChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 입력 가능
    if (value === "") {
      setUsePoints(""); // 아무 입력이 없으면 빈 상태 유지
    } else {
      const subtotal = baskets.reduce(
          (total, item) =>
              total + (quantities[item.basketId] || item.itemCount) * item.itemPrice,
          0
      ); // 결제 예정 금액 계산

      const maxUsablePoints = Math.min(
          Math.floor(subtotal * 0.8), // 결제 금액의 최대 80% 포인트 사용 가능
          totalPoints // 보유 포인트
      );
      const validPoints = Math.min(parseInt(value, 10), maxUsablePoints); // 최대 포인트 제한
      setUsePoints(validPoints.toString()); // 유효 포인트만 설정
    }
  };

  // 네이버페이 결제창 호출 함수
  const openNaverPay = () => {
    if (window.Naver) {
      const oPay = window.Naver.Pay.create({
        mode: "development",
        clientId: "HN3GGCMDdTgGUfl0kFCo",
        chainId: "dk5nR1JxcmM2MU1",
      });

      oPay.open({
        merchantPayKey: "20241215HvZTrw",
        productName: "장바구니 상품",
        productCount: "1",
        totalPayAmount: finalPrice, // 최종 결제 금액
        taxScopeAmount: finalPrice,
        taxExScopeAmount: "0",
        returnUrl: "http://localhost:3000/",
      });
    } else {
      console.error("Naver Pay SDK is not loaded.");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const merchantPayKey = params.get("merchantPayKey");
    if (merchantPayKey) {
      handlePaymentApproval(merchantPayKey);
    }
  }, []);


  const handlePaymentApproval = async (merchantPayKey) => {
    try {
      // 네이버페이 결제 승인 API 호출
      const response = await axios.post("http://localhost:80/api/payment/approve", {
        merchantPayKey,
      });

      console.log("결제 승인 응답:", response.data);

      if (response.data.success) {
        // 주문 데이터 생성 및 저장
        const orderHistoryDTO = createOrderHistoryDTO();
        const saveOrderResponse = await saveOrder(orderHistoryDTO);

        if (saveOrderResponse.success) {
          alert("결제가 성공적으로 완료되었습니다!");
          fetchBaskets(user.id); // 장바구니 초기화
          fetchTotalPoints(); // 포인트 업데이트
        } else {
          console.error("주문 저장 실패:", saveOrderResponse);
          alert("주문 내역 저장 중 문제가 발생했습니다.");
        }
      } else {
        console.error("결제 승인 실패 상태:", response.data);
        alert("결제 승인에 실패했습니다.");
      }
    } catch (error) {
      console.error("결제 승인 중 오류 발생:", error);
      alert("결제 승인 중 오류가 발생했습니다.");
    }
  };

  const handleSaveOrder = async () => {
    try {
      // 주문 데이터 생성 DTO 생성
      const orderHistoryDTO = createOrderHistoryDTO();
      console.log("생성된 DTO:", orderHistoryDTO); // DTO 확인용 콘솔 로그

      // 서버로 주문 데이터 전송
      const saveOrderResponse = await saveOrder(orderHistoryDTO);

      // 응답 처리
      if (saveOrderResponse.success) {
        alert("주문 내역이 성공적으로 저장되었습니다!");
        console.log("주문 내역 저장 성공:", saveOrderResponse.data);
      } else {
        console.error("주문 내역 저장 실패:", saveOrderResponse);
        alert("주문 내역 저장 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("주문 내역 저장 중 오류 발생:", error);
      alert("주문 내역 저장 중 오류가 발생했습니다.");
    }
  };

  // 주문 내역 생성 DTO 함수
  const createOrderHistoryDTO = () => {
    const dto = {
      userId: user.id,
      orderDetails: baskets.map((item) => ({
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        itemCount: quantities[item.basketId] || item.itemCount,
        color: item.color,
        size: item.size,
        itemMainImage: item.mainImage,
      })),
      pointEarnedAmount: calculatePointsEarned(),
      pointUsedAmount: usePoints || 0,
      totalPaymentAmount: baskets.reduce(
          (total, item) =>
              total + (quantities[item.basketId] || item.itemCount) * item.itemPrice,
          0
      ),
      finalPaymentAmount: finalPrice,
      paymentStatus: "COMPLETED",
      paymentMethod: "NAVER_PAY",
    };
    return dto;
  };

  // 주문 내역 저장 API 호출
  const saveOrder = async (orderHistoryDTO) => {
    try {
      const response = await axios.post(
          "http://localhost:80/api/orders",
          orderHistoryDTO
      );
      console.log("주문 내역 저장 응답:", response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("주문 내역 저장 중 오류 발생:", error);
      return { success: false, error };
    }
  };


// 결제 버튼 핸들러 수정
  const handlePayment = async (e) => {
    e.preventDefault();

    const usePointForPayment = {
      userId: user.id,
      point: usePoints,
      pointReason: "상품 구매",
      pointType: "차감",
      pointInsertType: "purchase",
    };

    try {
      openNaverPay(); // 네이버페이 결제창 호출

      // 포인트 차감
      await savePoint(usePointForPayment);
      fetchTotalPoints(); // 포인트 업데이트

      // 주문 내역 저장
      const orderHistoryDTO = createOrderHistoryDTO();
      const saveOrderResponse = await saveOrder(orderHistoryDTO);

      if (saveOrderResponse.success) {
        alert("결제가 성공적으로 완료되었습니다!");
        fetchBaskets(user.id); // 장바구니 초기화
        fetchTotalPoints(); // 포인트 재확인
      } else {
        console.error("주문 저장 실패:", saveOrderResponse);
        alert("주문 내역 저장 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("결제 처리 중 오류 발생:", error);
      alert("결제 처리 중 문제가 발생했습니다.");
    }
  };

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
                <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
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
                              <PriceDisplay price={item.itemPrice} />
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
                              {new Intl.NumberFormat("ko-KR", {
                                style: "currency",
                                currency: "KRW",
                                maximumFractionDigits: 0,
                              }).format(
                                  (quantities[item.basketId] || item.itemCount) *
                                  item.itemPrice
                              )}
                            </td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
                <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                  <h4 className="mtext-109 cl2 p-b-30">Cart Totals</h4>
                  <div className="flex-w flex-t bor12 p-b-13">
                    <div className="size-208">
                      <span className="stext-110 cl2">Subtotal:</span>
                    </div>
                    <div className="size-209">
                    <span className="mtext-110 cl2">
                      {new Intl.NumberFormat("ko-KR", {
                        style: "currency",
                        currency: "KRW",
                        maximumFractionDigits: 0,
                      }).format(
                          baskets.reduce(
                              (total, item) =>
                                  total +
                                  (quantities[item.basketId] || item.itemCount) *
                                  item.itemPrice,
                              0
                          )
                      )}
                    </span>
                    </div>
                  </div>

                  <div>
                    <p>
                      사용 가능한 포인트:{" "}
                      {new Intl.NumberFormat("ko-KR").format(totalPoints)}P
                    </p>
                    <p>
                      최대 사용 가능 포인트 (80%):{" "}
                      {new Intl.NumberFormat("ko-KR").format(
                          Math.min(Math.floor(finalPrice * 0.8), totalPoints)
                      )}
                      P
                    </p>
                    <input
                        type="text"
                        value={usePoints}
                        onChange={handleUsePointsChange}
                        placeholder="사용할 포인트 입력"
                    />
                  </div>

                  <div className="flex-w flex-t p-t-27 p-b-33">
                    <div className="size-208">
                      <span className="mtext-101 cl2">Total:</span>
                    </div>
                    <div className="size-209 p-t-1">
                    <span className="mtext-110 cl2">
                      {new Intl.NumberFormat("ko-KR", {
                        style: "currency",
                        currency: "KRW",
                        maximumFractionDigits: 0,
                      }).format(finalPrice)}
                    </span>
                    </div>
                  </div>

                  <button
                      className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer"
                      onClick={handlePayment} // onClick 이벤트에 handlePayment 연결
                  >
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
