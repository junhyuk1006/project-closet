import React, { useEffect, useState } from 'react';
import './Coordi.css';
import { useUser } from '../../../api/auth/UserContext';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Album = () => {
  const { user } = useUser(); // 유저 정보 가져오기
  const navigate = useNavigate();
  const [coordiData, setCoordiData] = useState([]); // 코디 데이터를 상태로 관리
  const [showModal, setShowModal] = useState(false); // 모달 상태 관리
  const [selectedCoordi, setSelectedCoordi] = useState(null); // 선택된 카드 데이터
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

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
            // Authorization이 꼭 필요한지 여부는 상황에 따라 달라질 수 있습니다.
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

  // 모달 닫기
  const handleClose = () => {
    setShowModal(false);
    setSelectedCoordi(null);
  };

  // 카드 클릭 시 모달 띄우기 & 좋아요 상태 가져오기
  const handleCardClick = async (coordi) => {
    setSelectedCoordi(coordi);
    setShowModal(true);
    setLikeCount(coordi.likeCount || 0);

    if (user) {
      // 좋아요 상태 조회
      try {
        const res = await fetch(
          `http://localhost/api/coordi/like/status?coordiBoardId=${coordi.id}&userId=${user.id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (!res.ok) {
          throw new Error('Failed to fetch like status');
        }
        const likeData = await res.json();
        setLiked(likeData.liked);
        setLikeCount(likeData.likeCount);
      } catch (err) {
        console.error('좋아요 상태 가져오는 중 오류:', err);
      }
    } else {
      // 로그인 안 한 경우 기본값 (liked: false)
      // likeCount는 coordi.likeCount로 설정한 상태 유지
      setLiked(false);
    }
  };

  // 좋아요 토글
  const handleLikeToggle = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    try {
      const res = await fetch('http://localhost/api/coordi/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coordiBoardId: selectedCoordi.id,
          userId: user.id,
        }),
      });
      if (!res.ok) {
        throw new Error('Failed to toggle like');
      }
      const likeData = await res.json();
      setLiked(likeData.liked);
      setLikeCount(likeData.likeCount);
      // 메인 페이지의 리스트도 좋아요 수 업데이트 필요 시 여기서 처리할 수 있음
      // 현재는 단순히 모달 닫고 다시 데이터 fetch하거나 하지 않고 모달내 상태만 변경
    } catch (err) {
      console.error('좋아요 토글 중 오류:', err);
    }
  };

  // 삭제
  const handleDelete = async () => {
    if (!user || user.id !== selectedCoordi.userId) {
      alert('권한이 없습니다.');
      return;
    }
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost/api/coordi/${selectedCoordi.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            // 필요하다면 Authorization 헤더 추가
            // Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        }
      );
      if (!res.ok) {
        throw new Error('Failed to delete coordi');
      }
      alert('삭제되었습니다.');
      handleClose();
      // 삭제 후 목록 갱신
      setCoordiData(coordiData.filter((c) => c.id !== selectedCoordi.id));
    } catch (err) {
      console.error('삭제 중 오류:', err);
    }
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
            {coordiData.length > 0 ? (
              coordiData.map((coordi, index) => (
                <div className="col" key={index}>
                  <div
                    className="card shadow-sm"
                    onClick={() => handleCardClick(coordi)} // 카드 클릭 이벤트
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={`/images/${coordi.coordiImage}`}
                      className="card-img-top"
                      alt={coordi.coordiTitle}
                      style={{ height: '350px', objectFit: 'cover' }}
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
                        <small className="text-muted">
                          작성자: {coordi.nickname || '알 수 없음'}
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

      {/* 모달 창 */}
      {selectedCoordi && (
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedCoordi.coordiTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={`/images/${selectedCoordi.coordiImage}`}
              alt={selectedCoordi.coordiTitle}
              style={{ width: '100%', height: 'auto' }}
            />
            <p className="mt-3">{selectedCoordi.coordiContent}</p>
            <p>
              <small>작성자: {selectedCoordi.nickname}</small>
            </p>
            <p>
              <FaHeart style={{ color: 'red', marginRight: '5px' }} />
              {likeCount}
            </p>
          </Modal.Body>
          <Modal.Footer>
            {/* 좋아요 버튼 */}
            <Button
              variant="light"
              onClick={handleLikeToggle}
              disabled={!user} // 로그인 안한 경우 좋아요 불가능
            >
              {liked ? (
                <FaHeart style={{ color: 'red' }} />
              ) : (
                <FaRegHeart style={{ color: 'red' }} />
              )}
            </Button>

            {/* 삭제 버튼: 작성자와 현재 로그인 유저가 동일할 경우에만 표시 */}
            {user && user.id === selectedCoordi.userId && (
              <Button variant="danger" onClick={handleDelete}>
                삭제
              </Button>
            )}

            <Button variant="secondary" onClick={handleClose}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
      )}

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
