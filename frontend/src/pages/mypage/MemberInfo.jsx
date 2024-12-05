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
      fetch(`http://localhost:80/api/mypage/deleteAddress/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // representativeAddress 는 단일 객체이므로 삭제 시 ,바로 null처리해서 상태 update하면 됨
            setRepresentativeAddress(null);
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
          // prevGeneralAddresses은 삭제 이전의 배열을 저장하고 있고 삭제하고자 한 id와 이전 배열id가 일치하지않아야만 setGeneralAddress에 저장
          // 삭제한 id가 2라면 이전 데이터에서 id가 2와 같은 데이터(삭제 요청된 데이터)만 빼고 prevGeneralAddresses에 담아서 출력.
          setGeneralAddresses((prevGeneralAddresses) =>
            prevGeneralAddresses.filter(
              (GeneralAddresses) => GeneralAddresses.id !== id
            )
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
            {/* 대표 주소 -> 단일 객체*/}
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

            {/* 일반 주소  -> 배열로 반환*/}
            {generalAddresses.map((generalAddresses) => (
              <div key={generalAddresses.id} className="address-block">
                <div className="represent-address">일반</div>
                <div className="other-address">{generalAddresses.address}</div>
                <div className="address-buttons">
                  <button className="mypage-button">대표주소지 등록</button>
                  <button
                    className="mypage-button"
                    onClick={() => DeleteGeneralAddress(generalAddresses?.id)}
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
