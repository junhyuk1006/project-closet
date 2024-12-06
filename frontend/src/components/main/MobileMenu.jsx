import { Link } from 'react-router-dom';

export default function MobileMenu({ isMenuOpen }) {
  return (
    <div
      className={`menu-mobile ${isMenuOpen ? 'dis-block show-menu-mobile' : ''}`}
    >
      <ul className="topbar-mobile">
        <li>
          <div className="right-top-bar flex-w h-full">
            <Link to="/MyPageHome" className="flex-c-m trans-04 p-lr-10">
              My Account
            </Link>
            <Link to="/Login" className="flex-c-m trans-04 p-lr-10">
              Login
            </Link>
          </div>
        </li>
      </ul>

      <ul className="main-menu-m">
        <li>
          <a href="index.html">Home</a>
          <ul className="sub-menu-m">
            <li>
              <a href="index.html">Homepage 1</a>
            </li>
            <li>
              <a href="home-02.html">Homepage 2</a>
            </li>
            <li>
              <a href="home-03.html">Homepage 3</a>
            </li>
          </ul>
          <span className="arrow-main-menu-m">
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </span>
        </li>

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
        {/* <li>
                 <Link to="/ShoppingCart">장바구니</Link>
                </li> */}
        <li className="label1-mobile" data-label1="hot">
          <Link to="/Recommend">스타일링</Link>
        </li>
      </ul>
    </div>
  );
}
