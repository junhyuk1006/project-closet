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

const ItemSidebar = ({ activeMenu, handleMenuClick }) => {
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
          className={`nav-link ${activeMenu === 'Stock' ? 'active' : 'link-dark'}`}
          onClick={() => handleMenuClick('Stock')}
        >
          <FaBox className="me-2" /> 재고
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
    </ul>
  );
};

export default ItemSidebar;
