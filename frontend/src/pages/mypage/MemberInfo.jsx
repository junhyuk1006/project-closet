import React, { useState, useEffect } from 'react';
import MyPageHeader from '../../components/myPage/MyPageHeader';

const MemberInfo = () => {
  const [address, setAddress] = useState([]);

  return (
    <div>
      <div>
        <MyPageHeader title="회원정보" description="회원정보 등록 및 수정" />
      </div>
      <div className="inquirement-label">회원정보</div>
      <div className="rounded-box"></div>
      <div className="inquirement-label">배송지 관리</div>
      <div className="rounded-box">
        <div className="represent-address">대표</div>
        <div className="other-address">상세주소</div>
        <div className="address-buttons">
          <button>수정</button>
          <button>삭제</button>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;
