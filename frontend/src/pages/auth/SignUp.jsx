import React from 'react';
import '../../utils/SignUp';
import '../../assets/styles/Auth/signup.css'
import closetImage from '../../assets/closet.jpeg'; // 이미지 경로를 import

const Checkout = () => {
    return (
        <div className="signup-container">
            <main>
                <div className="py-5 text-center">
                    <img
                        className="d-block mx-auto mb-4"
                        src={closetImage}
                        alt="Bootstrap Logo"
                        width="500"
                        height="200"
                    />
                    <h2 className="text-primary">회원가입</h2>
                    <br></br>
                    <p className="lead">
                        환영합니다! 간단한 정보 입력으로 회원가입을 완료하세요.
                    </p>
                </div>

                <div className="row g-5">
                    {/* <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">3</span>
            </h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Product name</h6>
                  <small className="text-body-secondary">
                    Brief description
                  </small>
                </div>
                <span className="text-body-secondary">$12</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Second product</h6>
                  <small className="text-body-secondary">
                    Brief description
                  </small>
                </div>
                <span className="text-body-secondary">$8</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Third item</h6>
                  <small className="text-body-secondary">
                    Brief description
                  </small>
                </div>
                <span className="text-body-secondary">$5</span>
              </li>
              <li className="list-group-item d-flex justify-content-between bg-body-tertiary">
                <div className="text-success">
                  <h6 className="my-0">Promo code</h6>
                  <small>EXAMPLECODE</small>
                </div>
                <span className="text-success">−$5</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>$20</strong>
              </li>
            </ul>

            <form className="card p-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                />
                <button type="submit" className="btn btn-secondary">
                  Redeem
                </button>
              </div>
            </form>
          </div> */}

                    <h4 className="mb-3">입력 폼</h4>
                    <form className="needs-validation" noValidate>
                        <div className="row g-3">
                            <div className="col-sm-6">
                                <label htmlFor="firstName" className="form-label">
                                    이름
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    placeholder=""
                                    required
                                />
                                <div className="invalid-feedback">
                                    Valid first name is required.
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="lastName" className="form-label">
                                    성
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    placeholder=""
                                    required
                                />
                                <div className="invalid-feedback">
                                    Valid last name is required.
                                </div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="username" className="form-label">
                                    닉네임
                                </label>
                                <div className="input-group has-validation">
                                    <span className="input-group-text">@</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        placeholder="Username"
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Your username is required.
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="email" className="form-label">
                                    이메일 <span className="text-body-secondary">(Optional)</span>
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

                            {/* <div className="col-12">
                  <label htmlFor="address" className="form-label">
                    주소
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="1234 Main St"
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="address2" className="form-label">
                    상세주소{' '}
                    <span className="text-body-secondary">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    placeholder="Apartment or suite"
                  />
                </div> */}

                            <div className="col-md-5">
                                <label htmlFor="country" className="form-label">
                                    출생연도
                                </label>
                                <select className="form-select" id="country" required>
                                    <option value="">Choose...</option>
                                    <option>United States</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please select a valid country.
                                </div>
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="state" className="form-label">
                                    월
                                </label>
                                <select className="form-select" id="state" required>
                                    <option value="">Choose...</option>
                                    <option>California</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please provide a valid state.
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="zip" className="form-label">
                                    일
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="zip"
                                    placeholder=""
                                    required
                                />
                                <div className="invalid-feedback">Zip code required.</div>
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
                                    2. 수집 목적: 회원 관리, 서비스 제공, 고객 문의 처리, 마케팅
                                    및 이벤트 정보 제공<br></br>
                                    3. 보유기간: 회원 탈퇴 후 즉시 삭제 (단, 법령에 따라 보관이
                                    필요한 경우 제외)<br></br>
                                    <br></br>
                                    <p>
                                        * 위의 내용을 확인하였으며, 개인정보 수집 및이용에
                                        동의합니다.
                                    </p>
                                </p>
                            </label>
                        </div>

                        <hr className="my-4" />

                        <button className="w-100 btn btn-primary btn-lg" type="submit">
                            회원가입
                        </button>
                    </form>
                </div>
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