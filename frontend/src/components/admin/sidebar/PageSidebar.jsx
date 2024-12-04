import React from 'react';
import { FaBullhorn, FaCalendar, FaAdversal } from 'react-icons/fa';

const PageSidebar = ({ activeMenu, handleMenuClick }) => {
  return (
    <ul className="nav nav-pills flex-column mb-auto">
      <li>
        <a
          href="#"
          className={`nav-link ${activeMenu === 'Notice' ? 'active' : 'link-dark'}`}
          onClick={() => handleMenuClick('Notice')}
        >
          <FaBullhorn className="me-2" /> 공지
        </a>
      </li>
      <li>
        <a
          href="#"
          className={`nav-link ${activeMenu === 'Event' ? 'active' : 'link-dark'}`}
          onClick={() => handleMenuClick('Event')}
        >
          <FaCalendar className="me-2" /> 이벤트
        </a>
      </li>
      <li>
        <a
          href="#"
          className={`nav-link ${activeMenu === 'Advertisement' ? 'active' : 'link-dark'}`}
          onClick={() => handleMenuClick('Advertisement')}
        >
          <FaAdversal className="me-2" /> 광고
        </a>
      </li>
    </ul>
  );
};

export default PageSidebar;
