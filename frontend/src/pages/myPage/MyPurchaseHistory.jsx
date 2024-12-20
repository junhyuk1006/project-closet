import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyPageHeader from '../../components/myPage/MyPageHeader';
import Pagination from '../public/Pagination'; // 분리된 Pagination 컴포넌트 임포트
import { call } from '../../api/auth/ApiService';
import { useUser } from '../../api/auth/UserContext';
import '../../assets/styles/myPage/MyPage.css';

const MyPurchaseHistory = () => {
  return (
    <div>
      <MyPageHeader title="구매내역 조회" description="구매내역" />

      <div className="mypage-label1">회원정보</div>
    </div>
  );
};

export default MyPurchaseHistory;
