import React from 'react';
import {
  FaHome,
  FaShoppingCart,
  FaExchangeAlt,
  FaUsers,
  FaBullhorn,
  FaChartBar,
  FaBox,
  FaMarker,
  FaComments,
  FaCoins,
} from 'react-icons/fa';

const Sidebar = ({ activeMenu, handleMenuClick }) => {
  return (
    <ul className="nav nav-pills flex-column mb-auto">
      <li>
        <a
          href="#"
          className={`nav-link ${activeMenu === 'Dashboard' ? 'active' : 'link-dark'}`}
          onClick={() => handleMenuClick('Dashboard')}
        >
          <FaChartBar className="me-2" /> Dashboard
        </a>
      </li>
      <li>
        <a
          href="#"
          className={`nav-link ${activeMenu === 'User' ? 'active' : 'link-dark'}`}
          onClick={() => handleMenuClick('User')}
        >
          <FaUsers className="me-2" /> 회원관리
        </a>
      </li>
      <li>
        <a
          href="#"
          className={`nav-link ${activeMenu === 'Notice' ? 'active' : 'link-dark'}`}
          onClick={() => handleMenuClick('Notice')}
        >
          <FaBullhorn className="me-2" /> 공지/이벤트
        </a>
      </li>
      <li>
        <a
          href="#"
          className={`nav-link ${activeMenu === 'Stock' ? 'active' : 'link-dark'}`}
          onClick={() => handleMenuClick('Stock')}
        >
          <FaBox className="me-2" /> 재고
        </a>
      </li>
      <li>
        <a
          href="#"
          className={`nav-link ${activeMenu === 'Order' ? 'active' : 'link-dark'}`}
          onClick={() => handleMenuClick('Order')}
        >
          <FaShoppingCart className="me-2" /> 주문/배송
        </a>
      </li>
      <li>
        <a
          href="#"
          className={`nav-link ${activeMenu === 'Exchange' ? 'active' : 'link-dark'}`}
          onClick={() => handleMenuClick('Exchange')}
        >
          <FaExchangeAlt className="me-2" /> 교환/반품
        </a>
      </li>
      <li>
        <a
          href="#"
          className={`nav-link ${activeMenu === 'Sales' ? 'active' : 'link-dark'}`}
          onClick={() => handleMenuClick('Sales')}
        >
          <FaChartBar className="me-2" /> 매출
        </a>
      </li>
      <li>
        <a
          href="#"
          className={`nav-link ${activeMenu === 'Review' ? 'active' : 'link-dark'}`}
          onClick={() => handleMenuClick('Review')}
        >
          <FaMarker className="me-2" /> 리뷰
        </a>
      </li>
      <li>
        <a
          href="#"
          className={`nav-link ${activeMenu === 'Ask' ? 'active' : 'link-dark'}`}
          onClick={() => handleMenuClick('Ask')}
        >
          <FaComments className="me-2" /> 상품문의
        </a>
      </li>
      <li>
        <a
          href="#"
          className={`nav-link ${activeMenu === 'Point' ? 'active' : 'link-dark'}`}
          onClick={() => handleMenuClick('Point')}
        >
          <FaCoins className="me-2" /> 포인트
        </a>
      </li>
    </ul>
  );
};

export default Sidebar;
