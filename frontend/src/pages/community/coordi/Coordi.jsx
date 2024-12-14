import React from 'react';
import './Coordi.css';
import { useUser } from '../../../api/auth/UserContext';
import { useNavigate } from 'react-router-dom';

const Album = () => {
  const { user } = useUser(); // 유저 정보 가져오기
  const navigate = useNavigate();

  const handleUploadClick = () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      navigate(-1); // 뒤로가기
      return;
    }
    navigate('/upload'); // 업로드 페이지로 이동
  };

  return (
    <>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">코디자랑 게시판</h1>
            <p className="lead text-body-secondary">
              나의 코디를 자랑해보세요.
            </p>
            <p>
              <button
                className="btn btn-secondary my-2"
                onClick={handleUploadClick}
              >
                코디 올리기
              </button>
            </p>
          </div>
        </div>
      </section>

      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <div className="col" key={index}>
                <div className="card shadow-sm">
                  <svg
                    className="bd-placeholder-img card-img-top"
                    width="100%"
                    height="225"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c" />
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                      Thumbnail
                    </text>
                  </svg>
                  <div className="card-body">
                    <p className="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Edit
                        </button>
                      </div>
                      <small className="text-body-secondary">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="text-body-secondary py-5">
        <div className="container">
          <p className="float-end mb-1">
            <a href="#top">맨 위로 가기</a>
          </p>
          <p className="mb-1">
            Album example is &copy; Bootstrap, but please download and customize
            it for yourself!
          </p>
          <p className="mb-0">
            New to Bootstrap? <a href="/">Visit the homepage</a> or read our{' '}
            <a href="../getting-started/introduction/">getting started guide</a>
            .
          </p>
        </div>
      </footer>
    </>
  );
};

export default Album;
