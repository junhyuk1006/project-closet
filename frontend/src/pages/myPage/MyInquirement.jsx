import React, { useState, useEffect } from 'react';
import MyPageHeader from '../../components/myPage/MyPageHeader';
import Pagination from '../../pages/public/Pagination'; // 페이지네이션 컴포넌트
import { call } from '../../api/auth/ApiService';

const MyInquirement = () => {
  const [myInquiries, setMyInquiries] = useState([]); // 문의 내역 상태
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const [showDetails, setShowDetails] = useState({}); // 토글 상태 관리
  const pageSize = 5; // 페이지당 문의 수

  // API 호출: 사용자 문의 내역 가져오기
  const fetchMyInquiries = async (page) => {
    try {
      const response = await call(
        `/api/mypage/getInquiriesByUser?page=${page}&size=${pageSize}`,
        'GET'
      );
      setMyInquiries(response?.data?.content || []);
      setTotalPages(response?.data?.totalPages || 0);
    } catch (error) {
      console.error('문의 내역 조회 중 오류 발생:', error);
      setMyInquiries([]);
      setTotalPages(0);
    }
  };

  useEffect(() => {
    fetchMyInquiries(currentPage);
  }, [currentPage]);

  // 토글 상태 변경 함수
  const toggleDetails = (inquiryId) => {
    setShowDetails((prev) => ({
      ...prev,
      [inquiryId]: !prev[inquiryId],
    }));
  };

  return (
    <div>
      <MyPageHeader
        title="문의 내역"
        description="내가 등록한 모든 문의 내역을 조회할 수 있습니다."
      />
      <div className="inquiry-rounded-box">
        {myInquiries.length > 0 ? (
          myInquiries.map((inquiry) => (
            <div key={inquiry.inquiryId} className="inquiry-container">
              {/* 제목과 상태를 한 줄에 정렬 */}
              <div
                className="inquiry-main"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  padding: '10px 0',
                }}
                onClick={() => toggleDetails(inquiry.inquiryId)}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="mypage-inquiry-type">
                    {(() => {
                      switch (inquiry.inquiryType) {
                        case 'ProductInquiry':
                          return '상품문의';
                        case 'ExchangeInquiry':
                          return '교환문의';
                        case 'ReturnInquiry':
                          return '반품문의';
                        case 'OtherInquiry':
                          return '기타문의';
                        default:
                          return inquiry.inquiryType;
                      }
                    })()}
                  </span>

                  <span className="mypage-inquiry-status">
                    {inquiry.answerStatus === 'Answered'
                      ? '답변 완료'
                      : '답변 대기'}
                  </span>

                  <span className="mypage-inquiry-content">
                    {inquiry.inquiryContent}
                  </span>
                </div>
                <div
                  className="mypage-inquiry-date"
                  style={{ color: 'gray', fontSize: '0.9rem' }}
                >
                  {new Date(inquiry.createdAt).toLocaleDateString('ko-KR')}
                </div>
              </div>
              {/* 토글된 내용 */}
              {showDetails[inquiry.inquiryId] && (
                <div
                  className="inquiry-details"
                  style={{
                    padding: '10px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '5px',
                    margin: '10px 0',
                  }}
                >
                  {' '}
                  {inquiry.answer ? (
                    <div
                      className="mypage-inquiry-details"
                      style={{
                        display: 'flex',
                        flexDirection: 'column', // 세로로 배치
                        alignItems: 'flex-start',
                      }}
                    >
                      <p>{inquiry.answer}</p>
                      <div
                        className="mypage-inquiry-date"
                        style={{ color: 'gray', fontSize: '0.9rem' }}
                      >
                        {new Date(inquiry.answerCreateAt).toLocaleDateString(
                          'ko-KR'
                        )}
                      </div>
                    </div>
                  ) : (
                    <p style={{ color: 'gray' }}>
                      답변이 아직 등록되지 않았습니다.
                    </p>
                  )}
                </div>
              )}{' '}
              <hr className="my-4" />
            </div>
          ))
        ) : (
          <p>등록된 문의 내역이 없습니다.</p>
        )}
      </div>

      {/* 페이지네이션 컴포넌트 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        blockSize={5}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default MyInquirement;
