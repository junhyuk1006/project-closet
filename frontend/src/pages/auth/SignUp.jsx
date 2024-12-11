import React, { useRef, useState } from 'react';
import '../../components/SignUp';
import '../../assets/styles/auth/signup.css';
import closetImage from '../../assets/closet.png'; // 이미지 경로를 import
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const formRef = useRef(null); // 폼 참조
  const navigate = useNavigate(); // 페이지 네비게이션 훅
  const [isSubmitting, setIsSumitting] = useState(false); // 제출상태 관리

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

  return (
    // 부트스트랩의 col-6 속성을 임시로 적용해두었습니다.
    // main, footer 태그를 삭제하였습니다.
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
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
            />
            <div className="invalid-feedback">
              유효한 이메일 주소를 입력해주세요.
            </div>
          </div>

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
          disabled={isSubmitting} // 제출 중일 때 버튼 비활성화
        >
          {isSubmitting ? '가입 중...' : '회원가입'}
        </button>
      </form>
      <div className="my-5 pt-5 text-body-secondary text-center text-small">
        <p className="mb-1">&copy; 2024 CLOSET</p>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="#">개인정보처리방침</a>
          </li>
          <li className="list-inline-item">
            <a href="#">이용약관</a>
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
