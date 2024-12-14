import { Link } from 'react-router-dom';

export default function MobileMenu({
  isMenuOpen,
  isLoggedIn,
  user,
  setIsAuthenticated,
  handleLogout,
}) {
  return (
    <div
      className={`menu-mobile ${isMenuOpen ? 'dis-block show-menu-mobile' : ''}`}
    >
      <ul className="topbar-mobile">
        <li>
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
        </li>
      </ul>

      <ul className="main-menu-m">
        <li>
          <Link to="/shop">아우터</Link>
        </li>
        <li>
          <Link to="/shop">상의</Link>
        </li>
        <li>
          <Link to="/shop">하의</Link>
        </li>
        <li>
          <Link to="/shop">치마</Link>
        </li>
        <li>
          <Link to="/shop">신발</Link>
        </li>
        <li>
          <Link to="/shop">악세서리</Link>
        </li>
        <li>
          <Link to="/ShoppingCart">장바구니</Link>
        </li>
        <li className="label1-mobile" data-label1="hot">
          <Link to="/Recommend">스타일링</Link>
        </li>
        <li>
          <Link to="/Board">커뮤니티</Link>
        </li>
      </ul>
    </div>
  );
}
