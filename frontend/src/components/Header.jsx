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
import { call } from '../api/auth/ApiService';
import Alarm from './main/Alarm';
import { useUser } from '../api/auth/UserContext';

function Header({ user }) {
  const isAtTop = useFixedHeader(); // 현재 페이지 스크롤의 최상단 여부
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 토큰 유효성 상태
  const [isCartOpen, setIsCartOpen] = useState(false); // 데스크탑 장바구니의 open 상태
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 모바일 메뉴의 open 상태
  const [isSearching, setIsSearching] = useState(false); // 데스크탑의 검색창 open 상태
  const [inputValue, setInputValue] = useState(''); // 검색창 입력값 상태
  const [isDesktopCategoryOpen, setIsDesktopCategoryOpen] = useState(false); // 데스크탑 카테고리 open 상태
  const [notices, setNotices] = useState([]); // 공지사항 상태
  const [baskets, setBaskets] = useState([]); // 장바구니 상태
  const { logout } = useUser();

  // 장바구니 데이터 로드
  useEffect(() => {
    if (user) {
      async function fetchBaskets() {
        try {
          const newBaskets = await call(`/api/basket/getBasket/` + user.id); // 비동기 처리
          setBaskets(newBaskets);
        } catch (err) {
          console.error('장바구니 데이터를 가져오는 데 실패했습니다:', err);
        }
      }
      fetchBaskets();
    }
  }, [user, isCartOpen]);

  // 공지사항 데이터 로드
  useEffect(() => {
    const getNotices = async () => {
      try {
        const newNotices = await call('/notice/all');
        setNotices(newNotices);
      } catch (err) {
        console.error('공지사항을 불러오는 데 실패했습니다:', err);
      }
    };
    getNotices();
  }, []);

  // 카테고리 dropdown 열기/닫기 토글
  const toggleMouseEnter = () => setIsDesktopCategoryOpen(true);
  const toggleMouseLeave = () => setIsDesktopCategoryOpen(false);

  // 검색창 상태가 변경될 때마다 입력값을 초기화
  useEffect(() => {
    setInputValue('');
  }, [isSearching]);

  // 페이지 렌더링 시 jwt 토큰의 유효성 확인
  useEffect(() => {
    setIsAuthenticated(isValidJwtToken());
  }, [user]);

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

  // 로그아웃
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <header className="header">
      <Cart isCartOpen={isCartOpen} toggleCart={toggleCart} baskets={baskets} />

      {/* 모바일 헤더 ( 화면 너비가 991px보다 작을 때 ) */}
      <div className="wrap-header-mobile">
        <div className="logo-mobile">
          <Link to="/">
            <img src={closetImage} alt="LOGO" />
          </Link>
        </div>

        <div className="wrap-icon-header flex-w flex-r-m m-r-15">
          <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-12 p-l-20 js-show-modal-search">
            <i className="zmdi zmdi-search"></i>
          </div>

          <Alarm />

          <div
            className="icon-header-item cl2 hov-cl1 trans-04 p-r-12 p-l-20 icon-header-noti-mobile js-show-cart"
            data-notify={baskets.reduce(
              (total, basket) => total + basket.itemCount,
              0
            )}
          >
            <i className="zmdi zmdi-shopping-cart"></i>
          </div>

          <a
            href="#"
            className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-12 p-l-20 icon-header-noti-mobile"
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
      <MobileMenu
        isMenuOpen={isMenuOpen}
        isLoggedIn={isLoggedIn}
        user={user}
        setIsAuthenticated={setIsAuthenticated}
        handleLogout={handleLogout}
      />

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
              {notices.length != undefined ? (
                <Slider {...settings}>
                  {notices.map((notice) => (
                    <div key={notice.id}>
                      <Link to="#" className="notice-link">
                        {notice.subject}
                      </Link>
                    </div>
                  ))}
                </Slider>
              ) : (
                <div>공지사항이 존재하지 않습니다.</div>
              )}
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

              {user ? (
                <Link
                  to="/Logout"
                  className="flex-c-m trans-04 p-lr-25"
                  onClick={handleLogout}
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
                  <Link to="/Board">커뮤니티</Link>
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
              <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-20 p-r-12">
                <i
                  className="zmdi zmdi-search"
                  onClick={() => toggleSearch(isSearching)}
                ></i>
              </div>

              <Alarm />

              <div
                className="icon-header-item cl2 hov-cl1 trans-04 p-l-20 p-r-12 icon-header-noti"
                onClick={() => {
                  console.log('Cart icon clicked');
                  toggleCart(isCartOpen); // 장바구니 열림 상태 토글
                }}
                style={{ cursor: 'pointer' }}
                data-notify={baskets.reduce(
                  (total, basket) => total + basket.itemCount,
                  0
                )}
              >
                <i className="zmdi zmdi-shopping-cart"></i>
              </div>
              <Link
                to="#"
                className="icon-header-item cl2 hov-cl1 trans-04 p-l-20 p-r-12 icon-header-noti"
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
