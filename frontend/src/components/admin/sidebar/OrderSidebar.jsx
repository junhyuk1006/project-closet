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

const OrderSidebar = ({ activeMenu, handleMenuClick }) => {
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
    </ul>
  );
};

export default OrderSidebar;
