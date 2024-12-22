import React, { useState, useEffect } from 'react';
import { call } from '../../api/auth/ApiService';
import { useUser } from '../../api/auth/UserContext';

import MyPageHeader from '../../components/myPage/MyPageHeader';
import '../../assets/styles/myPage/MyPage.css';

const MyPurchaseHistory = () => {
  const { user } = useUser(); // 사용자 정보
  const [groupedPurchases, setGroupedPurchases] = useState([]); // 그룹화된 데이터 상태
  const [error, setError] = useState(null);

  // API 데이터 호출 및 그룹화
  const fetchPurchaseHistory = async () => {
    try {
      const response = await call('/mypage/getOrderInfo', 'GET');

      console.log('Raw response data:', response);

      const purchaseData = response?.data || []; // 데이터 추출
      if (!Array.isArray(purchaseData) || purchaseData.length === 0) {
        throw new Error('No purchase data available.');
      }

      // 그룹화 로직
      const grouped = purchaseData.reduce((acc, item) => {
        const {
          orderHistoryId,
          orderNumber,
          totalPaymentAmount,
          paymentStatus,
          paymentDate,
          deliveryNumber,
          deliveryStatus,
        } = item;

        if (!acc[orderHistoryId]) {
          acc[orderHistoryId] = {
            orderHistoryId,
            orderNumber,
            totalPaymentAmount,
            paymentStatus,
            paymentDate,
            deliveryNumber,
            deliveryStatus,
            orderDetails: [],
          };
        }

        acc[orderHistoryId].orderDetails.push({
          itemName: item.itemName,
          itemPrice: item.itemPrice,
          itemCount: item.itemCount,
          color: item.color,
          size: item.size,
        });

        return acc;
      }, {});

      setGroupedPurchases(Object.values(grouped)); // 객체 -> 배열 변환 후 상태 업데이트
      console.log('Grouped data:', Object.values(grouped));
    } catch (err) {
      console.error('Error fetching purchase history:', err);
      setError('구매 내역을 불러오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (user) fetchPurchaseHistory();
  }, [user]);

  // 렌더링
  return (
    <div>
      <MyPageHeader
        title="구매 내역 조회"
        description="적립금은 사이트 내에서 상품 구매 시 현금처럼 사용할 수 있습니다."
      />

      {error && <p className="error-message">{error}</p>}
      {groupedPurchases.length > 0 ? (
        groupedPurchases.map((purchase) => (
          <div className="purchase-rounded-box" key={purchase.orderHistoryId}>
            <div className="purchase-info">
              <div className="order-number-box">
                주문번호 : {purchase.orderNumber}
              </div>
              <div className="payment-status">
                {purchase.paymentStatus === 'COMPLETED'
                  ? '결제완료'
                  : purchase.paymentStatus}
              </div>
              <div className="delivery-status">{purchase.deliveryStatus}</div>
            </div>
            <div className="purchase-date">
              결제날짜: {purchase.paymentDate}
            </div>
            <h3>상품 목록:</h3>
            <ul>
              {purchase.orderDetails.map((item, idx) => (
                <li key={idx}>
                  {item.itemName} ({item.color}, {item.size}) - {item.itemCount}
                  개 - {item.itemPrice}원
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>구매 내역이 없습니다.</p>
      )}
    </div>
  );
};

export default MyPurchaseHistory;
