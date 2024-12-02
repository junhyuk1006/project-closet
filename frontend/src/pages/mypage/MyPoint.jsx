// MyPoint.jsx
import React from 'react';
import MyPageHeader from '../../components/myPage/MyPageHeader';
import '../../assets/styles/MyPage/MyPage.css';
const MyPoint = () => {
    return (
        <div className="roboto-thin">
            <MyPageHeader title="적립금 조회" description="내 적립금을 확인하세요." />

            <div>
                <div className="mypage-line"></div>
            </div>
        </div>
    );
};

export default MyPoint;