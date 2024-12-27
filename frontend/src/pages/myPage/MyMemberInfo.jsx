import React, { useEffect, useState } from 'react';
import { call } from '../../api/auth/ApiService'; // useUser 훅 임포트
import { useUser } from '../../api/auth/UserContext'; // useUser 훅 임포트
import MyPageHeader from '../../components/myPage/MyPageHeader';

import DaumPostcode from 'react-daum-postcode'; // Kakao 우편번호 API 사용

const MemberInfo = () => {
  const [representativeAddress, setRepresentativeAddress] = useState(null);
  const [generalAddresses, setGeneralAddresses] = useState([]);
  const { user, setUser } = useUser(); // UserContext에서 user와 setUser를 가져오기
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false); // 우편번호 검색 모달 상태
  const [address, setAddress] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');
  const closePostcode = () => setIsPostcodeOpen(false);

  // 모달 열기/닫기
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openPostcode = () => setIsPostcodeOpen(true);
  const [bodyInfo, setBodyInfo] = useState({
    height: user?.height || '',
    weight: user?.weight || '',
    size: user?.size || '',
    isReleased: Boolean(user?.isReleased), // 숫자를 불리언으로 변환
  });

  const [addInfo, setAddInfo] = useState({
    name: '',
    phone1: '',
    phone2: '',
    phone3: '',
    style: '',
    introduction: '',
  });

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handleChangeAddInfo = (e) => {
    const { name, value } = e.target;
    // 숫자만 허용
    if (name.startsWith('phone') && !/^\d*$/.test(value)) return;

    if (value.length <= 200) {
      setAddInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // 우편번호 검색 완료 처리
  const handleCompletePostcode = (data) => {
    setAddress(data.address); // 검색된 주소를 상태에 설정
    closePostcode(); // 우편번호 검색 창 닫기
  };

  const MultiFormHandler = async (e) => {
    e.preventDefault(); // 기본 동작 막기
    const formName = e.currentTarget.getAttribute('data-name');
    const formData = new FormData(e.target); // 해당 폼 데이터 수집
    const data = Object.fromEntries(formData.entries()); // 폼 데이터를 객체로 변환
    console.log('폼이 제출되었습니다:', formName); // 확인
    if (formName === 'changePwd') {
      const password = data.password;
      const confirmPassword = data.confirmPassword;

      // 비밀번호 일치 확인
      if (password !== confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
      // 비밀번호 입력값이 비어 있는 경우 처리
      if (!password || !confirmPassword) {
        alert('비밀번호와 비밀번호 확인을 모두 입력해주세요.');
        return;
      }

      try {
        const response = await call('/mypage/changePwd', 'PUT', {
          password,
        });

        if (response.status === 'success') {
          alert(response.message); // "비밀번호가 성공적으로 변경되었습니다."
          setPassword(''); // 상태 초기화 -> 입력 칸 비움
          setConfirmPassword('');
        } else {
          alert('비밀번호 변경에 실패하였습니다.');
        }
      } catch (error) {
        console.error('비밀번호 변경 중 에러:', error);
        alert('비밀번호 변경에 실패하였습니다.');
      }
    }

    if (formName === 'changebodyInfo') {
      try {
        const response = await call('/mypage/changeBodyInfo', 'PUT', {
          height: bodyInfo.height,
          weight: bodyInfo.weight,
          size: bodyInfo.size,
          isReleased: bodyInfo.isReleased,
        });

        if (response.status === 'success') {
          alert(response.message);
        } else {
          alert('오류가 발생하였습니다. 재시도해주세요.');
        }
      } catch (error) {
        alert('오류가 발생하였습니다. 재시도해주세요.');
      }
    }

    if (formName === 'addInfo') {
      console.log('현재 상태:', addInfo); // 상태 값 확인

      const password = data.password?.trim(); // 입력값 가져오기
      const confirmPassword = data.confirmPassword?.trim(); // 입력값 가져오기

      try {
        const response = await call(`/mypage/changeAddInfo`, 'PUT', {
          name: addInfo.name,
          phone: addInfo.phone1 + addInfo.phone2 + addInfo.phone3,
          style: addInfo.style,
          introduction: addInfo.introduction,
        });

        if (response.status === 'success') {
          alert(response.message); // 성공 메시지
        } else {
          alert('오류가 발생하였습니다. 재시도해주세요.');
        }
      } catch (error) {
        console.error('API 호출 에러:', error);
        alert('회원정보 수정에 문제가 발생하였습니다. 재시도해주세요.');
      }
    }
  };
  // 신체 정보 변경
  const changeBodyInfo = (e) => {
    const { name, value } = e.target;
    setBodyInfo((prev) => ({ ...prev, [name]: value }));
  };

  const fetchData = async () => {
    try {
      const address = await call(`/mypage/getAddress?userId=${user?.id}`);
      const representative = address.find((addr) => addr.isRepresent === true);
      const general = address.filter((addr) => addr.isRepresent !== true);

      setRepresentativeAddress(representative);
      setGeneralAddresses(general);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmitAddress = async (e) => {
    e.preventDefault();

    const fullAddress = `${address} ${detailedAddress}`;
    const data = { address: fullAddress };

    try {
      const response = await call('/mypage/addAddress', 'POST', data);

      if (response.status === 'success') {
        alert(response.message);
        setAddress('');
        setDetailedAddress('');
        fetchData();
        setIsPostcodeOpen(false);
        setIsModalOpen(false);
      } else if (response.status === 'error') {
        alert(response.message); // 에러 메시지 표시
        setAddress('');
        setDetailedAddress('');
        setIsPostcodeOpen(false);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('주소 등록 중 에러:', error);
      alert('서버 요청 중 문제가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setBodyInfo({
        height: user.height || '',
        weight: user.weight || '',
        size: user.size || '',
        isReleased: Boolean(user.isReleased), // 불리언 변환
      });
    }
  }, [user]);

  // user 변경 시 addInfo 상태 동기화
  useEffect(() => {
    if (user) {
      const phone = user?.phone?.replace(/-/g, '') || '';
      setAddInfo({
        name: user.name || '',
        phone1: phone.substring(0, 3) || '',
        phone2: phone.substring(3, 7) || '',
        phone3: phone.substring(7) || '',
        style: user.style || '',
        introduction: user.introduction || '',
      });
    }
  }, [user]);

  const switchRepresentativeAddress = async (id) => {
    try {
      await call(`/mypage/switchRepresentativeAddress/${id}`, 'PUT');
      alert('대표 주소지가 변경되었습니다.');
      fetchData(); // 데이터 새로고침
    } catch (error) {
      console.error('대표 주소지 변경 실패:', error);
      alert(error.message || '대표 주소지 변경 실패하였습니다.');
    }
  };

  // 대표 주소 삭제
  const DeleteRepresentativeAddress = async (id) => {
    if (generalAddresses.length === 0) {
      try {
        await call(`/mypage/deleteAddress/${id}`, 'DELETE');
        fetchData(); // 변경 후 데이터 다시 가져오기
      } catch (error) {
        console.error('Error deleting address:', error);
      }
    } else {
      alert(
        '대표 주소지는 일반 주소지가 없을 경우에만 삭제가 가능합니다.\n 대표 주소지를 다른 주소지로 변경 후 해당 주소를 삭제해주세요.'
      );
    }
  };

  // 일반 주소 삭제
  const DeleteGeneralAddress = (id) => {
    call(`/mypage/deleteAddress/${id}`, 'DELETE', { cache: 'no-store' })
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
        <MyPageHeader title="회원정보" description="회원정보 등록 및 수정">
          <div className="profile-circle"></div>
        </MyPageHeader>
      </div>
      <div className="mypage-label1">회원정보</div>
      <div className="memberInfo-rounded-box">
        <label className="info-label">* 필수정보 *</label>

        <form>
          <div className="d-flex flex-wrap justify-content-center align-items-center col-12">
            <div className="d-flex align-items-center mb-3 mb-md-0 me-md-1">
              <label
                className="form-label pe-3"
                style={{ whiteSpace: 'nowrap' }}
              >
                아이디
              </label>
              <input
                className="form-control"
                id="username"
                value={user?.username || ''}
                disabled
              />
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content-center align-items-center col-12">
            <div className="d-flex align-itefms-center mt-3 mb-3 mb-md-0 me-md-1">
              <label
                className="form-label pe-3"
                style={{ whiteSpace: 'nowrap' }}
              >
                닉네임
              </label>
              <input
                className="form-control"
                id="nickname"
                value={user?.nickname || ''}
                disabled
              />
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content-center align-items-center col-12">
            <div className="d-flex align-items-center mt-3 mb-3 mb-md-0 me-md-3">
              <label
                className="form-label pe-3"
                style={{ whiteSpace: 'nowrap' }}
              >
                생년월일
              </label>
              <input
                className="form-control"
                id="birth"
                value={user?.birth || ''}
                disabled
              />
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content-center align-items-center col-12">
            <div className="d-flex align-items-center mt-3 mb-3  mb-md-0 me-md-1">
              <label
                className="form-label"
                style={{ whiteSpace: 'nowrap', marginRight: '10px' }} // 간격 조정
              >
                이메일
              </label>
              <input
                className="form-control"
                id="email"
                value={user?.email || ''}
                disabled
                style={{ width: '230px' }} // 입력 칸 크기 설정
              />
            </div>
          </div>
        </form>
        <form data-name="changePwd" onSubmit={MultiFormHandler}>
          <hr className="my-4" />
          <div className="container">
            <label className="info-label mb-3">비밀번호 변경</label>
            <div className="row justify-content-center">
              <div className="col-12 col-md-5 d-flex align-items-center mb-3 mb-md-0">
                <input
                  className="form-control"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="비밀번호"
                  value={password} // 상태 연결
                  onChange={handlePasswordChange} // 상태 업데이트
                />
              </div>
              <div className="col-12 col-md-5 d-flex align-items-center">
                <input
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="비밀번호 확인"
                  value={confirmPassword} // 상태 연결
                  onChange={handleConfirmPasswordChange} // 상태 업데이트
                />
              </div>
            </div>
          </div>
          <button type="submit" className="mypage-button mt-3">
            변경
          </button>
        </form>
        <form data-name="changebodyInfo" onSubmit={MultiFormHandler}>
          <hr className="my-4" />
          <div className="container text-center">
            <label className="info-label mb-3">신체정보 공개여부</label>
            <div className="row justify-content-center align-items-center mb-4">
              <div className="col-12 col-md-4 d-flex justify-content-center align-items-center mb-2">
                <span className="me-2">키</span>
                <input
                  className="form-control text-center"
                  type="number"
                  name="height"
                  value={bodyInfo.height}
                  onChange={changeBodyInfo}
                  maxLength="3"
                  style={{ width: '80px' }}
                />
                <span className="ms-2">cm</span>
              </div>
              <div className="col-12 col-md-4 d-flex justify-content-center align-items-center mb-2">
                <span className="me-2">체중</span>
                <input
                  className="form-control text-center"
                  name="weight"
                  value={bodyInfo.weight}
                  onChange={changeBodyInfo}
                  maxLength="3"
                  style={{ width: '80px' }}
                />
                <span className="ms-2">kg</span>
              </div>
              <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
                <span className="me-2">평소사이즈</span>
                <select
                  name="size"
                  value={bodyInfo.size}
                  onChange={changeBodyInfo}
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
                  checked={bodyInfo.isReleased}
                  onChange={(e) =>
                    setBodyInfo((prev) => ({
                      ...prev,
                      isReleased: e.target.checked, // 체크박스 상태값 반영
                    }))
                  }
                />

                <label className="form-check-label ms-2" htmlFor="isReleased">
                  정보 제공에 동의합니다.
                </label>
              </div>
            </div>
            <button type="submit" className="mypage-button mt-3">
              저장
            </button>
          </div>
        </form>
        <form data-name="addInfo" onSubmit={MultiFormHandler}>
          <hr className="my-4" />
          <label className="info-label">추가정보</label>

          <div className="d-flex flex-wrap justify-content-center align-items-center col-12">
            <div className="d-flex align-items-center mb-3 mb-md-0 me-md-1">
              <label
                className="form-label pe-3"
                style={{ whiteSpace: 'nowrap' }}
              >
                이름
              </label>
              <input
                className="form-control"
                id="name"
                name="name"
                style={{ width: '120px' }}
                value={addInfo.name}
                onChange={handleChangeAddInfo}
              />
            </div>
          </div>
          <label className="form-label mt-4 text-center w-1 00">
            휴대폰번호
          </label>

          <div className="d-flex justify-content-center align-items-center">
            <input
              className="form-control text-center mx-1"
              id="phone1"
              name="phone1"
              maxLength="3"
              placeholder="010"
              value={addInfo.phone1}
              onChange={handleChangeAddInfo}
              style={{ width: '60px' }}
            />
            <span className="mx-1">-</span>
            <input
              className="form-control text-center mx-1"
              id="phone2"
              name="phone2"
              value={addInfo.phone2}
              onChange={handleChangeAddInfo}
              maxLength="4"
              style={{ width: '70px' }}
            />
            <span className="mx-1">-</span>
            <input
              className="form-control text-center mx-1"
              id="phone3"
              name="phone3"
              maxLength="4"
              value={addInfo.phone3}
              onChange={handleChangeAddInfo}
              style={{ width: '70px' }}
            />
          </div>
          <div className="d-flex flex-wrap justify-content-center align-items-center col-12 mt-4">
            <span className="me-2">선호 스타일</span>
            <select
              name="style"
              value={addInfo.style} // 상태 연결
              onChange={handleChangeAddInfo} // 상태 업데이트
              className="form-select text-center"
              style={{ width: '120px' }}
            >
              <option>데일리</option>
              <option>캐주얼</option>
              <option>포멀</option>
              <option>스트릿</option>
              <option>빈티지</option>
            </select>
          </div>

          <div>
            <label htmlFor="exampleTextarea" className="form-label mt-4">
              소개글
            </label>
            <textarea
              className="form-control"
              name="introduction"
              value={addInfo.introduction} // 상태 연결
              onChange={handleChangeAddInfo} // 상태 업데이트
              rows="3"
              placeholder="200자 이내로 작성해주세요."
            ></textarea>
          </div>
          <button type="submit" className="mypage-button mt-3">
            저장
          </button>
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
          <div className="address-buttons">
            <button className="delivery-button" onClick={openModal}>
              배송지 등록하기
            </button>
          </div>
        </div>
      </div>
      {/* 배송지 등록 모달 */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>배송지 입력</h2>
            <form onSubmit={handleSubmitAddress}>
              <label htmlFor="address">
                하단 우편번호 검색으로 주소를 입력해주세요.
              </label>
              <button
                type="button"
                className="postcode-button"
                onClick={openPostcode}
              >
                우편번호 검색
              </button>
              <input
                id="address"
                type="text"
                value={address}
                placeholder="우편번호 검색을 하면 주소가 입력됩니다."
                className="address-input"
                readOnly
              />

              <input
                id="detailedAddress"
                type="text"
                value={detailedAddress}
                placeholder="상세주소를 입력하세요"
                onChange={(e) => setDetailedAddress(e.target.value)}
                className="address-input"
              />
              <div className="modal-actions">
                <button type="submit" className="submit-button">
                  등록
                </button>
                <button
                  type="button"
                  className="close-button"
                  onClick={closeModal}
                >
                  닫기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 우편번호 검색 모달 */}
      {isPostcodeOpen && (
        <div className="postcode-modal">
          <DaumPostcode
            onComplete={handleCompletePostcode}
            style={{ width: '100%', height: '300px' }}
          />
          <button className="postcode-close-button" onClick={closePostcode}>
            닫기
          </button>
        </div>
      )}
    </div>
  );
};

export default MemberInfo;
