import React from 'react';
import '../../../assets/styles/community/Recommend.css';

function Recommend() {
  return (
    <>
      <div className="offers_area" style={{ marginBottom: '300px' }}>
        <div className="container">
          <div className="recommend-title text-center">
            <h3>Top Coordinator</h3>
          </div>
          <div className="row">
            {[
              {
                image: '/images/about-02.jpg',
                title: '고객 맞춤형 스타일링',
                details: [
                  '고객 취향에 맞춘 스타일 제안',
                  '데일리룩부터 파티룩까지 다양한 스타일링',
                  '최신 트렌드 반영 스타일 제공',
                ],
              },
              {
                image: '/images/blog-02.jpg',
                title: '직장인 스타일링',
                details: [
                  '깔끔한 비즈니스 스타일',
                  '고급 소재와 브랜드 추천',
                  '신뢰도 높은 고객 리뷰 다수 보유',
                ],
              },
              {
                image: '/images/gallery-09.jpg',
                title: '자유로운 분위기의 스타일링',
                details: [
                  '자유로운 캐주얼 스타일',
                  '컬러 매칭과 악세서리 포인트 조화',
                  '트렌디한 SNS 스타일링 가능',
                ],
              },
            ].map((item, index) => (
              <div className="col-xl-4 col-md-4" key={index}>
                <div className="single_offers">
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
                  <a href="#" className="coordinator">
                    코디네이터 정보
                  </a>
                  <a href="#" className="book_now">
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
