import React, { useEffect, useState } from 'react';
import './Coordi.css';
import { useUser } from '../../../api/auth/UserContext';
import { useNavigate } from 'react-router-dom';

const Album = () => {
  const { user } = useUser(); // 유저 정보 가져오기
  const navigate = useNavigate();
  const [coordiData, setCoordiData] = useState([]); // 코디 데이터를 상태로 관리

  const handleUploadClick = () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      navigate(-1); // 뒤로가기
      return;
    }
    navigate('/upload'); // 업로드 페이지로 이동
  };

  // 코디 데이터 가져오기
  useEffect(() => {
    const fetchCoordiData = async () => {
      try {
        const response = await fetch('http://localhost/api/coordi/list', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch coordi data');
        }
        const data = await response.json();
        setCoordiData(data); // 코디 데이터를 상태로 설정
      } catch (error) {
        console.error('코디 데이터를 가져오는 중 오류:', error);
      }
    };

    fetchCoordiData();
  }, []);

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
            {coordiData.length > 0 ? (
              coordiData.map((coordi, index) => (
                <div className="col" key={index}>
                  <div className="card shadow-sm">
                    <img
                      src={`http://localhost/images/${coordi.coordiImage}`}
                      className="card-img-top"
                      alt={coordi.coordiTitle}
                      style={{ height: '225px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{coordi.coordiTitle}</h5>
                      <p className="card-text">
                        {coordi.coordiContent &&
                        coordi.coordiContent.length > 100
                          ? `${coordi.coordiContent.substring(0, 100)}...`
                          : coordi.coordiContent || '내용 없음'}
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <small className="text-muted">
                            작성자: {coordi.userId || '알 수 없음'}
                          </small>
                        </div>
                        <small className="text-muted">
                          좋아요: {coordi.views || 0}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">등록된 코디가 없습니다.</p>
            )}
          </div>
        </div>
      </div>

      <footer className="text-body-secondary py-5">
        <div className="container">
          <p className="float-end mb-1">
            <a href="#top">맨 위로 가기</a>
          </p>
          <p className="mb-1">
            코디 자랑 게시판에 오신 것을 환영합니다! 여러분만의 멋진 코디를
            올리고 다른 사람들과 공유해 보세요.
          </p>
          <p className="mb-0">
            새로운 코디를 올리고 싶으신가요? <a href="/upload">코디 올리기</a>를
            클릭해보세요!
          </p>
        </div>
      </footer>
    </>
  );
};

export default Album;
