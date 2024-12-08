import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

// import CSS
import '../../assets/styles/main/TopRankedItems.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

export default function TopRankedItems() {
  const {
    data: rankedItems,
    error,
    loading,
  } = useFetch(`/api/items/top/item_name`);
  const [subject, setSubject] = useState('week'); // 주간, 월간 랭킹 등을 위한 상태값
  const [category, setCategory] = useState('item_price'); // 좋아요 개수, 리뷰 개수 순위를 위한 상태값

  // 날짜 필터링에 따른 소제목 한글화
  const titleBySubject = {
    day: '일간',
    week: '주간',
    month: '월간',
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="sec-banner bg0 p-t-80 p-b-50">
      <div className="container">
        <h3 className="ltext-103 cl5 m-b-30">
          <b>{titleBySubject[subject]} 랭킹</b>
        </h3>

        {/* 페이지의 width가 768px 미만일 때 슬라이더 출력 */}
        <div className="slick-container">
          <Slider {...settings}>
            {rankedItems.map((rankedItem) => (
              <div
                key={rankedItem.id}
                className="col-md-4 col-xl-4 p-b-30 m-lr-auto"
              >
                <div className="block1 wrap-pic-w">
                  <img
                    src={`images/${rankedItem.main_image}`}
                    alt="IMG-BANNER"
                  />

                  <Link
                    to={`/Detail/${rankedItem.id}`}
                    className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                  >
                    <div className="block1-txt-child1 flex-col-l">
                      <span className="block1-name ltext-102 trans-04 p-b-8">
                        {rankedItem.item_name}
                      </span>

                      <span className="block1-info stext-102 trans-04">
                        {rankedItem.item_price}
                      </span>
                    </div>

                    <div className="block1-txt-child2 p-b-4 trans-05">
                      <div className="block1-link stext-101 cl0 trans-09">
                        Shop Now
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* 페이지의 width가 768px 이상일 때 일반 이미지 출력 */}
        <div className="image-container">
          <div className="row">
            {rankedItems.map((rankedItem) => (
              <div
                key={rankedItem.id}
                className="col-md-4 col-xl-4 p-b-30 m-lr-auto"
              >
                <div className="block1 wrap-pic-w">
                  <img
                    src={`images/${rankedItem.main_image}`}
                    alt="IMG-BANNER"
                  />

                  <Link
                    to={`/Detail/${rankedItem.id}`}
                    className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                  >
                    <div className="block1-txt-child1 flex-col-l">
                      <span className="block1-name ltext-102 trans-04 p-b-8">
                        {rankedItem.item_name}
                      </span>

                      <span className="block1-info stext-102 trans-04">
                        {rankedItem.item_price}
                      </span>
                    </div>

                    <div className="block1-txt-child2 p-b-4 trans-05">
                      <div className="block1-link stext-101 cl0 trans-09">
                        Shop Now
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
