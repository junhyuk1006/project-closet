import React from 'react';

const Pagination = ({ currentPage, totalPages, blockSize, onPageChange }) => {
  const currentBlock = Math.floor(currentPage / blockSize); // 현재 블록 계산
  const startPage = currentBlock * blockSize; // 블록의 첫 페이지
  const endPage = Math.min(startPage + blockSize, totalPages); // 블록의 마지막 페이지

  const handleFirstPage = () => {
    onPageChange(0); // 맨 처음 페이지로 이동
  };

  const handleLastPage = () => {
    onPageChange(totalPages - 1); // 맨 끝 페이지로 이동
  };

  const handlePreviousBlock = () => {
    if (startPage > 0) {
      onPageChange(startPage - 1); // 이전 블록의 마지막 페이지로 이동
    }
  };

  const handleNextBlock = () => {
    if (endPage < totalPages) {
      onPageChange(endPage); // 다음 블록의 첫 페이지로 이동
    }
  };

  return (
    <div className="pagination">
      {/* 맨 처음 버튼 */}
      {currentPage > 0 && (
        <button className="page-button" onClick={handleFirstPage}>
          &lt;&lt;
        </button>
      )}

      {/* 이전 블록 버튼 */}
      {startPage > 0 && (
        <button className="page-button" onClick={handlePreviousBlock}>
          이전
        </button>
      )}

      {/* 현재 블록의 페이지 버튼 */}
      {Array.from({ length: endPage - startPage }, (_, i) => (
        <button
          key={startPage + i}
          className={`page-button ${
            currentPage === startPage + i ? 'active' : ''
          }`}
          onClick={() => onPageChange(startPage + i)}
        >
          {startPage + i + 1}
        </button>
      ))}

      {/* 다음 블록 버튼 */}
      {endPage < totalPages && (
        <button className="page-button" onClick={handleNextBlock}>
          다음
        </button>
      )}

      {/* 맨 끝 버튼 */}
      {currentPage < totalPages - 1 && (
        <button className="page-button" onClick={handleLastPage}>
          &gt;&gt;
        </button>
      )}
    </div>
  );
};

export default Pagination;
