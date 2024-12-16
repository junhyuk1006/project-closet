import React, { useRef, useState } from 'react';
import '../../components/SignUp';
import '../../assets/styles/auth/signup.css';
import closetImage from '../../assets/closet.png'; // 이미지 경로를 import
import { useNavigate } from 'react-router-dom';
import { sendCode, verifyCode } from '../../api/auth/ApiService';

const Checkout = () => {
  const formRef = useRef(null); // 폼 참조
  const navigate = useNavigate(); // 페이지 네비게이션 훅

  const [isSubmitting, setIsSumitting] = useState(false); // 제출상태 관리
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 성공 여부
  const [verificationCode, setVerificationCode] = useState(''); // 인증 코드 입력 필드 상태
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증 코드 전송 여부

  // 이메일 인증 코드 전송
  const handleSendCode = async () => {
    const email = formRef.current.email.value;

    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    try {
      await sendCode(email); // 인증 코드 전송 API 호출
      alert('인증 코드가 이메일로 전송되었습니다.');
      setIsCodeSent(true);
    } catch (error) {
      console.error('인증 코드 전송 실패:', error);
      alert('인증 코드 전송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 이메일 인증 코드 확인
  const handleVerifyCode = async () => {
    const email = formRef.current.email.value.trim(); // 이메일 값 공백 제거
    const code = verificationCode?.trim(); // 입력된 인증 코드 공백 제거

    console.log('전송할 이메일:', email);
    console.log('전송할 인증 코드:', code);

    // 입력값 유효성 검사
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }
    if (!code) {
      alert('인증 코드를 입력해주세요.');
      return;
    }

    try {
      // 이메일 인증 코드 검증 API 호출
      const response = await verifyCode(email, code);
      console.log('이메일 인증 성공:', response);

      alert('이메일 인증에 성공했습니다.');
      setIsEmailVerified(true); // 인증 성공 상태 업데이트
    } catch (error) {
      console.error('이메일 인증 실패:', error);

      // 오류 메시지에 따라 처리
      if (error.message) {
        alert(`이메일 인증 실패: ${error.message}`);
      } else {
        alert('이메일 인증에 실패했습니다. 인증 코드를 다시 확인해주세요.');
      }
    }
  };

  // 회원가입 제출 처리
  const handleSubmit = async (event) => {
    event.preventDefault(); // 기본 동작 중단
    event.stopPropagation(); // 이벤트 전파 중단

    if (!isEmailVerified) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }

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
      form.confirmPassword.classList.add('is-invalid');
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
    }
  };

  return (
    <div className="signup-container col-6">
      <div className="py-5 text-center">
        <img
          className="d-block mx-auto mb-4"
          src={closetImage}
          alt="Bootstrap Logo"
          width="360"
          height="160"
        />
      </div>
      <form
        ref={formRef}
        className="needs-validation"
        noValidate
        onSubmit={handleSubmit} // 제출 이벤트 연결
      >
        <div className="row g-3">
          <div className="col-12">
            <label htmlFor="username" className="form-label">
              아이디
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="ID"
              required
            />
            <div className="invalid-feedback">아이디를 입력해주세요.</div>
          </div>

          <div className="col-6">
            <label htmlFor="password" className="form-label">
              비밀번호
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              required
            />
            <div className="invalid-feedback">비밀번호를 입력해주세요.</div>
          </div>

          <div className="col-6">
            <label htmlFor="confirmPassword" className="form-label">
              비밀번호 확인
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Password"
              required
            />
            <div className="invalid-feedback">비밀번호를 확인해주세요.</div>
          </div>

          <div className="col-12">
            <label htmlFor="nickname" className="form-label">
              닉네임
            </label>
            <div className="input-group has-validation">
              <input
                type="text"
                className="form-control"
                id="nickname"
                name="nickname"
                placeholder="닉네임"
                required
              />
              <div className="invalid-feedback">닉네임을 입력해주세요.</div>
            </div>
          </div>

          <div className="col-12">
            <label htmlFor="email" className="form-label">
              이메일
            </label>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="you@example.com"
                required
              />
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleSendCode}
                disabled={isCodeSent} // 인증 코드 전송 후 비활성화
              >
                인증 코드 전송
              </button>
            </div>
            <div className="invalid-feedback">
              유효한 이메일 주소를 입력해주세요.
            </div>
          </div>

          {isCodeSent && (
            <div className="col-12 mt-2">
              <label htmlFor="verificationCode" className="form-label">
                인증 코드
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="verificationCode"
                  placeholder="인증 코드를 입력하세요"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={handleVerifyCode}
                  disabled={isEmailVerified} // 인증 성공 후 비활성화
                >
                  인증 확인
                </button>
              </div>
              {isEmailVerified && (
                <div className="text-success mt-2">
                  이메일 인증에 성공했습니다!
                </div>
              )}
            </div>
          )}

          <div className="col-md-4">
            <label htmlFor="birthYear" className="form-label">
              출생연도
            </label>
            <select className="form-select" id="birthYear" required>
              <option value="">연도 선택</option>
              {Array.from({ length: 100 }, (_, index) => {
                const year = new Date().getFullYear() - index; // 현재 연도 기준으로 100년 전까지
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
            <div className="invalid-feedback">
              올바른 출생연도를 선택해주세요.
            </div>
          </div>

          <div className="col-md-4">
            <label htmlFor="birthMonth" className="form-label">
              월
            </label>
            <select className="form-select" id="birthMonth" required>
              <option value="">월 선택</option>
              {Array.from({ length: 12 }, (_, index) => {
                const month = index + 1; // 1~12월
                return (
                  <option key={month} value={month}>
                    {month}월
                  </option>
                );
              })}
            </select>
            <div className="invalid-feedback">올바른 월을 선택해주세요.</div>
          </div>

          <div className="col-md-4">
            <label htmlFor="birthDay" className="form-label">
              일
            </label>
            <input
              type="number"
              className="form-control"
              id="birthDay"
              placeholder="1~31"
              min="1"
              max="31"
              required
            />
            <div className="invalid-feedback">올바른 일을 입력해주세요.</div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="privacy"
            required
          />
          <label className="form-check-label" htmlFor="privacy">
            [필수] 개인정보 수집 및 이용 동의
            <p className="mt-2">
              <strong>1. 수집 항목:</strong> 이름, 이메일, 생년월일
              <br />
              <strong>2. 수집 목적:</strong> 회원 관리, 서비스 제공, 고객 문의
              처리, 마케팅 및 이벤트 정보 제공
              <br />
              <strong>3. 보유기간:</strong> 회원 탈퇴 후 즉시 삭제 (단, 법령에
              따라 보관이 필요한 경우 제외)
            </p>
          </label>
          <div className="invalid-feedback">
            개인정보 수집 및 이용에 동의해주세요.
          </div>
        </div>

        <hr className="my-4" />

        <button
          className="w-100 btn btn-secondary btn-lg"
          type="submit"
          disabled={isSubmitting || !isEmailVerified} // 이메일 인증 미완료 시 비활성화
        >
          {isSubmitting ? '가입 중...' : '회원가입'}
        </button>
      </form>
      <div className="my-5 pt-5 text-body-secondary text-center text-small">
        <p className="mb-1">&copy; 2024 CLOSET</p>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="/privacy">개인정보처리방침</a>
          </li>
          <li className="list-inline-item">
            <a href="/guide">이용약관</a>
          </li>
          <li className="list-inline-item">
            <a href="#">고객센터</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Checkout;
