import React, { useState, useEffect } from "react";
import PriceDisplay from "../../hooks/PriceDisplay";
import axios from "axios";
import ClearIcon from '@mui/icons-material/Clear';

// CSS Imports
import "../../assets/styles/components/main.css";
import "../../assets/styles/components/util.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "font-awesome/css/font-awesome.min.css";
import "material-design-iconic-font/dist/css/material-design-iconic-font.min.css";

// Hook Imports
import { useUser } from "../../api/auth/UserContext"; // 사용자 정보를 가져오는 Hook
import { useCart } from "../../api/basket/BasketContext"; // 장바구니 관련 상태 관리

function ShoppingCart() {
  const { user } = useUser(); // 사용자 정보 로드
  const { baskets, fetchBaskets, removeFromCart } = useCart(); // 장바구니 데이터 관리 및 삭제 함수
  const [quantities, setQuantities] = useState({}); // 각 제품의 수량 관리
  const [selectedItems, setSelectedItems] = useState({}); // 각 상품의 체크박스 상태 관리
  const [totalPoints, setTotalPoints] = useState(0); // 사용자 포인트
  const [usePoints, setUsePoints] = useState(""); // 사용할 포인트
  const [finalPrice, setFinalPrice] = useState(0); // 최종 결제 금액

  const userId = user?.id || "";

  useEffect(() => {
    if (userId) {
      fetchBaskets(userId);
      fetchTotalPoints();
    }
  }, [fetchBaskets, userId]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://nsp.pay.naver.com/sdk/js/naverpay.min.js";
    script.async = true;

    script.onload = () => {
      console.log("Naver Pay SDK loaded successfully");
      window.isNaverPayLoaded = true; // 로드 완료 상태를 설정
    };

    script.onerror = () => {
      console.error("Failed to load Naver Pay SDK");
    };

    document.body.appendChild(script);
  }, []);

  const fetchTotalPoints = async () => {
    try {
      const response = await axios.post("http://localhost:80/api/point/getTotalPointByUserid", {
        userId: user.id,
      });
      setTotalPoints(response.data);
    } catch (error) {
      console.error("Error fetching total points:", error);
    }
  };

  // 선택된 상품만 대상으로 서브토탈 계산
  const calculateSubtotal = () => {
    return baskets.reduce((total, item) => {
      if (selectedItems[item.basketId]) {
        return total + (quantities[item.basketId] || item.itemCount) * item.itemPrice;
      }
      return total;
    }, 0);
  };

  // 최종 결제 금액 계산
  useEffect(() => {
    const subtotal = calculateSubtotal();
    const pointsToUse = usePoints ? parseInt(usePoints, 10) : 0;
    setFinalPrice(Math.max(subtotal - pointsToUse, 0));
  }, [usePoints, baskets, quantities, selectedItems]);

  const calculatePointsEarned = () => {
    const earnedRate = 0.01; // 포인트 적립 비율 (1%)
    return Math.floor(finalPrice * earnedRate);
  };

  // 포인트 사용 입력 핸들러
  const handleUsePointsChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value === "") {
      setUsePoints("");
    } else {
      const subtotal = calculateSubtotal();
      const maxUsablePoints = Math.min(Math.floor(subtotal * 0.8), totalPoints);
      const validPoints = Math.min(parseInt(value, 10), maxUsablePoints);
      setUsePoints(validPoints.toString());
    }
  };

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (basketId) => {
    setSelectedItems((prevSelected) => ({
      ...prevSelected,
      [basketId]: !prevSelected[basketId],
    }));
  };

  // 장바구니 상품 삭제 핸들러
  const handleRemoveItem = async (basketId) => {
    if (!basketId) {
      console.error("basketId is undefined");
      return;
    }
    try {
      await removeFromCart(basketId);
      await fetchBaskets(user.id); // 삭제 후 장바구니 새로고침
      alert("Item removed successfully.");
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item. Please try again.");
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

      // 주문 데이터를 localStorage에 저장
      const orderHistoryDTO = createOrderHistoryDTO();
      localStorage.setItem("orderData", JSON.stringify(orderHistoryDTO));
      localStorage.setItem("usePoints", usePoints);

      const merchantPayKey = "20241215HvZTrw"; // 유니크한 주문 번호
      localStorage.setItem("merchantPayKey", merchantPayKey);

      oPay.open({
        merchantPayKey: merchantPayKey,
        productName: "장바구니 상품",
        productCount: "1",
        totalPayAmount: finalPrice,
        taxScopeAmount: finalPrice,
        taxExScopeAmount: "0",
        returnUrl: "http://localhost:3000/PaymentResult",
      });
    } else {
      console.error("Naver Pay SDK is not loaded.");
    }
  };

  // 주문 내역 생성 DTO 함수
  const createOrderHistoryDTO = () => {
    // 선택된 상품만 주문 내역에 포함
    const selectedOrderDetails = baskets
        .filter((item) => selectedItems[item.basketId])
        .map((item) => ({
          basketId: item.basketId,
          itemName: item.itemName,
          itemPrice: item.itemPrice,
          itemCount: quantities[item.basketId] || item.itemCount,
          color: item.color,
          size: item.size,
          itemMainImage: item.mainImage,
        }));

    return {
      userId: user.id,
      orderDetails: selectedOrderDetails,
      pointUsedAmount: usePoints || 0,
      totalPaymentAmount: baskets.reduce((total, item) => {
        if (selectedItems[item.basketId]) {
          return total + (quantities[item.basketId] || item.itemCount) * item.itemPrice;
        }
        return total;
      }, 0),
      finalPaymentAmount: finalPrice,
      paymentStatus: "COMPLETED",
      paymentMethod: "NAVER_PAY",
    };
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      // 선택된 상품이 하나도 없으면 결제 진행 불가
      const hasSelectedItems = baskets.some((item) => selectedItems[item.basketId]);
      if (!hasSelectedItems) {
        alert("결제할 상품을 선택해주세요.");
        return;
      }

      openNaverPay();
    } catch (error) {
      console.error("네이버페이 결제창 오류:", error);
      alert("결제창을 여는 중 문제가 발생했습니다.");
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
                        <th className="column-1" style={{ width: "50px", textAlign: "center" }}>
                          Select
                        </th>
                        <th className="column-1">Product</th>
                        <th className="column-2"></th>
                        <th className="column-3">Price</th>
                        <th className="column-4">Quantity</th>
                        <th className="column-5">Total</th>
                        <th className="column-6" style={{ width: "100px"}}>
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      {baskets
                          .filter(item => item.status === "active") // status가 active인 항목만 표시
                          .map((item) => (
                              <tr className="table_row" key={item.basketId}>
                                <td className="column-1" style={{ width: "50px", textAlign: "center" }}>
                                  <input
                                      type="checkbox"
                                      checked={!!selectedItems[item.basketId]}
                                      onChange={() => handleCheckboxChange(item.basketId)}
                                  />
                                </td>
                                <td className="column-1">
                                  <div className="how-itemcart1">
                                    <img src={`images/${item.mainImage}`} alt={item.itemName} />
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
                                        value={quantities[item.basketId] || item.itemCount}
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
                                      (quantities[item.basketId] || item.itemCount) * item.itemPrice
                                  )}
                                </td>
                                <td className="column-6" style={{ textAlign: "center" }}>
                                  <button
                                      className="btn-remove-item hov-cl1 trans-04"
                                      onClick={() => handleRemoveItem(item.basketId)}
                                      style={{ cursor: "pointer", border: "none", background: "none" }}
                                  >
                                    <ClearIcon/>
                                  </button>
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
                      }).format(calculateSubtotal())}
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
                          Math.min(Math.floor(calculateSubtotal() * 0.8), totalPoints)
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
                      onClick={handlePayment}
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