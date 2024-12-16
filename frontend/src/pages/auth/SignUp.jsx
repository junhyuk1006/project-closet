import React, { useRef, useState } from 'react';
import '../../components/SignUp';
import '../../assets/styles/auth/signup.css';
import closetImage from '../../assets/closet.png'; // 이미지 경로를 import
import { useNavigate } from 'react-router-dom';
import {
  sendCode,
  verifyCode,
  checkUsername,
  checkNickname,
  checkEmail,
  signup,
} from '../../api/auth/ApiService';

const Checkout = () => {
  const formRef = useRef(null); // 폼 참조
  const navigate = useNavigate(); // 페이지 네비게이션 훅

  const [isSubmitting, setIsSubmitting] = useState(false); // 제출상태 관리
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 성공 여부
  const [verificationCode, setVerificationCode] = useState(''); // 인증 코드 입력 필드 상태
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증 코드 전송 여부

  // 이메일 인증 코드 전송
  const handleSendCode = async () => {
    const email = formRef.current.email.value.trim();

    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    try {
      // 이메일 중복 검사
      const isAvailable = await checkEmail(email);
      if (!isAvailable) {
        alert('이미 사용 중인 이메일입니다.');
        return;
      }

      // 중복이 없을 경우 인증 코드 전송
      const result = await sendCode(email);
      console.log('인증 코드 전송 결과:', result); // 서버 응답 디버깅

      if (result && result.success) {
        alert(result.message || '인증 코드가 성공적으로 전송되었습니다.');
        setIsCodeSent(true);
      } else {
        alert('인증 코드 전송에 실패했습니다.');
      }
    } catch (error) {
      console.error('인증 코드 전송 중 오류 발생:', error);
      const errorMessage = error?.message || '알 수 없는 오류가 발생했습니다.';
      alert(errorMessage);
    }
  };

  // 이메일 인증 코드 확인
  const handleVerifyCode = async () => {
    const email = formRef.current.email.value.trim();
    const code = verificationCode.trim();

    if (!email || !code) {
      alert('이메일과 인증 코드를 입력해주세요.');
      return;
    }

    const result = await verifyCode(email, code);
    alert(result.message);

    if (result.success) {
      setIsEmailVerified(true);
    }
  };

  // 아이디 중복 확인
  const handleCheckUsername = async () => {
    const username = formRef.current.username.value.trim();

    if (!username) {
      alert('아이디를 입력해주세요.');
      return;
    }

    try {
      const isAvailable = await checkUsername(username); // 서버에서 true 또는 false 반환
      console.log('아이디 중복 검사 결과:', isAvailable); // 디버깅 로그
      if (isAvailable) {
        alert('사용 가능한 아이디입니다.');
      } else {
        alert('이미 사용 중인 아이디입니다.');
      }
    } catch (error) {
      console.error('아이디 중복 확인 오류:', error);
      alert('중복 확인 중 오류가 발생했습니다.');
    }
  };

  // 닉네임 중복 확인
  const handleCheckNickname = async () => {
    const nickname = formRef.current.nickname.value.trim();

    if (!nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    try {
      const isAvailable = await checkNickname(nickname); // 서버에서 true 또는 false 반환
      console.log('닉네임 중복 검사 결과:', isAvailable); // 디버깅 로그
      if (isAvailable) {
        alert('사용 가능한 닉네임입니다.');
      } else {
        alert('이미 사용 중인 닉네임입니다.');
      }
    } catch (error) {
      console.error('닉네임 중복 확인 오류:', error);
      alert('중복 확인 중 오류가 발생했습니다.');
    }
  };

  // 회원가입 제출
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isEmailVerified) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }

    const form = formRef.current;
    const birthYear = form.birthYear.value;
    const birthMonth = form.birthMonth.value.padStart(2, '0'); // 1~9월을 01~09로 패딩
    const birthDay = form.birthDay.value.padStart(2, '0'); // 1~9일을 01~09로 패딩
    const birth = `${birthYear}-${birthMonth}-${birthDay}`; // YYYY-MM-DD 형식으로 결합

    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      form.confirmPassword.classList.add('is-invalid');
      return;
    } else {
      form.confirmPassword.classList.remove('is-invalid');
    }

    const data = {
      username: form.username.value.trim(),
      password,
      nickname: form.nickname.value.trim(),
      email: form.email.value.trim(),
      birth,
    };

    setIsSubmitting(true);

    const result = await signup(data);
    alert(result.message);

    if (result.success) {
      navigate('/Login');
    }

    setIsSubmitting(false);
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
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="ID"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleCheckUsername}
              >
                중복 확인
              </button>
            </div>
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
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="nickname"
                  name="nickname"
                  placeholder="닉네임"
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleCheckNickname}
                >
                  중복 확인
                </button>
              </div>
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
                className="btn btn-outline-secondary"
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
