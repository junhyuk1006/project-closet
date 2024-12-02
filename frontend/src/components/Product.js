import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Product({ products, activeFilter }) {
  const [isLiked, setIsLiked] = useState({});

  const toggleLike = (id) => {
    console.log(`${id}번의 Like를 클릭하였습니다.`);
    setIsLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="row isotope-grid">
      {products
        .filter(
          (product) => activeFilter === '*' || product.category === activeFilter
        )
        .map((product) => (
          <div
            key={product.id}
            className={`col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${product.category}`}
          >
            <div className="block2">
              <div className="block2-pic hov-img0">
                <img src={product.image} alt="IMG-PRODUCT" />

                <Link
                  to="#"
                  className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                >
                  Quick View
                </Link>
              </div>

              <div className="block2-txt flex-w flex-t p-t-14">
                <div className="block2-txt-child1 flex-col-l ">
                  <Link
                    to={`/product/${product.id}`}
                    className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                  >
                    {product.name}
                  </Link>

                  <span className="stext-105 cl3">￦{product.price}</span>
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
