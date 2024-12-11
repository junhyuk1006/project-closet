import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import CSS
import '../assets/styles/components/header.css';
import '../assets/vendor/css-hamburgers/hamburgers.min.css';

// import Image
import closetImage from '../assets/closet-removebg.png';

import Search from '../api/main/Search';

// import Hooks
import useFixedHeader from '../hooks/useFixedHeader';
import Cart from '../pages/cart/Cart';
import MobileMenu from './main/MobileMenu';
import isValidJwtToken from '../api/auth/isValidJwtToken';
import Dropdown from 'react-bootstrap/Dropdown';
import Slider from 'react-slick';

function Header() {
  const isAtTop = useFixedHeader(); // 현재 페이지 스크롤의 최상단 여부
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // 데스크탑 장바구니의 open 상태
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 모바일 메뉴의 open 상태
  const [isSearching, setIsSearching] = useState(false); // 데스크탑의 검색창 open 상태
  const [inputValue, setInputValue] = useState(''); // 검색창 입력값 상태
  const [isDesktopCategoryOpen, setIsDesktopCategoryOpen] = useState(false); // 데스크탑 카테고리 open 상태
  const [isDesktopAlarmOpen, setIsDesktopAlarmOpen] = useState(false); // 데스크탑 알람 패널 open 상태
  const [isMobileAlarmOpen, setIsMobileAlarmOpen] = useState(false); // 데스크탑 알람 패널 open 상태

  // 카테고리 dropdown 열기/닫기 토글
  const toggleMouseEnter = () => setIsDesktopCategoryOpen(true);
  const toggleMouseLeave = () => setIsDesktopCategoryOpen(false);

  // 데스크탑 알람 패널 열기/닫기 토글
  const toggleDesktopAlarm = (prev) => {
    const newState = !prev;
    console.log(`데스크탑의 알람 버튼을 클릭했습니다: ${newState}`);
    setIsDesktopAlarmOpen(newState);
  };

  // 모바일 알람 패널 열기/닫기 토글
  const toggleMobileAlarm = (prev) => {
    const newState = !prev;
    console.log(`모바일의 알람 버튼을 클릭했습니다: ${newState}`);
    setIsMobileAlarmOpen(newState);
  };

  // 검색창 상태가 변경될 때마다 입력값을 초기화
  useEffect(() => {
    setInputValue('');
  }, [isSearching]);

  // 페이지 렌더링 시 jwt 토큰의 유효성 확인
  useEffect(() => {
    setIsAuthenticated(isValidJwtToken());
  }, []);

  // 로그인 상태 확인 함수
  const isLoggedIn = (e) => {
    if (!isAuthenticated) {
      alert('로그인이 필요합니다.');
      e.preventDefault();
    } else if (!isValidJwtToken()) {
      alert('토큰이 유효하지 않습니다.');
      setIsAuthenticated(false);
      e.preventDefault();
    }
  };

  // 장바구니 열기/닫기 토글
  const toggleCart = (prev) => {
    setIsCartOpen(!prev);
  };

  // 모바일 메뉴 열기/닫기 토글
  const toggleMobileMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // 검색창 열기/닫기 토글
  const toggleSearch = (prev) => {
    const newState = !prev;
    setIsSearching(newState);
  };

  // slick 속성
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  useEffect(() => {
    document
      .querySelectorAll('.left-top-bar .slick-slider button')
      .forEach((elem) => {
        elem.remove();
      });
  }, []);

  return (
    <header className="header">
      <Cart isCartOpen={isCartOpen} toggleCart={toggleCart} />

      {/* 모바일 헤더 ( 화면 너비가 991px보다 작을 때 ) */}
      <div className="wrap-header-mobile">
        <div className="logo-mobile">
          <Link to="/">
            <img src={closetImage} alt="LOGO" />
          </Link>
        </div>

        <div className="wrap-icon-header flex-w flex-r-m m-r-15">
          <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-22 p-l-10 js-show-modal-search">
            <i className="zmdi zmdi-search"></i>
          </div>

          <Dropdown
            onClick={toggleMobileAlarm}
            isMobileAlarmOpen={isMobileAlarmOpen}
            autoClose={'inside'}
          >
            <Dropdown.Toggle variant="" id="">
              <div
                className="icon-header-item cl2 hov-cl1 trans-04 p-r-22 p-l-10 icon-header-noti-mobile"
                data-notify="3"
              >
                <i className="zmdi zmdi-notifications-none"></i>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/shop">
                <span style={{ color: '#06F', fontWeight: 'bold' }}>
                  [알림]
                </span>{' '}
                예약하신 상담 시간이 곧 시작됩니다!
                <br />
                잊지 말고 시간에 맞춰 준비해주세요.
                <br />
                상담 일정:{' '}
                <span style={{ fontWeight: 'bold' }}>
                  2024년 12월 24일 14:00
                </span>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/shop">
                <span style={{ color: '#06F', fontWeight: 'bold' }}>
                  [알림]
                </span>{' '}
                고객님의 주문이 배송을 시작했습니다!
                <br />
                주문 번호:{' '}
                <span style={{ fontWeight: 'bold' }}>1234 12345</span>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/shop">
                <span style={{ color: '#06f', fontWeight: 'bold' }}>
                  [알림]
                </span>{' '}
                <span style={{ color: '#f44' }}>환불 요청</span>에 대한 답변이
                완료되었습니다.
                <br />
                상세 내용은 고객센터 페이지에서 확인해주세요.
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div
            className="icon-header-item cl2 hov-cl1 trans-04 p-r-22 p-l-10 icon-header-noti-mobile js-show-cart"
            data-notify="2"
          >
            <i className="zmdi zmdi-shopping-cart"></i>
          </div>

          <a
            href="#"
            className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-22 p-l-10 icon-header-noti-mobile"
            data-notify="0"
          >
            <i className="zmdi zmdi-favorite-outline"></i>
          </a>
        </div>

        <div
          className={`btn-show-menu-mobile hamburger hamburger--squeeze ${isMenuOpen ? 'is-active' : ''}`}
        >
          <div className="hamburger-box" onClick={toggleMobileMenu}>
            <div className="hamburger-inner"></div>
          </div>
        </div>
      </div>

      {/* 메뉴 패널 open 시 배경 클릭을 막는 오버레이 */}
      {isMenuOpen && (
        <div
          className="overlay"
          onClick={() => setIsMenuOpen(false)} // 배경 클릭 시 메뉴 닫기
        ></div>
      )}

      {/* 모바일 메뉴 */}
      <MobileMenu isMenuOpen={isMenuOpen} />

      {/* Modal Search */}
      <div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
        <div className="container-search-header">
          <button className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
            <img src="images/icons/icon-close2.png" alt="CLOSE" />
          </button>

          <form className="wrap-search-header flex-w p-l-15">
            <button className="flex-c-m trans-04">
              <i className="zmdi zmdi-search"></i>
            </button>
            <input
              className="plh3"
              type="text"
              name="search"
              placeholder="Search..."
            />
          </form>
        </div>
      </div>

      {/* 데스크탑 헤더 ( 화면 너비가 992px보다 클 때 ) */}
      <div className="container-menu-desktop">
        <div className="top-bar">
          <div className="content-topbar flex-sb-m h-full container p-l-0">
            <div className="left-top-bar">
              <Slider {...settings}>
                <div>
                  <Link to="#">공지사항입니다.</Link>
                </div>
                <div>
                  <Link to="#">공지사항 전파합니다.</Link>
                </div>
                <div>
                  <Link to="#">전체 공지사항입니다.</Link>
                </div>
              </Slider>
            </div>
            <div className="right-top-bar flex-w h-full">
              <Link
                to="/MyPageHome"
                className="flex-c-m trans-04 p-lr-25"
                onClick={(e) => {
                  isLoggedIn(e);
                }}
              >
                마이페이지
              </Link>

              {isAuthenticated ? (
                <Link
                  to="/Logout"
                  className="flex-c-m trans-04 p-lr-25"
                  onClick={(e) => {
                    localStorage.removeItem('token');

                    alert('정상적으로 로그아웃되었습니다.');

                    setIsAuthenticated(false);
                    e.preventDefault();
                  }}
                >
                  로그아웃
                </Link>
              ) : (
                <Link to="/Login" className="flex-c-m trans-04 p-lr-25">
                  로그인
                </Link>
              )}
            </div>
          </div>
        </div>

        <div
          className="wrap-menu-desktop"
          style={{
            top: isAtTop ? '40px' : '0',
            backgroundColor: isAtTop ? 'transparent' : '#fff',
            height: isAtTop ? '84px' : '64px',
            boxShadow: isAtTop ? 'none' : '0 4px 6px rgba(0, 0, 0, 0.1)',
            opacity: isAtTop ? '1' : '0.95',
            transition: isAtTop
              ? 'top 0.3s cubic-bezier(0.1, 0.6, 0.1, 1), background-color 0.3s ease-in-out, height 0.3s ease-in-out, box-shadow 0.3s ease-in-out, opacity 0.3s ease-in-out'
              : 'top 0.2s cubic-bezier(0.25, 0.7, 1, 1), background-color 0.5s ease-in-out, height 0.5s ease-in-out, box-shadow 0.5s ease-in-out, opacity 0.5s ease-in-out',
          }}
        >
          <nav className="limiter-menu-desktop container">
            {/* 로고 */}
            <Link to="/" className="logo">
              <img src={closetImage} alt="LOGO" />
            </Link>

            {/* navbar */}
            <div className="menu-desktop">
              <ul className="main-menu">
                <li>
                  <Dropdown
                    onMouseEnter={toggleMouseEnter}
                    onMouseLeave={toggleMouseLeave}
                    show={isDesktopCategoryOpen}
                  >
                    <Dropdown.Toggle variant="" id="">
                      <Link to="#">카테고리</Link>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="/shop">아우터</Dropdown.Item>
                      <Dropdown.Item href="/shop">상의</Dropdown.Item>
                      <Dropdown.Item href="/shop">바지</Dropdown.Item>
                      <Dropdown.Item href="/shop">치마</Dropdown.Item>
                      <Dropdown.Item href="/shop">신발</Dropdown.Item>
                      <Dropdown.Item href="/shop">악세서리</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href="/shop">전체</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li>
                  <Link to="/ShoppingCart">장바구니</Link>
                </li>
                <li className="label1" data-label1="hot">
                  <Link to="/Recommend">스타일링</Link>
                </li>
                <li>
                  <Link to="/Community">커뮤니티</Link>
                </li>
              </ul>
            </div>

            {/* 아이콘 */}
            <div className="wrap-icon-header flex-w flex-r-m">
              <input
                className={`header-search ${isSearching ? '' : 'dis-none'}`}
                type="text"
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    console.log(`${e.key} 입력 (검색)`);
                    <Search inputValue={inputValue} />;
                  }
                }}
                value={inputValue}
              />
              <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11">
                <i
                  className="zmdi zmdi-search"
                  onClick={() => toggleSearch(isSearching)}
                ></i>
              </div>
              <Dropdown
                onClick={toggleDesktopAlarm}
                isDesktopAlarmOpen={isDesktopAlarmOpen}
                autoClose={'inside'}
              >
                <Dropdown.Toggle variant="" id="">
                  <div
                    className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti"
                    data-notify="3"
                  >
                    <i className="zmdi zmdi-notifications-none"></i>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/shop">
                    <span style={{ color: '#06F', fontWeight: 'bold' }}>
                      [알림]
                    </span>{' '}
                    예약하신 상담 시간이 곧 시작됩니다!
                    <br />
                    잊지 말고 시간에 맞춰 준비해주세요.
                    <br />
                    상담 일정:{' '}
                    <span style={{ fontWeight: 'bold' }}>
                      2024년 12월 24일 14:00
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="/shop">
                    <span style={{ color: '#06F', fontWeight: 'bold' }}>
                      [알림]
                    </span>{' '}
                    고객님의 주문이 배송을 시작했습니다!
                    <br />
                    주문 번호:{' '}
                    <span style={{ fontWeight: 'bold' }}>1234 12345</span>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="/shop">
                    <span style={{ color: '#06f', fontWeight: 'bold' }}>
                      [알림]
                    </span>{' '}
                    <span style={{ color: '#f44' }}>환불 요청</span>에 대한
                    답변이 완료되었습니다.
                    <br />
                    상세 내용은 고객센터 페이지에서 확인해주세요.
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div
                className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti"
                onClick={() => {
                  console.log('Cart icon clicked');
                  toggleCart(isCartOpen); // 장바구니 열림 상태 토글
                }}
                style={{ cursor: 'pointer' }}
                data-notify="2"
              >
                <i className="zmdi zmdi-shopping-cart"></i>
              </div>
              <Link
                to="#"
                className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti"
                data-notify="0"
              >
                <i className="zmdi zmdi-favorite-outline"></i>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
