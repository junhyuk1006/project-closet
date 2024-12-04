import React from 'react';
import {
  FaChartBar,
  FaExchangeAlt,
  FaShoppingCart,
  FaTruck,
  FaUndoAlt,
} from 'react-icons/fa';

const OrderSidebar = ({ activeMenu, handleMenuClick }) => {
  return (
    <ul className="nav nav-pills flex-column mb-auto">
      <li>
        <a
          href="#"
          className={`nav-link ${activeMenu === 'Order' ? 'active' : 'link-dark'}`}
          onClick={() => handleMenuClick('Order')}
        >
          <FaShoppingCart className="me-2" /> 주문
        </a>
      </li>
      <li>
        <a
          href="#"
          className={`nav-link ${activeMenu === 'Delivery' ? 'active' : 'link-dark'}`}
          onClick={() => handleMenuClick('Delivery')}
        >
          <FaTruck className="me-2" /> 배송
        </a>
      </li>
      <li>
        <a
          href="#"
          className={`nav-link ${activeMenu === 'Exchange' ? 'active' : 'link-dark'}`}
          onClick={() => handleMenuClick('Exchange')}
        >
          <FaExchangeAlt className="me-2" /> 교환
        </a>
      </li>
      <li>
        <a
          href="#"
          className={`nav-link ${activeMenu === 'Return' ? 'active' : 'link-dark'}`}
          onClick={() => handleMenuClick('Return')}
        >
          <FaUndoAlt className="me-2" /> 반품
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
