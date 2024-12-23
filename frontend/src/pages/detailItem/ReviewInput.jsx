import React, { useState, useEffect } from 'react';
import { savePoint } from '../../api/point/FetchSavePoint';

/** custom css 및 react icon   */
import '../../assets/styles/detailItem/ReviewInput.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

/** components */
import StarRating from '../../components/rating/StarRating';

/** import Hook */
import { call } from '../../api/auth/ApiService';

/** api */
import FetchAllReview from '../../api/review/FetchAllReview';
import LockIcon from '@mui/icons-material/Lock';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function ReviewInput({ activeTab, userId, productId }) {
  /** 리뷰, 드롭다운 상태, 폼 입력 상태를 관리하기 위한 state */
  const [reviews, setReviews] = useState([]);
  const [dropdownStates, setDropdownStates] = useState({});
  const [reviewImage, setReviewImage] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [score, setScore] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  /** 페이지 당 리뷰 수 */
  const reviewsPerPage = 4;

  /** 특정 상품에 대한 리뷰 데이터를 가져오는 함수 */
  const fetchReviews = async () => {
    try {
      const response = await call(`/api/findAllReview/${productId}`);
      setReviews(response);
      console.log('리뷰 데이터를 성공적으로 불러왔습니다.');
      console.log(response);
    } catch (error) {
      console.error('리뷰 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  /** 특정 리뷰의 드롭다운을 토글 */
  const toggleDropdown = (reviewId) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [reviewId]: !prevState[reviewId],
    }));
  };

  /** 컴포넌트가 마운트될 때 리뷰 데이터를 가져오고, 드롭다운 외부 클릭을 감지하여 닫기 */
  useEffect(() => {
    fetchReviews();

    const handleClickOutside = () => {
      setDropdownStates({});
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [productId]);

  /** 드롭다운 내부 클릭 시 이벤트 전파를 막음 */
  const handleDropdownClick = (event) => {
    event.stopPropagation();
  };

  /** 페이지네이션 계산 */
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  /** 페이지 변경 핸들러 */
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  /** 리뷰 업데이트 핸들러 */
  const handleUpdate = async (reviewId, updatedContent) => {
    try {
      const updatedData = { reviewContent: updatedContent };
      const response = await fetch(
        `http://localhost:80/api/updateReview/${reviewId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) throw new Error('리뷰 업데이트 실패');
      alert('리뷰가 성공적으로 업데이트되었습니다.');
      fetchReviews();
      setDropdownStates({});
    } catch (error) {
      console.error('리뷰 업데이트 중 오류 발생:', error);
    }
  };

  /** 리뷰 비활성화 핸들러 */
  const handleDeactivate = async (reviewId) => {
    try {
      const response = await fetch(
        `http://localhost:80/api/deactivateReview/${reviewId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }
      );

      if (!response.ok) throw new Error('리뷰 비활성화 실패');
      alert('리뷰가 성공적으로 비활성화되었습니다.');
      fetchReviews();
      setDropdownStates({});
    } catch (error) {
      console.error('리뷰 비활성화 중 오류 발생:', error);
    }
  };

  /** 리뷰 활성화 핸들러 */
  const handleActivate = async (reviewId) => {
    try {
      const response = await fetch(
        `http://localhost:80/api/activateReview/${reviewId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }
      );

      if (!response.ok) throw new Error('리뷰 활성화 실패');
      alert('리뷰가 성공적으로 활성화되었습니다.');
      fetchReviews();
      setDropdownStates({});
    } catch (error) {
      console.error('리뷰 활성화 중 오류 발생:', error);
    }
  };

  /** 리뷰 작성 폼 제출 핸들러 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      /** 리뷰 저장 데이터 (Json 형태) */
      const reviewData = {
        userId: userId,
        itemDetailId: productId,
        score,
        reviewImage: reviewImage || null,
        reviewContent: reviewContent,
      };

      /** 리뷰 저장 API */
      const response = await fetch('http://localhost:80/api/saveReview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });

      const result = await response.json();
      if (!response.ok) {
        alert(result.message || '리뷰 저장 실패');
        return;
      }

      alert(result.message);
      setReviewContent('');
      setScore(0);
      await fetchReviews();

      /** 포인트 저장 데이터 (Json 형태) */
      const reviewPoint = {
        userId,
        point: 100,
        pointReason: '일반 리뷰',
        pointType: '적립',
        pointInsertType: 'normal_review',
      };

      alert('리뷰 작성으로 100포인트가 적립되었습니다.');
      await savePoint(reviewPoint);
    } catch (error) {
      console.error('리뷰 저장 중 오류 발생:', error);
      alert('리뷰 저장 실패');
    }
  };

  /** 평점 변경 핸들러 */
  const handleRatingChange = (score) => {
    setScore(score);
  };

  return (
    <>
      <FetchAllReview item_id={productId} onReviewFetch={setReviews} />
      <div
        className={`tab-pane fade ${activeTab === 'reviews' ? 'show active' : ''}`}
        id="reviews"
        role="tabpanel"
      >
        <div className="row">
          <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
            <div className="p-b-30 m-lr-15-sm">
              {/** 리뷰 목록 렌더링 */}
              {currentReviews.map((review) => (
                <div key={review.id} className="flex-w-review flex-t p-bst-68">
                  <div className="wrap-pic-s size-109 bor0 of-hidden m-r-18 m-t-6">
                    <img
                      src="/images/basic.png"
                      alt={review.nickname}
                    />
                  </div>
                  <div className="size-207">
                    <div className="flex-w-review flex-sb-m p-b-17-review">
                      <span className="mtext-107 cl2 p-r-20">
                        {review.nickname}
                      </span>
                      <span className="fs-18 cl11">
                        {Array.from({ length: review.score }, (_, i) => (
                          <i key={i} className="zmdi zmdi-star"></i>
                        ))}
                      </span>
                      <div className="menu-icon-wrapper">
                        {userId && review.userId === userId && (
                          <>
                            <MoreHorizIcon
                              style={{ fontSize: 25, cursor: 'pointer' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleDropdown(review.id);
                              }}
                            />
                            {dropdownStates[review.id] && (
                              <div
                                className="dropdown-menu"
                                onClick={handleDropdownClick}
                              >
                                {review.status === 'inactive' ? (
                                  <button
                                    onClick={() => handleActivate(review.id)}
                                    className="dropdown-item"
                                  >
                                    활성화
                                  </button>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => {
                                        const updatedContent = prompt(
                                          '수정할 내용을 입력하세요:',
                                          review.reviewContent
                                        );
                                        if (updatedContent)
                                          handleUpdate(
                                            review.id,
                                            updatedContent
                                          );
                                      }}
                                      className="dropdown-item"
                                    >
                                      수정
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDeactivate(review.id)
                                      }
                                      className="dropdown-item"
                                    >
                                      비활성화
                                    </button>
                                  </>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="review-content-wrapper">
                      {review.status === 'inactive' ? (
                        <p className="stext-102 cl6">
                          <LockIcon />
                          해당 리뷰는 유저의 요청에 의해 비활성화되었습니다.
                        </p>
                      ) : (
                        <p className="stext-102 cl6">{review.reviewContent}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/** 페이지네이션 */}
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={currentPage === i + 1 ? 'active' : ''}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              {/** 리뷰 작성 폼 */}
              <form onSubmit={handleSubmit} className="w-full">
                <h5 className="mtext-108 cl2 p-b-7">Review Info</h5>
                <p className="stext-102 cl6">
                  <ArrowRightIcon />
                  리뷰 작성을 하여도 리뷰 박스 오른쪽 상단 메뉴를 통해
                  비활성화가 가능합니다.
                </p>
                <input type="hidden" value={userId || ''} name="userId" />
                <input type="hidden" value={productId || ''} name="productId" />
                <div className="flex-w flex-m p-t-50 p-b-23">
                  <span className="stext-102 cl3 m-r-16">별점</span>
                  <StarRating
                    totalStars={5}
                    onRatingChange={handleRatingChange}
                  />
                </div>
                <div className="row p-b-25">
                  <div className="col-12 p-b-5">
                    <textarea
                      className="size-110 bor8 stext-102 cl2 p-lr-20 p-tb-10"
                      value={reviewContent}
                      onChange={(e) => setReviewContent(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <button
                  className="flex-c-m stext-101 cl0 size-112 bg7 bor11 hov-btn3 p-lr-15 trans-04 m-b-10"
                  type="submit"
                >
                  리뷰 작성
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewInput;
