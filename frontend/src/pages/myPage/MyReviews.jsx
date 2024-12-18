import React from 'react';
import MyPageHeader from '../../components/myPage/MyPageHeader';
import Pagination from '../public/Pagination'; // 페이지네이션 컴포넌트

const MyReviews = () => {
  return (
    <div>
      <MyPageHeader
        title="나의 리뷰"
        description="내가 등록한 상품 리뷰를 수정 및 비활성화 할 수 있습니다.."
      />
      <div className="inquiry-rounded-box"></div>
    </div>
  );
};

export default MyReviews;
