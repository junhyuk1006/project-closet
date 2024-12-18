import React, { useState, useEffect } from 'react';
import MyPageHeader from '../../components/myPage/MyPageHeader';
import { call } from '../../api/auth/ApiService'; // useUser 훅 임포트
import '../../assets/styles/myPage/MyPage.css';
import '../../assets/styles/detailItem/ReviewInput.css';
const MyInquirement = () => {
  return (
    <div>
      <div>
        <MyPageHeader
          title="문의 내역"
          description="내가 등록한 모든 문의 내역을 조회할 수 있습니다."
        />
      </div>

      <div className="inquiry-rounded-box"></div>
    </div>
  );
};

export default MyInquirement;
