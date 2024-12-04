import React, { useState, useEffect } from 'react';
import MyPageHeader from '../../components/myPage/MyPageHeader';

const MemberInfo = () => {
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [addressResponse] = await Promise.all([
          fetch('http://localhost:80/api/mypage/getAddress?userId=1'),
        ]);

        const address = await addressResponse.json();

        setAddress(address);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <MyPageHeader title="회원정보" description="회원정보 등록 및 수정" />
      </div>
      <div className="inquirement-label">회원정보</div>
      <div className="rounded-box"></div>

      <div className="inquirement-label">배송지 관리</div>
      <div className="delivery-rounded-box">
        {address.map((address) => (
          <div key={address.id} className="address-block">
            <div className="represent-address">
              {address.isRepresent ? '대표' : '일반'}
            </div>
            <div className="other-address">{address.address}</div>
            <div className="address-buttons">
              <button>대표주소지 등록</button>
              <button>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberInfo;
