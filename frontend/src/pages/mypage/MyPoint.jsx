// MyPoint.jsx
import React from 'react';
import MyPageHeader from '../../components/myPage/MyPageHeader';
import '../../assets/styles/MyPage/MyPage.css';
const MyPoint = () => {
  return (
    <div>
      <MyPageHeader title="적립금 조회" description="내 적립금을 확인하세요." />
      <div className="point-label">나의 적립금 : </div>
      <div className="point-label">소멸예정 적립금 : </div>
      <div className="mypage-line" />
      <div className="point-list">
        <div className="point-item">
          <div className="point-info">
            <div className="date">2023.01.04</div>
            <div className="description">CJ ONE</div>
          </div>
          <div className="points">+2P</div>
        </div>
      </div>

      <div className="mypage-line" />
    </div>
  );
};

export default MyPoint;
