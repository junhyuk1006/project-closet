import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap Icons
import '../../assets/login.css'; // Custom CSS
import closetImage from '../../assets/closet.png'; // 이미지 경로

const SignIn = () => {
  const navigator = useNavigate();
  const goToSignUp = () => {
    navigator('/SignUp');
  };

  const [theme, setTheme] = useState('auto'); // Default theme state

  // 테마 변경 함수
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    document.body.setAttribute('data-bs-theme', newTheme); // 테마 적용
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-body-tertiary">
      {/* Theme Toggle Dropdown */}
      <div className="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
        <button
          className="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"
          type="button"
          id="themeDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <svg className="bi my-1 theme-icon-active" width="1em" height="1em">
            <use href="#circle-half"></use>
          </svg>
          <span className="visually-hidden">Toggle theme</span>
        </button>
        <ul
          className="dropdown-menu dropdown-menu-end shadow"
          aria-labelledby="themeDropdown"
        >
          <li>
            <button
              className="dropdown-item d-flex align-items-center"
              onClick={() => changeTheme('light')}
            >
              <svg className="bi me-2 opacity-50" width="1em" height="1em">
                <use href="#sun-fill"></use>
              </svg>
              Light
              {theme === 'light' && (
                <svg className="bi ms-auto" width="1em" height="1em">
                  <use href="#check2"></use>
                </svg>
              )}
            </button>
          </li>
          <li>
            <button
              className="dropdown-item d-flex align-items-center"
              onClick={() => changeTheme('dark')}
            >
              <svg className="bi me-2 opacity-50" width="1em" height="1em">
                <use href="#moon-stars-fill"></use>
              </svg>
              Dark
              {theme === 'dark' && (
                <svg className="bi ms-auto" width="1em" height="1em">
                  <use href="#check2"></use>
                </svg>
              )}
            </button>
          </li>
          <li>
            <button
              className="dropdown-item d-flex align-items-center"
              onClick={() => changeTheme('auto')}
            >
              <svg className="bi me-2 opacity-50" width="1em" height="1em">
                <use href="#circle-half"></use>
              </svg>
              Auto
              {theme === 'auto' && (
                <svg className="bi ms-auto" width="1em" height="1em">
                  <use href="#check2"></use>
                </svg>
              )}
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
            alt="Closet Logo"
            width="360"
            height="160"
          />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">ID</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

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
          <button className="btn btn-secondary w-100 py-2" type="submit">
            Sign in
          </button>
          <a onClick={goToSignUp} className="btn btn-secondary w-100 py-2">
            Sign Up
          </a>
          <p className="mt-5 mb-3 text-body-secondary">&copy; 2024</p>
        </form>
      </main>
    </div>
  );
};

export default SignIn;
