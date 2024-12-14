import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { call } from '../../api/auth/ApiService'; // useUser 훅 임포트
import { useUser } from '../../api/auth/UserContext'; // useUser 훅 임포트
import MyPageHeader from '../../components/myPage/MyPageHeader';

const MemberInfo = () => {
  const navigate = useNavigate();
  const [representativeAddress, setRepresentativeAddress] = useState(null);
  const [generalAddresses, setGeneralAddresses] = useState([]);
  const { user, setUser } = useUser(); // UserContext에서 user와 setUser를 가져오기
  const [isSubmitting, setIsSumitting] = useState(false); // 제출상태 관리
  const formRef = useRef(null); // 폼 참조

  const handleSubmit = async (event) => {
    event.preventDefault(); // 기본 동작 중단
    event.stopPropagation(); // 이벤트 전파 중단

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // 생년월일 처리
    const birthYear = form.birthYear.value;
    const birthMonth = form.birthMonth.value.padStart(2, '0'); // 1~9월을 01~09로 패딩
    const birthDay = form.birthDay.value.padStart(2, '0'); // 1~9일을 01~09로 패딩
    const birth = `${birthYear}-${birthMonth}-${birthDay}`; // YYYY-MM-DD 형식으로 결합

    // 비밀번호 확인
    if (data.password != form.confirmPassword.value) {
      alert('비밀번호가 일치하지 않습니다.');
      form.confirmPassword.classList.add('is-invaild');
      return;
    } else {
      form.confirmPassword.classList.remove('is-invalid');
    }

    if (form.checkValidity()) {
      setIsSumitting(true); // 제출시작

      try {
        // 회원가입 API 호출
        const response = await fetch('http://localhost:80/api/auth/signup', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: data.username,
            password: data.password,
            nickname: data.nickname,
            email: data.email,
            birth,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || '회원가입에 실패했습니다.');
        }

        const result = await response.json();
        alert('회원가입에 성공했습니다! 로그인페이지로 이동합니다.');
        navigate('/Login'); // 로그인 페이지로 이동
      } catch (error) {
        console.error('회원가입 실패:', error);
        alert(error.message);
      } finally {
        setIsSumitting(false); // 제출 종료
      }
    } else {
      form.classList.add('was-validated'); // 유효성 검사 스타일 추가
      alert('모든 필드를 올바르게 입력해주세요.');
      console.log('유효성 검사 실패');
    }
  };

  const fetchData = async () => {
    try {
      const address = await call(
        `/api/mypage/getAddress?userId=${user.id}`,
        'GET'
      );
      const representative = address.find((addr) => addr.isRepresent === true);
      const general = address.filter((addr) => addr.isRepresent !== true);

      setRepresentativeAddress(representative);
      setGeneralAddresses(general);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const switchRepresentativeAddress = async (id) => {
    try {
      await call(`/api/mypage/switchRepresentativeAddress/${id}`, 'PUT');
      alert('대표 주소지가 변경되었습니다.');
      fetchData(); // 데이터 새로고침
    } catch (error) {
      console.error('대표 주소지 변경 실패:', error);
      alert(error.message || '대표 주소지 변경 실패하였습니다.');
    }
  };

  // 대표 주소 삭제
  const DeleteRepresentativeAddress = (id) => {
    if (generalAddresses.length === 0) {
      fetch(`http://localhost:80/api/mypage/deleteAddress/${id}`, {
        method: 'DELETE',
        cache: 'no-store',
      })
        .then((response) => {
          if (response.ok) {
            fetchData(); // 변경 후 데이터를 다시 가져와 상태 업데이트
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

  // 일반 주소 삭제
  const DeleteGeneralAddress = (id) => {
    fetch(`http://localhost:80/api/mypage/deleteAddress/${id}`, {
      method: 'DELETE',
      cache: 'no-store',
    })
      .then((response) => {
        if (response.ok) {
          fetchData(); // 변경 후 데이터를 다시 가져와 상태 업데이트
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
      <div className="memberInfo-rounded-box">
        <form
          ref={formRef}
          className="needs-validation"
          noValidate
          onSubmit={handleSubmit} // 제출 이벤트 연결
        >
          <label className="info-label">* 필수정보 *</label>
          <label className="form-label mt-4 ">아이디</label>
          <div className="d-flex justify-content-center col-12 ">
            <input
              className="form-control w-50"
              id="name"
              value={user.username}
              readOnly
            />
          </div>
          <label className="form-label mt-4 ">아이디</label>
          <div className="d-flex justify-content-center col-12 ">
            <input
              className="form-control w-50"
              id="name"
              value={user.username}
            />
          </div>

          <label className="form-label mt-4 ">나이</label>
          <div className="d-flex justify-content-center col-12 ">
            <input
              className="form-control text-center"
              id="name"
              style={{ width: '150px' }}
            />
          </div>
          <label className="form-label mt-4 ">이름</label>
          <div className="d-flex justify-content-center col-12 ">
            <input className="form-control w-50" id="name" placeholder="이름" />
          </div>
          <label className="form-label mt-4 ">이름</label>
          <div className="d-flex justify-content-center col-12 ">
            <input className="form-control w-50" id="name" placeholder="이름" />
          </div>
          <hr className="my-4" />
          <div className="container">
            <label className="info-label mb-3">비밀번호 변경</label>
            <div className="row justify-content-center">
              <div className="col-12 col-md-5 d-flex align-items-center mb-3 mb-md-0">
                <input
                  className="form-control"
                  id="password"
                  type="password"
                  placeholder="비밀번호"
                />
              </div>
              <div className="col-12 col-md-5 d-flex align-items-center">
                <input
                  className="form-control"
                  id="confirmPassword"
                  type="password"
                  placeholder="비밀번호 확인"
                />
              </div>
            </div>
          </div>

          <hr className="my-4" />
          <div className="container text-center">
            <label className="info-label mb-3">신체정보 공개여부</label>
            <div className="row justify-content-center align-items-center mb-4">
              <div className="col-12 col-md-4 d-flex justify-content-center align-items-center mb-2">
                <span className="me-2">키</span>
                <input
                  className="form-control text-center"
                  id="height"
                  maxLength="3"
                  style={{ width: '80px' }}
                />
                <span className="ms-2">cm</span>
              </div>
              <div className="col-12 col-md-4 d-flex justify-content-center align-items-center mb-2">
                <span className="me-2">체중</span>
                <input
                  className="form-control text-center"
                  id="weight"
                  maxLength="3"
                  style={{ width: '80px' }}
                />
                <span className="ms-2">kg</span>
              </div>
              <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
                <span className="me-2">평소사이즈</span>
                <select
                  className="form-select text-center"
                  style={{ width: '80px' }}
                >
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                </select>
              </div>
            </div>
            <div className="form-check d-flex justify-content-center align-items-center flex-column">
              <div className="d-flex justify-content-center align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isReleased"
                  required
                />
                <label className="form-check-label ms-2" htmlFor="isReleased">
                  정보 제공에 동의합니다.
                </label>
              </div>
            </div>
          </div>

          <hr className="my-4" />
          <label className="info-label">추가정보</label>
          <label className="form-label mt-4 ">이름</label>
          <div className="d-flex justify-content-center col-12 ">
            <input className="form-control w-50" id="name" placeholder="이름" />
          </div>
          <label className="form-label mt-4 text-center w-100">
            휴대폰번호
          </label>

          <div className="d-flex justify-content-center align-items-center">
            <input
              className="form-control text-center mx-1"
              id="phone1"
              maxLength="3"
              placeholder="010"
              style={{ width: '60px' }}
            />
            <span className="mx-1">-</span>
            <input
              className="form-control text-center mx-1"
              id="phone2"
              maxLength="4"
              placeholder="1234"
              style={{ width: '70px' }}
            />
            <span className="mx-1">-</span>
            <input
              className="form-control text-center mx-1"
              id="phone3"
              maxLength="4"
              placeholder="5678"
              style={{ width: '70px' }}
            />
          </div>
          <label className="form-label mt-4 ">나이</label>
          <div className="d-flex justify-content-center col-12 ">
            <input
              className="form-control text-center"
              id="name"
              placeholder="이름"
              style={{ width: '150px' }}
            />
          </div>
          <label className="form-label mt-4 ">이름</label>
          <div className="d-flex justify-content-center col-12 ">
            <input className="form-control w-50" id="name" placeholder="이름" />
          </div>
          <label className="form-label mt-4 ">이름</label>
          <div className="d-flex justify-content-center col-12 ">
            <input className="form-control w-50" id="name" placeholder="이름" />
          </div>
        </form>
      </div>

      <div className="mypage-label1">배송지 관리</div>

      <div className="delivery-rounded-box">
        {!representativeAddress && generalAddresses.length === 0 ? (
          <div className="mypage-label2">등록된 배송지가 없습니다.</div>
        ) : (
          <>
            {/* 대표 주소 -> 단일 객체 */}
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

            {/* 일반 주소 -> 배열로 반환 */}
            {generalAddresses.map((address) => (
              <div key={address.id} className="address-block">
                <div className="represent-address">일반</div>
                <div className="other-address">{address.address}</div>
                <div className="address-buttons">
                  <button
                    className="mypage-button"
                    onClick={() => switchRepresentativeAddress(address.id)}
                  >
                    대표주소지 변경
                  </button>
                  <button
                    className="mypage-button"
                    onClick={() => DeleteGeneralAddress(address.id)}
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
