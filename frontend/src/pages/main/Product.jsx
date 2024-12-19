import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';

export default function Product({ products, activeCategory, activeFilter }) {
  const [isLiked, setIsLiked] = useState({});
  const [isModalOpen, setModalOpen] = useState(false); // 모달 상태 관리
  const [selectedProduct, setSelectedProduct] = useState(null); // 선택한 제품의 상태
  const navigate = useNavigate();

  const toggleLike = (id) => {
    console.log(`${id}번의 Like를 클릭하였습니다.`);
    setIsLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const uniqueProducts = products.reduce((acc, product) => {
    const existing = acc.find((p) => p.itemName === product.itemName);
    if (!existing || product.id < existing.id) {
      return [...acc.filter((p) => p.itemName !== product.itemName), product];
    }
    return acc;
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleNavigate = (product) => {
    navigate(`/Detail`, { state: { productId: product.id } });
  };

  return (
    <div className="row isotope-grid">
      {selectedProduct && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          product={selectedProduct}
        />
      )}

      {uniqueProducts
        .filter(
          (product) =>
            activeCategory === '*' || product.itemCategory === activeCategory
        )
        .sort((a, b) => {
          if (activeFilter === 'sortByRecent') {
            return b.created_at - a.createdAt; // 최신순
          } else if (activeFilter === 'sortByPriceDesc') {
            return (
              parseInt(b.itemPrice, 10) - // 높은 가격순
              parseInt(a.itemPrice, 10)
            );
          } else if (activeFilter === 'sortByPriceAsc') {
            return (
              parseInt(a.itemPrice, 10) - // 낮은 가격순
              parseInt(b.itemPrice, 10)
            );
          } else if (activeFilter === 'sortByRating') {
            // return b.rating - a.rating; // 평점
            return 0; // 구현되지 않은 필터 조건은 정렬 처리하지 않음
          } else if (activeFilter === 'sortByReviews') {
            return b.reviews.length - a.reviews.length; // 리뷰
          }
        })
        .map((product) => (
          <div
            key={product.id}
            className={`col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${product.item_category}`}
          >
            <div className="block2">
              <div className="block2-pic hov-img0">
                <img src={`images/${product.mainImage}`} alt="IMG-PRODUCT" />

                <button
                  className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04"
                  onClick={() => handleQuickView(product)}
                >
                  Quick View
                </button>
              </div>

              <div className="block2-txt flex-w flex-t p-t-14">
                <div className="block2-txt-child1 flex-col-l ">
                  <button
                    className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                    onClick={() => handleNavigate(product)}
                  >
                    {product.itemName}
                  </button>

                  <span className="stext-105 cl3">
                    {product.itemPrice.toLocaleString()}원
                  </span>
                </div>

                <div className="block2-txt-child2 flex-r p-t-3">
                  <Link
                    to="#"
                    className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                    onClick={() => toggleLike(product.id)}
                  >
                    <img
                      className="icon-heart1 dis-block trans-04"
                      src="images/icons/icon-heart-01.png"
                      alt="ICON"
                    />
                    <img
                      className={`${isLiked[product.id] === true ? 'icon-heart2-liked' : 'icon-heart2'} dis-block trans-04 ab-t-l`}
                      src="images/icons/icon-heart-02.png"
                      alt="ICON"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
