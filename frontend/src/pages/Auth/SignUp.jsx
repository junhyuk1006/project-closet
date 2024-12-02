import React from 'react';
import '../../components/SignUp';
import '../../assets/signup.css';
import closetImage from '../../assets/closet.png'; // 이미지 경로를 import

const Checkout = () => {
  return (
    <div className="container">
      <main>
        <div className="py-5 text-center">
          <img
            className="d-block mx-auto mb-4"
            src={closetImage}
            alt="Bootstrap Logo"
            width="360"
            height="160"
          />
        </div>

        <form className="needs-validation" noValidate>
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="username" className="form-label">
                아이디
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="ID"
                required
              />
              <div className="invalid-feedback">
                Valid first name is required.
              </div>
            </div>

            <div className="col-6">
              <label htmlFor="username" className="form-label">
                비밀번호
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="ID"
                required
              />
              <div className="invalid-feedback">
                Valid first name is required.
              </div>
            </div>

            <div className="col-6">
              <label htmlFor="username" className="form-label">
                비빌번호 확인
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="ID"
                required
              />
              <div className="invalid-feedback">
                Valid first name is required.
              </div>
            </div>

            {/* <div className="col-12">
              <label htmlFor="name" className="form-label">
                이름
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="이름"
                required
              />
              <div className="invalid-feedback">Zip code required.</div>
            </div> */}

            <div className="col-12">
              <label htmlFor="nickname" className="form-label">
                닉네임
              </label>
              <div className="input-group has-validation">
                <input
                  type="text"
                  className="form-control"
                  id="nickname"
                  placeholder="닉네임"
                  required
                />
                <div className="invalid-feedback">
                  Your username is required.
                </div>
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
                placeholder="you@example.com"
              />
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
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

            {/* 월 */}
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

            {/* 일 */}
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
              id="same-address"
            />
            <label className="form-check-label" htmlFor="same-address">
              [필수] 개인정보 수집 및 이용 동의
              <p>
                1. 수집 항목: 이름, 이메일, 생년월일 <br></br>
                2. 수집 목적: 회원 관리, 서비스 제공, 고객 문의 처리, 마케팅 및
                이벤트 정보 제공<br></br>
                3. 보유기간: 회원 탈퇴 후 즉시 삭제 (단, 법령에 따라 보관이
                필요한 경우 제외)<br></br>
                <br></br>
                <p>
                  * 위의 내용을 확인하였으며, 개인정보 수집 및이용에 동의합니다.
                </p>
              </p>
            </label>
          </div>

          <hr className="my-4" />

          <button className="w-100 btn btn-secondary btn-lg" type="submit">
            회원가입
          </button>
        </form>
      </main>

      <footer className="my-5 pt-5 text-body-secondary text-center text-small">
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
      </footer>
    </div>
  );
};

export default Checkout;
