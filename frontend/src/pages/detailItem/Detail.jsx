import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../api/auth/UserContext';
import '../../assets/styles/components/main.css';
import '../../assets/styles/components/util.css';
import '../../assets/styles/detailItem/Detail.css';
import useProductQuantity from '../../hooks/useProductQuantity';
import FetchIdProduct from '../../api/item/FetchIdProduct';
import ReviewInput from './ReviewInput';
import ItemInquiry from './ItemInquiry';
import FetchCountReview from '../../api/review/FetchCountReview';
import FetchCountInquiry from '../../api/inquiry/FetchCountInquiry';
import { useCart } from '../../api/basket/BasketContext';
import { call } from '../../api/auth/ApiService';

function Detail() {
  const location = useLocation();
  const { user, loading } = useUser(); // useUser에서 loading 상태 가져오기
  const [productId, setProductId] = useState(null);
  const [product, setProduct] = useState([]); // Fetch된 데이터 저장
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [countReview, setCountReview] = useState(0);
  const [countInquiry, setCountInquiry] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [baskets, setBasket] = useState(null);
  const { quantity, increaseQuantity, decreaseQuantity } =
    useProductQuantity(1);
  const { addToCart } = useCart();

  const userId = user?.id || '';

  useEffect(() => {
    setProductId(location.pathname.split('/')[2]);
    // fetchCountReview(productId).then((data) => setCountReview(data));
    // fetchCountInquiry(productId).then((data) => setCountInquiry(data));
  }, [location.pathname]);

  useEffect(() => {
    setBasket([]); // 초기화
  }, []);

  // 컴포넌트 로드 시 id에 따른 상품 데이터를 가져옵니다.
  useEffect(() => {
    if (productId) {
      call(`/itemDetail/${productId}`)
        .then((res) => {
          console.log(res);
          setProduct(res);
        })
        .catch((err) => {
          console.error('상품 데이터를 가져오는 데 실패했습니다.' + err);
        });
    }
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleFetch = (data) => {
    setProduct(data);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? product.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === product.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleSaveBasket = async (e) => {
    e.preventDefault();

    if (!selectedColor || !selectedSize) {
      alert('색상과 사이즈를 선택해주세요.');
      return;
    }

    const basketData = {
      userId: userId,
      itemDetailId: productId,
      itemCount: quantity,
      size: selectedSize,
      color: selectedColor,
      itemName: product[0]?.itemName, // 필수 데이터 추가
      itemPrice: product[0]?.itemPrice, // 필수 데이터 추가
      mainImage: product[0]?.mainImage, // 필수 데이터 추가
    };

    try {
      const response = await call(
        `/basket/saveBasket`,
        'POST',
        JSON.stringify(basketData)
      );

      if (!response.ok) {
        // throw new Error('Failed to save basket');
      }

      // 전역 상태 업데이트
      addToCart({
        ...basketData,
        basketId: response.basketId, // 서버에서 반환된 basketId 추가
      });

      window.location.reload();
      alert('장바구니에 추가되었습니다!');
    } catch (error) {
      console.error('장바구니 저장 실패:', error);
      alert('장바구니 저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      {productId && (
        <>
          <div className="container">
            <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
              {/* Fetch 컴포넌트 */}
              <FetchIdProduct id={productId} onItemFetch={handleFetch} />

              {/* 크럼브 데이터 */}
              <a href="/" className="stext-109 cl8 hov-cl1 trans-04">
                Home
                <i
                  className="fa fa-angle-right m-l-9 m-r-10"
                  aria-hidden="true"
                ></i>
              </a>

              <a href="/product" className="stext-109 cl8 hov-cl1 trans-04">
                Product
                <i
                  className="fa fa-angle-right m-l-9 m-r-10"
                  aria-hidden="true"
                ></i>
              </a>

              {/* 제품 이름 */}
              <span className="stext-109 cl4">
                {product[0]?.itemName || 'Loading...'}
              </span>
            </div>
          </div>

          <section className="sec-product-detail bg0 p-t-65 p-b-60">
            <div className="container">
              <div className="row">
                {/* 이미지 섹션 */}
                <div className="col-md-6 col-lg-7 p-b-30">
                  <div className="p-l-25 p-r-30 p-lr-0-lg">
                    {product.length > 0 && (
                      <div className="flex">
                        {/* 썸네일 */}
                        <div className="thumbnail-list">
                          {product.slice(0, 3).map((product, index) => (
                            <img
                              key={product.itemId}
                              src={`/images/${product.mainImage}`} // 각 제품의 이미지 사용
                              alt={`Thumbnail ${index + 1}`}
                              className={`thumbnail ${currentIndex === index ? 'active' : ''}`}
                              onClick={() => handleThumbnailClick(index)}
                            />
                          ))}
                        </div>

                        {/* 메인 이미지 */}
                        <div className="main-image-container">
                          <button
                            className="nav-arrow prev"
                            onClick={handlePrev}
                          >
                            &#8249;
                          </button>
                          <img
                            src={`/images/${product[0]?.mainImage || ''}`}
                            alt="Main Product"
                            className="main-image"
                          />
                          <i
                            className="fa fa-expand zoom-icon"
                            onClick={toggleZoom}
                          ></i>
                          <button
                            className="nav-arrow next"
                            onClick={handleNext}
                          >
                            &#8250;
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 제품 정보 */}
                <div className="col-md-6 col-lg-5 p-b-30">
                  <div className="p-r-50 p-t-5 p-lr-0-lg">
                    <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                      {product[0]?.itemName || 'Loading...'}
                    </h4>

                    <span className="mtext-106 cl2">
                      {product[0]?.itemPrice?.toLocaleString()} 원
                    </span>

                    <p className="stext-102 cl3 p-t-23">
                      {product[0]?.itemCategory || 'No category available.'}
                    </p>

                    {/* 수량 조정 */}
                    <div className="p-t-33">
                      <div className="flex-w flex-r-m p-b-10">
                        <div className="size-203 flex-c-m respon6">Size</div>
                        <div className="size-204 flex-w flex-m respon6-next">
                          <select
                            className="custom-select"
                            value={selectedSize}
                            onChange={handleSizeChange}
                          >
                            <option>사이즈 선택</option>
                            {Array.from(
                              new Set(product.map((product) => product.size))
                            ).map((uniqueSize, index) => (
                              <option key={index} value={uniqueSize}>
                                {uniqueSize}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex-w flex-r-m p-b-10">
                        <div className="size-203 flex-c-m respon6">Color</div>
                        <div className="size-204 flex-w flex-m respon6-next">
                          <select
                            className="custom-select"
                            value={selectedColor}
                            onChange={handleColorChange}
                          >
                            <option>색상 선택</option>
                            {Array.from(
                              new Set(product.map((product) => product.color))
                            ).map((uniqueColor, index) => (
                              <option key={index} value={uniqueColor}>
                                {uniqueColor}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex-w flex-r-m p-b-10">
                        <div className="size-204 flex-w flex-m respon6-next">
                          <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                            {/* 수량 감소 버튼 */}
                            <div
                              className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                              onClick={decreaseQuantity}
                              style={{ cursor: 'pointer' }} // 버튼 클릭 가능 표시
                            >
                              <i className="fs-16 zmdi zmdi-minus"></i>
                            </div>

                            {/* 수량 표시 */}
                            <input
                              className="mtext-104 cl3 txt-center num-product"
                              type="number"
                              name="num-product"
                              value={quantity}
                              readOnly // 사용자가 직접 수정하지 못하도록 설정
                              style={{ textAlign: 'center' }}
                            />

                            {/* 수량 증가 버튼 */}
                            <div
                              className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                              onClick={increaseQuantity}
                              style={{ cursor: 'pointer' }} // 버튼 클릭 가능 표시
                            >
                              <i className="fs-16 zmdi zmdi-plus"></i>
                            </div>
                          </div>

                          <button
                            onClick={handleSaveBasket}
                            className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail"
                          >
                            장바구니
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex-w flex-m p-l-100 p-t-40 respon7">
                      <div className="flex-m bor9 p-r-10 m-r-11">
                        <a
                          href="#"
                          className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100"
                          data-tooltip="Add to Wishlist"
                        >
                          <i className="zmdi zmdi-favorite"></i>
                        </a>
                      </div>

                      <a
                        href="#"
                        className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                        data-tooltip="Facebook"
                      >
                        <i className="fa fa-facebook"></i>
                      </a>

                      <a
                        href="#"
                        className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                        data-tooltip="Twitter"
                      >
                        <i className="fa fa-twitter"></i>
                      </a>

                      <a
                        href="#"
                        className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                        data-tooltip="Google Plus"
                      >
                        <i className="fa fa-google-plus"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bor10 m-t-50 p-t-43 p-b-40">
                <div className="tab01">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item p-b-10">
                      <button
                        className={`nav-link ${activeTab === 'description' ? 'active' : ''}`}
                        onClick={() => handleTabClick('description')}
                      >
                        상품설명
                      </button>
                    </li>
                    <li className="nav-item p-b-10">
                      <button
                        className={`nav-link ${activeTab === 'information' ? 'active' : ''}`}
                        onClick={() => handleTabClick('information')}
                      >
                        상품정보
                      </button>
                    </li>
                    <li className="nav-item p-b-10">
                      <FetchCountReview
                        itemId={productId}
                        onCountFetch={setCountReview}
                      />
                      <button
                        className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
                        onClick={() => handleTabClick('reviews')}
                      >
                        리뷰( {countReview} )
                      </button>
                    </li>
                    <li className="nav-item p-b-10">
                      <FetchCountInquiry
                        itemId={productId}
                        onCountFetch={setCountInquiry}
                      />
                      <button
                        className={`nav-link ${activeTab === 'QnA' ? 'active' : ''}`}
                        onClick={() => handleTabClick('inquiry')}
                      >
                        문의 사항 ( {countInquiry} )
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content p-t-43">
                    {/* Description Tab */}
                    <div
                      className={`tab-pane fade ${activeTab === 'description' ? 'show active' : ''}`}
                      id="description"
                      role="tabpanel"
                    >
                      <div className="how-pos2 p-lr-15-md">
                        <p className="stext-102 cl6">
                          Aenean sit amet gravida nisi. Nam fermentum est felis,
                          quis feugiat nunc fringilla sit amet. Ut in blandit
                          ipsum. Quisque luctus dui at ante aliquet, in
                          hendrerit lectus interdum. Morbi elementum sapien
                          rhoncus pretium maximus. Nulla lectus enim, cursus et
                          elementum sed, sodales vitae eros. Ut ex quam, porta
                          consequat interdum in, faucibus eu velit. Quisque
                          rhoncus ex ac libero varius molestie. Aenean tempor
                          sit amet orci nec iaculis. Cras sit amet nulla libero.
                          Curabitur dignissim, nunc nec laoreet consequat, purus
                          nunc porta lacus, vel efficitur tellus augue in ipsum.
                          Cras in arcu sed metus rutrum iaculis. Nulla non
                          tempor erat. Duis in egestas nunc.
                        </p>
                      </div>
                    </div>

                    {/* Information Tab */}
                    <div
                      className={`tab-pane fade ${activeTab === 'information' ? 'show active' : ''}`}
                      id="information"
                      role="tabpanel"
                    >
                      <div className="row">
                        <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                          <ul className="p-lr-28 p-lr-15-sm">
                            <li className="flex-w flex-t p-b-7">
                              <span className="stext-102 cl3 size-205">
                                Weight
                              </span>
                              <span className="stext-102 cl6 size-206">
                                0.79 kg
                              </span>
                            </li>
                            <li className="flex-w flex-t p-b-7">
                              <span className="stext-102 cl3 size-205">
                                Dimensions
                              </span>
                              <span className="stext-102 cl6 size-206">
                                110 x 33 x 100 cm
                              </span>
                            </li>
                            <li className="flex-w flex-t p-b-7">
                              <span className="stext-102 cl3 size-205">
                                Materials
                              </span>
                              <span className="stext-102 cl6 size-206">
                                면 60%
                              </span>
                            </li>
                            <li className="flex-w flex-t p-b-7">
                              <span className="stext-102 cl3 size-205">
                                Color
                              </span>
                              <span className="stext-102 cl6 size-206">
                                Black, Blue, Grey, Green, Red, White
                              </span>
                            </li>
                            <li className="flex-w flex-t p-b-7">
                              <span className="stext-102 cl3 size-205">
                                Size
                              </span>
                              <span className="stext-102 cl6 size-206">
                                32-40
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/** Reviews Tab */}
                    <ReviewInput
                      activeTab={activeTab}
                      userId={userId}
                      productId={productId}
                    />

                    {/** Inquiry Tab */}
                    <ItemInquiry
                      activeTab={activeTab}
                      userId={userId}
                      productId={productId}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg6 flex-c-m flex-w size-302 m-t-73 p-tb-15">
              <span className="stext-107 cl6 p-lr-25">SKU: JAK-01</span>

              <span className="stext-107 cl6 p-lr-25">
                Categories: Jacket, Men
              </span>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Detail;
