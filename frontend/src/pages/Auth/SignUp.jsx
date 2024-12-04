import React, { useRef } from 'react';
import '../../components/SignUp';
import '../../assets/styles/Auth/signup.css';
import closetImage from '../../assets/closet.png'; // 이미지 경로를 import

const Checkout = () => {
  const formRef = useRef(null); // 폼 참조

  const handleSubmit = (event) => {
    event.preventDefault(); // 기본 동작 중단
    event.stopPropagation(); // 이벤트 전파 중단

    const form = event.target;

    if (form.checkValidity()) {
      // 모든 필드가 유효하면 콘솔 출력 후 초기화
      console.log('폼 제출 성공!', {
        username: form.username.value,
        password: form.password.value,
        nickname: form.nickname.value,
        email: form.email.value,
      });

      form.reset(); // 폼 데이터 초기화
      form.classList.remove('was-validated'); // 유효성 검사 스타일 초기화
    } else {
      form.classList.add('was-validated'); // 유효성 검사 스타일 추가
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

        <button className="w-100 btn btn-secondary btn-lg" type="submit">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Checkout;
