import React, { useEffect } from 'react';
import axios from 'axios';

const saveLog = (message) => {
  const logs = JSON.parse(localStorage.getItem('logs')) || [];
  logs.push(`${new Date().toLocaleString()}: ${message}`);
  localStorage.setItem('logs', JSON.stringify(logs));
};

function PaymentResult() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const resultCode = params.get('resultCode');
    const paymentId = params.get('paymentId');

    const merchantPayKey = localStorage.getItem('merchantPayKey');

    // 결제 성공 시 바로 주문 내역 저장 및 포인트 차감 진행
    if (resultCode === 'Success') {
      saveLog('결제 성공, 주문 내역 저장 및 포인트 차감 진행');

      const orderData = JSON.parse(localStorage.getItem('orderData'));
      const usePoints = localStorage.getItem('usePoints');

      // 포인트 차감 처리 후 주문 내역 저장
      if (
        usePoints &&
        parseInt(usePoints, 10) > 0 &&
        orderData &&
        orderData.userId
      ) {
        handlePointDeduction(orderData.userId, usePoints)
          .then(() => saveOrderProcess(orderData))
          .catch((err) => {
            saveLog(`포인트 차감 중 오류: ${err.message}`);
            alert('포인트 차감 중 오류가 발생했습니다.');
          });
      } else {
        // 포인트 사용 없거나 0 이하이거나 orderData가 없는 경우 주문 내역만 저장
        saveOrderProcess(orderData);
      }
    } else {
      saveLog('결제 실패 또는 resultCode가 없습니다.');
      alert('결제 실패! 다시 시도해 주세요.');
      window.location.href = '/'; // 실패 시 홈으로 이동
    }
  }, []);

  const saveOrderProcess = async (orderData) => {
    if (!orderData) {
      saveLog('orderData 없음: 주문 내역 저장 불가');
      alert('주문 정보가 없습니다. 다시 시도해 주세요.');
      window.location.href = '/';
      return;
    }

    const saveOrderResponse = await saveOrder(orderData);
    if (saveOrderResponse.success) {
      saveLog('주문 내역 저장 성공');

      // 주문 내역 저장 성공 시 장바구니 상태 변경 로직 추가
      // orderData.orderDetails에 장바구니 상품 정보가 있을 경우 이를 이용
      // 단, orderData에 basketId 정보가 없다면 백엔드 로직을 변경해서 basketId를 orderDetails에 포함시켜야 함
      // 여기서는 basketId 정보를 orderData에 담았다고 가정함.

      const basketIds = extractBasketIdsFromOrderData(orderData);
      console.log('basketIds: ', basketIds);
      if (basketIds.length > 0) {
        try {
          await updateBasketStatus(basketIds, 'paymented');
          saveLog('장바구니 상태 변경 완료');
        } catch (error) {
          saveLog(`장바구니 상태 변경 오류: ${error.message}`);
          console.error('장바구니 상태 변경 중 오류:', error);
        }
      }

      alert('결제가 성공적으로 완료되었습니다!');
      localStorage.removeItem('orderData');
      localStorage.removeItem('usePoints');
      localStorage.removeItem('merchantPayKey');
      window.location.href = '/'; // 주문 내역 저장 및 장바구니 상태 변경 후 홈으로 이동
    } else {
      saveLog('주문 내역 저장 실패');
      alert('주문 내역 저장에 실패했습니다.');
      window.location.href = '/';
    }
  };

  const handlePointDeduction = async (userId, points) => {
    try {
      const pointData = {
        userId,
        point: points,
        pointReason: '상품 구매',
        pointType: '차감',
        pointInsertType: 'purchase',
      };
      await axios.post(
        'http://localhost:8090/api/point/saveReviewPoint',
        pointData
      );
      saveLog(`포인트 ${points} 차감 성공`);
    } catch (error) {
      saveLog(`포인트 차감 실패: ${error.message}`);
      console.error('포인트 차감 중 오류 발생:', error);
      throw error;
    }
  };

  const saveOrder = async (orderData) => {
    try {
      const response = await axios.post(
        'http://localhost:8090/api/orders',
        orderData
      );
      return { success: true, data: response.data };
    } catch (error) {
      saveLog(`주문 저장 중 오류: ${error.message}`);
      console.error('주문 저장 중 오류:', error);
      return { success: false, error };
    }
  };

  const updateBasketStatus = async (basketIds, status) => {
    console.log('updateBasketStatus Start:  ', basketIds, status);

    try {
      const payload = { basketIds, status };
      const response = await axios.patch(
        'http://localhost:8090/api/basket/updateStatus',
        payload
      );
      if (response.data && response.data.success) {
        return true;
      } else {
        throw new Error('Failed to update basket status');
      }
    } catch (error) {
      throw error;
    }
  };

  const extractBasketIdsFromOrderData = (orderData) => {
    console.log('extractBasketIdsFromOrderData', orderData);
    // orderData.orderDetails에서 basketId를 추출하는 로직
    // orderData.orderDetails 각각의 객체에 basketId가 있다고 가정
    return orderData.orderDetails
      .filter((detail) => detail.basketId) // basketId가 있는 항목만
      .map((detail) => detail.basketId);
  };

  return <div>결제 결과를 처리 중입니다...</div>;
}

export default PaymentResult;
