import StarRating from "../../components/Rating/StarRating";
import React, {useState} from "react";
import FetchAllReview from "../../api/Review/FetchAllReview";
import "./ReviewInput.css"
import { savePoint } from "../../api/point/FetchSavePoint";

function ReviewInput({activeTab, userId, productId}) {
    const [reviews, setReviews] = useState([]);
    const [reviewImage, setReviewImage] = useState("");
    const [reviewContent, setReviewContent] = useState("");
    const [score, setScore] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 4; // 한 페이지에 표시할 리뷰 수

    // 현재 페이지에 표시할 리뷰 계산
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            const reviewData = {
                user_id: userId,
                item_id: productId,
                score: score,
                review_image: reviewImage || null,
                review_content: reviewContent,
            };

            console.log("reviewData:", reviewData);

            const response = await fetch('http://localhost:80/api/saveReview', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reviewData),
            });

            console.log("Response status:", response.status);

            if (!response.ok) {
                const result = await response.text();
                console.error("Error:", result);
                alert("Failed to save the Review");
                return;
            }

            alert("소중한 리뷰 작성 감사합니다.");
            setReviewContent("");
            setScore(0);

            // 새로운 리뷰 저장 후 리뷰 리스트 갱신
            fetch(`http://localhost:80/api/findAllReview/${productId}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data) {
                        setReviews(data); // reviews 상태 업데이트
                    }
                })
                .catch((error) => console.error("Error fetching reviews:", error));

            const reviewPoint = {
                userId: userId,
                point: 100,
                pointReason: "일반 리뷰 작성 보상",
                pointType: "normal_review"
            };

            alert("리뷰 작성으로 100포인트 적립되었습니다.");
            await savePoint(reviewPoint); // 포인트 저장 호출
        } catch (error) {
            console.log("Error saving review:", error);
            alert("Failed to save the Review");
        }
    };

    const handleRatingChange = (score) => {
        setScore(score)
    }

    return (
        <>
            <FetchAllReview item_id={productId} onReviewFetch={setReviews}/>
            <div
                className={`tab-pane fade ${activeTab === 'reviews' ? 'show active' : ''}`}
                id="reviews"
                role="tabpanel"
            >
                <div className="row">
                    <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                        <div className="p-b-30 m-lr-15-sm">
                            {currentReviews.map((review) => (
                                <div key={review.id} className="flex-w flex-t p-b-68">
                                    <div className="wrap-pic-s size-109 bor0 of-hidden m-r-18 m-t-6">
                                        <img
                                            src={`images/${review.profileImage}`}
                                            alt={review.nickname}
                                        />
                                    </div>
                                    <div className="size-207">
                                        <div className="flex-w flex-sb-m p-b-17">
                                            <span className="mtext-107 cl2 p-r-20">
                                                {review.nickname}
                                            </span>
                                            <span className="fs-18 cl11">
                                            {/* 별점 반복 출력 */}
                                                {Array.from({ length: review.score }, (_, i) => (
                                                    <i key={i} className="zmdi zmdi-star"></i>
                                                ))}
                                            </span>
                                        </div>
                                        <p className="stext-102 cl6">{review.review_content}</p>
                                    </div>
                                </div>
                            ))}

                            {/* 페이지 네비게이션 */}
                            <div className="pagination">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={currentPage === i + 1 ? "active" : ""}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            <form onSubmit={handleSubmit} className="w-full">
                                <h5 className="mtext-108 cl2 p-b-7">Add a review</h5>
                                <p className="stext-102 cl6">
                                    Your email address will not be published. Required
                                    fields are marked *
                                </p>
                                <input type="hidden" value={userId || ""} name="userId"/>
                                <input type="hidden" value={productId || ""} name="productId"/>
                                <div className="flex-w flex-m p-t-50 p-b-23">
                                    <span className="stext-102 cl3 m-r-16">별점</span>
                                    <StarRating totalStars={5} onRatingChange={handleRatingChange}/>
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
    )
}

export default ReviewInput