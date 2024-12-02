import React from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import closetImage from '../../assets/closet.jpeg'; // 이미지 경로를 import
import '../../assets/styles/Auth/login.css'; // 스코프가 적용된 CSS 파일

const SignIn = () => {
    const navigator = useNavigate();

    const goToSignUp = () => {
        navigator('/SignUp');
    }

    return (
        <div className="signin-container d-flex align-items-center py-4 bg-body-tertiary">
            {/* Theme Toggle */}
            <div className="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
                <button
                    className="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"
                    id="bd-theme"
                    type="button"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    aria-label="Toggle theme (auto)"
                >
                    <svg className="bi my-1 theme-icon-active" width="1em" height="1em">
                        <use href="#circle-half"></use>
                    </svg>
                    <span className="visually-hidden" id="bd-theme-text">
                        Toggle theme
                    </span>
                </button>
                <ul
                    className="dropdown-menu dropdown-menu-end shadow"
                    aria-labelledby="bd-theme-text"
                >
                    <li>
                        <button
                            type="button"
                            className="dropdown-item d-flex align-items-center"
                            data-bs-theme-value="light"
                            aria-pressed="false"
                        >
                            <svg className="bi me-2 opacity-50" width="1em" height="1em">
                                <use href="#sun-fill"></use>
                            </svg>
                            Light
                            <svg className="bi ms-auto d-none" width="1em" height="1em">
                                <use href="#check2"></use>
                            </svg>
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className="dropdown-item d-flex align-items-center"
                            data-bs-theme-value="dark"
                            aria-pressed="false"
                        >
                            <svg className="bi me-2 opacity-50" width="1em" height="1em">
                                <use href="#moon-stars-fill"></use>
                            </svg>
                            Dark
                            <svg className="bi ms-auto d-none" width="1em" height="1em">
                                <use href="#check2"></use>
                            </svg>
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className="dropdown-item d-flex align-items-center active"
                            data-bs-theme-value="auto"
                            aria-pressed="true"
                        >
                            <svg className="bi me-2 opacity-50" width="1em" height="1em">
                                <use href="#circle-half"></use>
                            </svg>
                            Auto
                            <svg className="bi ms-auto d-none" width="1em" height="1em">
                                <use href="#check2"></use>
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>

            {/* Sign-in Form */}
            <main className="form-signin w-100 m-auto">
                <form>
                    <img
                        className="mb-4"
                        src={closetImage}
                        alt="Bootstrap logo"
                        width="400"
                        height="200"
                    />
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    {/* Email Input */}
                    <div className="form-floating">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>

                    {/* Password Input */}
                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    {/* Remember Me */}
                    <div className="form-check text-start my-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value="remember-me"
                            id="flexCheckDefault"
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Remember me
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button className="btn btn-primary w-100 py-2" type="submit">
                        Sign in
                    </button>
                    <a
                        onClick={goToSignUp}
                        className="btn btn-primary w-100 py-2"
                    >
                        Sign Up
                    </a>
                    <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
                </form>
            </main>
        </div>
    );
};

export default SignIn;