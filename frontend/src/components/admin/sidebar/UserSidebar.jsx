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

const UserSidebar = ({ activeMenu, handleMenuClick }) => {
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
          className={`nav-link ${activeMenu === 'UserLevel' ? 'active' : 'link-dark'}`}
          onClick={() => handleMenuClick('UserLevel')}
        >
          <FaUsers className="me-2" /> 회원등급관리
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

export default UserSidebar;
