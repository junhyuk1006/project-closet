import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyPageHeader from '../../components/myPage/MyPageHeader';
import Pagination from '../public/Pagination'; // 분리된 Pagination 컴포넌트 임포트
import { call } from '../../api/auth/ApiService';
import { useUser } from '../../api/auth/UserContext';
import '../../assets/styles/myPage/MyPage.css';

const MyCoordination = () => {
  return (
    <div>
      <MyPageHeader
        title="나의 코디 조회"
        description="내가 예약한 코디 신청 정보를 알 수 있습니다."
      />{' '}
      <div className="mypage-label1">코디 예약 현황</div>
      <div className="coordi-rounded-box">아아</div>
    </div>
  );
};

export default MyCoordination;
