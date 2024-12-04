import React from 'react';
import MyPageHeader from '../../components/myPage/MyPageHeader';
import '../../assets/styles/MyPage/MyPage.css';

const MyInquirement = () => {
  return (
    <div>
      <div>
        <MyPageHeader
          title="문의내역"
          description="내가 문의한 내역을 조회할 수 있습니다."
        />
      </div>
      <div className="inquirement-label">상품문의</div>
      <div className="rounded-box">컨텐츠</div>
    </div>
  );
};

export default MyInquirement;
