import React from 'react';
import { FaChartBar, FaCoins, FaRegAddressCard, FaUsers } from 'react-icons/fa';

const UserSidebar = ({ activeMenu, handleMenuClick }) => {
  return (
    <ul className="nav nav-pills flex-column mb-auto">
      <li>
        <a
          href="#"
          className={`nav-link ${activeMenu === 'User' ? 'active' : 'link-dark'}`}
          onClick={() => handleMenuClick('User')}
        >
          <FaUsers className="me-2" /> 회원
        </a>
      </li>
      <li>
        <a
          href="#"
          className={`nav-link ${activeMenu === 'UserGrade' ? 'active' : 'link-dark'}`}
          onClick={() => handleMenuClick('UserGrade')}
        >
          <FaRegAddressCard className="me-2" /> 회원등급
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
      <li>
        <a
          href="#"
          className={`nav-link ${activeMenu === 'UserDashboard' ? 'active' : 'link-dark'}`}
          onClick={() => handleMenuClick('UserDashboard')}
        >
          <FaChartBar className="me-2" /> 가입통계
        </a>
      </li>
    </ul>
  );
};

export default UserSidebar;
