import React, { useState, useEffect } from 'react';
import MyPageHeader from '../../components/myPage/MyPageHeader';

const MemberInfo = () => {
  const [representativeAddress, setRepresentativeAddress] = useState(null);
  const [generalAddresses, setGeneralAddresses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const addressResponse = await fetch(
          'http://localhost:80/api/mypage/getAddress?userId=1'
        );

        const address = await addressResponse.json();

        const representative = address.find(
          (addr) => addr.isRepresent === true
        ); // 대표 주소

        const general = address.filter((addr) => addr.isRepresent !== true); // 일반 주소

        setRepresentativeAddress(representative);
        setGeneralAddresses(general);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  const DeleteRepresentativeAddress = (id) => {
    if (generalAddresses.length === 0) {
      // '==' 대신 '==='을 사용하는 것이 좋습니다.
      fetch(`http://localhost:80/api/mypage/deleteAddress/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            console.log('삭제 완료');
          } else {
            console.error('삭제 실패', response.status);
          }
        })
        .catch((error) => console.error('에러 발생:', error));
    } else {
      alert(
        '대표 주소지는 일반 주소지가 없을 경우에만 삭제가 가능합니다.\n 대표 주소지를 다른 주소지로 변경 후 해당 주소를 삭제해주세요.'
      );
    }
  };

  const DeleteGeneralAddress = (id) => {
    fetch(`http://localhost:80/api/mypage/deleteAddress/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('일반 주소 삭제 완료');
          // 삭제 성공 시 화면에서 제거 (state 업데이트)
          setGeneralAddresses((prevAddresses) =>
            prevAddresses.filter((address) => address.id !== id)
          );
        } else {
          console.error('일반 주소 삭제 실패');
        }
      })
      .catch((error) => console.error('삭제 요청 중 에러 발생:', error));
  };

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
                {representativeAddress?.address || '대표주소지가 없습니다.'}
              </div>
              <div className="address-buttons">
                <button
                  className="mypage-button"
                  onClick={() =>
                    DeleteRepresentativeAddress(representativeAddress?.id)
                  }
                >
                  삭제
                </button>
              </div>
            </div>

            {/* 일반 주소 */}
            {generalAddresses.map((address) => (
              <div key={address.id} className="address-block">
                <div className="represent-address">일반</div>
                <div className="other-address">{address.address}</div>
                <div className="address-buttons">
                  <button className="mypage-button">대표주소지 등록</button>
                  <button
                    className="mypage-button"
                    onClick={() => DeleteGeneralAddress(address?.id)}
                  >
                    삭제
                  </button>
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
