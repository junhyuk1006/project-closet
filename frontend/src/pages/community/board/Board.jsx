import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Board.css';
import { getAllboard, searchBoards } from '../../../api/community/board/Board';

const Board = () => {
  const [board, setBoard] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); // 한 페이지에 보여줄 게시글 수
  const [keyword, setKeyword] = useState(''); // 검색 키워드
  const [condition, setCondition] = useState('title'); // 검색 조건 기본값: 제목
  const navigate = useNavigate();

  const handleWriteButtonClick = () => {
    navigate('/WritePost');
  };

  // 데이터 불러오기 함수
  const fetchBoards = async () => {
    try {
      const data = await getAllboard();
      // 작성일 기준 내림차순 정렬
      const sortedData = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBoard(sortedData); // 정렬된 데이터 상태 업데이트
    } catch (err) {
      setError(err.message); // 에러 메시지 상태 업데이트
    }
  };

  // 검색 요청 처리
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const result = await searchBoards(keyword, condition);
      setBoard(result); // 검색 결과 업데이트
    } catch (err) {
      setError(err.message);
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
              <form id="search-form" onSubmit={handleSearch}>
                <div className="row">
                  <div className="col-12">
                    <div className="row no-gutters">
                      <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                        <select
                          className="form-control"
                          id="exampleFormControlSelect1"
                          value={condition}
                          onChange={(e) => setCondition(e.target.value)}
                        >
                          <option>선택</option>
                          <option value="title">제목</option>
                          <option value="content">내용</option>
                        </select>
                      </div>
                      <div className="col-lg-8 col-md-6 col-sm-12 p-0">
                        <input
                          type="text"
                          placeholder="검색..."
                          className="form-control"
                          id="search"
                          name="search"
                          value={keyword}
                          onChange={(e) => setKeyword(e.target.value)}
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
                        <th style={{ textAlign: 'center' }}>프로필</th>
                        <th
                          className="highlight bg-soft-base"
                          style={{ textAlign: 'center' }}
                        >
                          제목
                        </th>
                        <th style={{ textAlign: 'center' }}>닉네임</th>
                        <th style={{ textAlign: 'center' }}>작성일</th>
                        <th
                          className="highlight bg-soft-base"
                          style={{ textAlign: 'center' }}
                        >
                          내용
                        </th>
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
                                    : 'https://bootdey.com/img/Content/avatar/avatar7.png'
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
                              <Link to={`/board/${item.id}`}>
                                {item.boardTitle}
                              </Link>
                            </div>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <div className="widget-26-job-info">
                              <p className="type m-0">{item.nickname}</p>
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
