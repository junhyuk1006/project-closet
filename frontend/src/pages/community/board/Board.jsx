import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Board.css';
import { getAllboard } from '../../../api/community/board/Board';

const Board = () => {
  const [board, setBoard] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); // 한 페이지에 보여줄 게시글 수
  const navigate = useNavigate();

  const handleWriteButtonClick = () => {
    navigate('/WritePost');
  };

  // 데이터 불러오기 함수
  const fetchBoards = async () => {
    try {
      const data = await getAllboard();
      setBoard(data); // 게시글 데이터 상태 업데이트
    } catch (err) {
      setError(err.message); // 에러 메시지 상태 업데이트
    }
  };

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    fetchBoards();
  }, []);

  // 페이지네이션 처리
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = board.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container board-container">
      <div className="row">
        <div className="col-lg-12 card-margin m-t-100">
          <div className="card search-form">
            <div className="card-body p-0">
              <form id="search-form">
                <div className="row">
                  <div className="col-12">
                    <div className="row no-gutters">
                      <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                        <select
                          className="form-control"
                          id="exampleFormControlSelect1"
                        >
                          <option>선택</option>
                          <option>작성자</option>
                          <option>제목</option>
                          <option>내용</option>
                          <option>작성일</option>
                        </select>
                      </div>
                      <div className="col-lg-8 col-md-6 col-sm-12 p-0">
                        <input
                          type="text"
                          placeholder="검색..."
                          className="form-control"
                          id="search"
                          name="search"
                        />
                      </div>
                      <div className="col-lg-1 col-md-3 col-sm-12 p-0">
                        <button type="submit" className="btn btn-base">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-search"
                          >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card card-margin">
            <div className="card-body">
              {error && <p style={{ color: 'red' }}>에러 발생: {error}</p>}
              {currentPosts.length > 0 ? (
                <div className="table-responsive">
                  <table className="table widget-26">
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'center' }}>이미지</th>
                        <th
                          className="highlight bg-soft-base"
                          style={{ textAlign: 'center' }}
                        >
                          제목
                        </th>
                        <th style={{ textAlign: 'center' }}>작성자 ID</th>
                        <th style={{ textAlign: 'center' }}>작성일</th>
                        <th
                          className="highlight bg-soft-base"
                          style={{ textAlign: 'center' }}
                        >
                          내용
                        </th>
                        <th style={{ textAlign: 'center' }}>즐겨찾기</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPosts.map((item) => (
                        <tr key={item.id}>
                          <td style={{ textAlign: 'center' }}>
                            <div className="widget-26-job-emp-img">
                              <img
                                src={
                                  item.boardImage
                                    ? `http://localhost/images/${item.boardImage}`
                                    : 'https://bootdey.com/img/Content/avatar/avatar5.png'
                                }
                                alt={item.boardTitle}
                              />
                            </div>
                          </td>
                          <td
                            className="highlight bg-soft-base"
                            style={{ textAlign: 'center' }}
                          >
                            <div className="widget-26-job-title">
                              <a href="#">{item.boardTitle}</a>
                            </div>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <div className="widget-26-job-info">
                              <p className="type m-0">{item.userId}</p>
                            </div>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <div className="widget-26-job-salary">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td
                            className="highlight bg-soft-base"
                            style={{ textAlign: 'center' }}
                          >
                            <div className="widget-26-job-category">
                              <span>
                                {item.boardContent.length > 10
                                  ? `${item.boardContent.substring(0, 10)}...`
                                  : item.boardContent}
                              </span>
                            </div>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <div className="widget-26-job-starred">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-star"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>게시글이 없습니다.</p>
              )}
              <nav className="d-flex justify-content-center mt-3">
                <ul className="pagination pagination-base pagination-boxed pagination-square mb-0">
                  {Array.from(
                    { length: Math.ceil(board.length / postsPerPage) },
                    (_, index) => (
                      <li
                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                        key={index}
                      >
                        <button
                          className="page-link no-border"
                          onClick={() => paginate(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </nav>
              <button
                className="btn btn-secondary mt-3"
                onClick={handleWriteButtonClick}
              >
                글작성
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
