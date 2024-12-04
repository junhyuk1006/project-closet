import React, { useState, useEffect } from 'react';
import MyPageHeader from '../../components/myPage/MyPageHeader';

const MemberInfo = () => {
  const [representativeAddress, setRepresentativeAddress] = useState([]);
  const [generalAddresses, setGeneralAddresses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [addressResponse] = await Promise.all([
          fetch('http://localhost:80/api/mypage/getAddress?userId=1'),
        ]);

        const address = await addressResponse.json();

        const representative = address.find((addr) => addr.isRepresent === 1); // 대표 주소
        const general = address.filter((addr) => addr.isRepresent !== 1); // 일반 주소

        setRepresentativeAddress(representative);
        setGeneralAddresses(general);
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
      <div className="mypage-label1">회원정보</div>
      <div className="rounded-box"></div>

      <div className="mypage-label1">배송지 관리</div>

      <div className="delivery-rounded-box">
        {!representativeAddress && generalAddresses.length === 0 ? (
          <div className="mypage-label2">등록된 배송지가 없습니다.</div>
        ) : (
          <>
            {/* 대표 주소 */}
            <div className="address-block">
              <div className="represent-address">대표주소지</div>
              <div className="other-address">
                {representativeAddress.address}
              </div>
              <div className="address-buttons">
                <button>삭제</button>
              </div>
            </div>

            {/* 일반 주소 */}
            {generalAddresses.map((address) => (
              <div key={address.id} className="address-block">
                <div className="represent-address">일반</div>
                <div className="other-address">{address.address}</div>
                <div className="address-buttons">
                  <button>대표주소지 등록</button>
                  <button>삭제</button>
                </div>
              </div>
            ))}
          </>
        )}
        <div className="address-buttons">
          <button className="delivery-button">배송지 등록하기</button>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;
