import React from 'react';
import {
  FaBox,
  FaComments,
  FaMarker,
  FaTshirt,
  FaFileExcel,
} from 'react-icons/fa';

const ItemSidebar = ({ activeMenu, handleMenuClick }) => {
  return (
    <ul className="nav nav-pills flex-column mb-auto">
      <li>
        <a
          href="#"
          className={`nav-link ${activeMenu === 'Item' ? 'active' : 'link-dark'}`}
          onClick={() => handleMenuClick('Item')}
        >
          <FaTshirt className="me-2" /> 상품
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
      <li>
        <a
          href="#"
          className={`nav-link ${activeMenu === 'ExcelItem' ? 'active' : 'link-dark'}`}
          onClick={() => handleMenuClick('ExcelItem')}
        >
          <FaFileExcel className="me-2" /> 엑셀등록
        </a>
      </li>
      <li></li>
    </ul>
  );
};

export default ItemSidebar;
