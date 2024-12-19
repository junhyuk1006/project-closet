import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router의 useNavigate 가져오기
import MyPageHeader from '../../components/myPage/MyPageHeader';
import Pagination from '../public/Pagination'; // 페이지네이션 컴포넌트
import { call } from '../../api/auth/ApiService';
import '../../assets/styles/myPage/MyPage.css';
import '../../assets/styles/detailItem/ReviewInput.css';

/** Material-UI Icons */
import LockIcon from '@mui/icons-material/Lock';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]); // 리뷰 데이터를 저장
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호
  const pageSize = 5; // 페이지당 리뷰 수
  const [loading, setLoading] = useState(true); // 로딩 상태
  const navigate = useNavigate(); // useNavigate 초기화

  // API 호출 함수
  const fetchMyReviews = async (page) => {
    try {
      const response = await call(
        `/api/mypage/getMyReviews?page=${page}&size=${pageSize}`,
        'GET'
      );

      // 응답 데이터 처리
      setReviews(response?.data?.content || []); // content를 상태에 저장
      setTotalPages(response?.data?.totalPages || 0); // 총 페이지 수 저장
    } catch (error) {
      console.error('API 호출 중 오류:', error);
      setReviews([]); // 에러 시 빈 데이터로 초기화
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 및 페이지 변경 시 API 호출
  useEffect(() => {
    fetchMyReviews(currentPage);
  }, [currentPage]); // currentPage가 변경될 때만 호출

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="my-reviews-container">
      <MyPageHeader
        title="나의 활동내역"
        description="내가 등록한 상품 리뷰, 게시판, 댓글을 조회할 수 있습니다."
      />
      <div className="review-rounded-box">
        {loading ? (
          <p>로딩 중...</p>
        ) : reviews.length === 0 ? (
          <p>등록된 리뷰가 없습니다.</p>
        ) : (
          <table className="review-table">
            <thead>
              <tr>
                <th>상품명</th>
                <th>리뷰</th>
                <th>별점</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr
                  key={review.reviewId}
                  style={{ cursor: 'pointer' }} // 클릭 가능하게 스타일 추가
                >
                  <td>{review.itemName}</td>
                  <td>
                    {review.status === 'inactive' ? (
                      <span>
                        <LockIcon fontSize="small" /> 비활성화된 리뷰입니다.
                      </span>
                    ) : (
                      review.reviewContent
                    )}
                  </td>
                  <td>{'⭐'.repeat(review.score)}</td>
                  <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 페이지네이션 컴포넌트 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        blockSize={5} // 페이지네이션 블록 크기
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MyReviews;
