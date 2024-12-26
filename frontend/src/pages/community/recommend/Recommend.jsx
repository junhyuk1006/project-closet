import React, { useState } from 'react';
import './Recommend.css';
import Book from './Book';
import { useUser } from '../../../api/auth/UserContext';

function Recommend() {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false); // 예약창 열림 상태
  const [coordiId, setCoordiId] = useState(1); // 현재 예약 신청 중인 코디네이터
  const { user } = useUser();

  // 예약창 open 함수
  function handleBookModal() {
    console.log(`예약창 열림 상태: ${isBookModalOpen}`);

    if (user) {
      setIsBookModalOpen(true);
    } else {
      alert('로그인이 필요합니다.');
    }
  }

  return (
    <>
      {/* Modal open 시 배경 클릭을 막는 오버레이 */}
      {isBookModalOpen && (
        <div
          className="overlay"
          onClick={() => setIsBookModalOpen(false)} // 배경 클릭 시 Modal 닫기
        ></div>
      )}

      {/* 예약 Modal 컴포넌트 */}
      <Book
        isOpen={isBookModalOpen}
        setIsOpen={setIsBookModalOpen}
        coordiId={coordiId}
        user={user}
      />

      {/* 스타일링 페이지 */}
      <div className="offers-area" style={{ marginBottom: '300px' }}>
        <div className="container">
          <div className="recommend-title text-center">
            <h3>Top Coordinator</h3>
          </div>
          <div className="row">
            {[
              {
                id: 329,
                image: '/images/about-02.jpg',
                title: '고객 맞춤형 스타일링',
                details: [
                  '고객 취향에 맞춘 스타일 제안',
                  '데일리룩부터 파티룩까지 다양한 스타일링',
                  '최신 트렌드 반영 스타일 제공',
                ],
              },
              {
                id: 330,
                image: '/images/blog-02.jpg',
                title: '직장인 스타일링',
                details: [
                  '깔끔한 비즈니스 스타일',
                  '고급 소재와 브랜드 추천',
                  '신뢰도 높은 고객 리뷰 다수 보유',
                ],
              },
              {
                id: 331,
                image: '/images/gallery-09.jpg',
                title: '자유로운 분위기의 스타일링',
                details: [
                  '자유로운 캐주얼 스타일',
                  '컬러 매칭과 악세서리 포인트 조화',
                  '트렌디한 SNS 스타일링 가능',
                ],
              },
            ].map((item) => (
              <div className="col-xl-4 col-md-4" key={item.id}>
                <div className="single-offers">
                  <div className="about_thumb">
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '100%' }}
                    />
                  </div>
                  <h3>{item.title}</h3>
                  <ul>
                    {item.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                  {/* <a href="#" className="coordinator">
                    코디네이터 정보
                  </a> */}
                  <a
                    href="#"
                    className="book-now"
                    onClick={(e) => {
                      e.preventDefault();
                      setCoordiId(item.id);
                      console.log(item.id);
                      handleBookModal();
                    }}
                  >
                    상담 예약
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Recommend;
