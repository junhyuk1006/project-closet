import React, { useState, useEffect } from 'react';

/** custom css 및 react icon */
import '../../assets/styles/detailItem/ReviewInput.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LockIcon from '@mui/icons-material/Lock';

/** api */
import FetchIdProduct from '../../api/item/FetchIdProduct';

function ItemInquiry({ activeTab, userId, productId }) {
  /** 리뷰, 드롭다운 상태, 폼 입력 상태를 관리하기 위한 state */
  const [inquiries, setInquiries] = useState([]); // 문의 목록
  const [dropdownStates, setDropdownStates] = useState({}); // 드롭다운 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [inquiryContent, setInquiryContent] = useState(''); // 작성 중인 문의 내용
  const [inquiryType, setInquiryType] = useState('ProductInquiry'); // 문의 유형 (기본값: 상품문의)
  const [showAnswers, setShowAnswers] = useState({}); // 문의별 답변 노출 상태

  /** 페이지 당 문의 수 */
  const inquiriesPerPage = 4; // 한 페이지에 보여줄 문의 개수

  /** 페이지네이션 계산 */
  const totalPages = Math.ceil(inquiries.length / inquiriesPerPage); // 전체 페이지 수 계산
  const indexOfLastInquiry = currentPage * inquiriesPerPage; // 현재 페이지 마지막 문의의 인덱스
  const indexOfFirstInquiry = indexOfLastInquiry - inquiriesPerPage; // 현재 페이지 첫 문의의 인덱스
  const currentInquires = inquiries.slice(
    indexOfFirstInquiry,
    indexOfLastInquiry
  ); // 현재 페이지에 보여줄 문의 목록

  /** handler 동작 시 react 내 기능으로만 구현 */
  /** 특정 문의의 드롭다운 상태 토글 */
  const toggleDropdown = (inquiryId) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [inquiryId]: !prevState[inquiryId],
    }));
  };

  /** 페이지 변경 핸들러 */
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // 선택한 페이지로 변경
  };

  /** 문의 유형 변경 핸들러 */
  const handleInquiryTypeChange = (e) => {
    setInquiryType(e.target.value); // 선택한 문의 유형 설정
  };

  /** 문의 클릭 핸들러 (답변 보기 토글) */
  const handleInquiryClick = (inquiryId, answerStatus) => {
    if (answerStatus === 'Answered') {
      setShowAnswers((prev) => ({
        ...prev,
        [inquiryId]: !prev[inquiryId], // 클릭 시 답변 상태 토글
      }));
    }
  };

  /** handler 동작 시 API 호출 필요한 로직*/
  /** 상품 문의 목록 API 호출 */
  const fetchInquiries = async () => {
    try {
      const response = await fetch(
        `http://localhost/api/inquiry/getInquiries/${productId}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      setInquiries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('문의 데이터를 가져오는 중 오류 발생:', error);
      setInquiries([]);
    }
  };

  /** 상품 문의 저장 API 호출 */
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 동작 방지
    if (!userId) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      /** 작성 중인 문의 데이터를 JSON 형태로 설정 */
      const inquiryData = {
        userId: userId,
        itemDetailId: productId,
        inquiryType: inquiryType,
        content: inquiryContent,
      };

      /** 문의 저장 API 호출 */
      const response = await fetch(
        'http://localhost:80/api/inquiry/saveInquiry',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inquiryData),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        alert(result.message || '문의 저장 실패');
      }

      alert(result.message);
      setInquiryContent('');
      await fetchInquiries(); // 최신 데이터 불러오기
    } catch (error) {
      console.error('문의 저장 중 오류 발생:', error);
      alert('문의 저장 실패');
    }
  };

  /** 문의 비활성화 API 호출 */
  const handleDeactivate = async (InquiryId) => {
    try {
      const response = await fetch(
        `http://localhost:80/api/inquiry/deactivateInquiry/${InquiryId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }
      );

      if (!response.ok) throw new Error('문의 비활성화 실패');
      alert('문의가 성공적으로 비활성화되었습니다.');
      fetchInquiries();
      setDropdownStates({}); // 드롭다운 상태 초기화
      setShowAnswers({});
    } catch (error) {
      console.error('문의 비활성화 중 오류 발생:', error);
    }
  };

  /** 문의 활성화 API 호출 */
  const handleActivate = async (InquiryId) => {
    try {
      const response = await fetch(
        `http://localhost:80/api/inquiry/activateInquiry/${InquiryId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }
      );

      if (!response.ok) throw new Error('문의 활성화 실패');
      alert('문의가 성공적으로 활성화되었습니다.');
      fetchInquiries();
      setDropdownStates({});
      setShowAnswers({}); // 답변 상태 초기화
    } catch (error) {
      console.error('문의 활성화 중 오류 발생:', error);
    }
  };

  /** 컴포넌트 초기화 [productId, activeTab] 데이터 변경 시 내부에 있는 함수가 F5 된다 생각하면 편함 */
  useEffect(() => {
    fetchInquiries(); // 문의 목록 불러오기
    setShowAnswers({}); // 답변 상태 초기화
    const handleClickOutside = () => {
      setDropdownStates({}); // 드롭다운 상태 초기화
    };

    document.addEventListener('click', handleClickOutside); // 클릭 감지
    return () => document.removeEventListener('click', handleClickOutside); // 이벤트 해제
  }, [productId, activeTab]);

  return (
    <>
      {/** 상품 ID를 기반으로 상품 데이터 가져오기 */}
      <FetchIdProduct item_id={productId} onReviewFetch={setInquiries} />
      <div
        className={`tab-pane fade ${activeTab === 'inquiry' ? 'show active' : ''}`}
        id="inquiry"
        role="tabpanel"
      >
        <div className="row">
          <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
            <div className="p-b-30 m-lr-15-sm">
              {/** 문의 목록 렌더링 */}
              {currentInquires.map((inquiry) => (
                <div key={inquiry.inquiryId} className="inquiry-container">
                  <div
                    className="inquiry-main flex-w-review flex-t p-bst-68"
                    style={{
                      cursor:
                        inquiry.answerStatus === 'Answered'
                          ? 'pointer'
                          : 'default',
                    }}
                    onClick={() =>
                      handleInquiryClick(
                        inquiry.inquiryId,
                        inquiry.answerStatus
                      )
                    }
                  >
                    <div className="wrap-pic-s size-109 bor0 of-hidden m-r-18 m-t-6">
                      <img
                        src={`images/${inquiry.profileImage}`}
                        alt={inquiry.nickname}
                      />
                    </div>
                    <div className="size-207">
                      <div className="flex-w-review flex-sb-m p-b-17-review">
                        <span className="mtext-107 cl2 p-r-20">
                          {inquiry.nickname}
                        </span>
                        {inquiry.inquiryType && (
                          <span className="inquiry-type-badge">
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
                        )}
                        {inquiry.answerStatus && (
                          <span className="inquiry-answerStatus-badge">
                            {(() => {
                              switch (inquiry.answerStatus) {
                                case 'Pending':
                                  return '답변 대기';
                                case 'Answered':
                                  return '답변 완료';
                                default:
                                  return inquiry.answerStatus;
                              }
                            })()}
                          </span>
                        )}
                        <div
                          className="menu-icon-wrapper"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {userId && inquiry.userId === userId && (
                            <>
                              <MoreHorizIcon
                                style={{ fontSize: 25, cursor: 'pointer' }}
                                onClick={() =>
                                  toggleDropdown(inquiry.inquiryId)
                                }
                              />
                              {dropdownStates[inquiry.inquiryId] && (
                                <div className="dropdown-menu">
                                  {inquiry.status === 'inactive' ? (
                                    <button
                                      onClick={() =>
                                        handleActivate(inquiry.inquiryId)
                                      }
                                      className="dropdown-item"
                                    >
                                      활성화
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() =>
                                        handleDeactivate(inquiry.inquiryId)
                                      }
                                      className="dropdown-item"
                                    >
                                      비활성화
                                    </button>
                                  )}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="review-content-wrapper">
                        {inquiry.status === 'inactive' ? (
                          <p className="stext-102 cl6">
                            <LockIcon /> 해당 문의는 사용자의 요청에 따라
                            비활성화되었습니다.
                          </p>
                        ) : (
                          <p className="stext-102 cl6">
                            {inquiry.inquiryContent}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/** 답변 영역 렌더링 */}
                  {inquiry.status === 'active' &&
                    inquiry.answerStatus === 'Answered' &&
                    showAnswers[inquiry.inquiryId] && (
                      <div className="answer-content">
                        <h6>관리자 답변:</h6>
                        <p>
                          {inquiry.answer
                            ? inquiry.answer
                            : '답변 내용이 없습니다.'}
                        </p>
                      </div>
                    )}
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

              {/** 문의 작성 폼 */}
              <form onSubmit={handleSubmit} className="w-full">
                <h5 className="mtext-108 cl2 p-b-7">문의 작성</h5>
                <div className="stext-102 cl6">
                  <p className="inquiry-info-text">
                    <ArrowRightIcon /> 문의 작성 후 목록에서 관리 가능합니다.
                  </p>
                  <ArrowRightIcon />
                  답변 완료된 문의는 클릭하여 답변 확인이 가능합니다.
                </div>
                <input type="hidden" value={userId || ''} name="userId" />
                <input type="hidden" value={productId || ''} name="productId" />
                <div className="flex-w flex-m p-t-50 p-b-23">
                  <div className="inquiry-type-dropdown">
                    <label htmlFor="inquiry-type" style={{ width: '100%' }}>
                      문의 유형
                    </label>
                    <select
                      id="inquiry-type"
                      value={inquiryType}
                      onChange={handleInquiryTypeChange}
                      className="size-110-inquiry bor8 stext-102 cl2 p-lr-20 p-tb-10"
                    >
                      <option value="ProductInquiry">상품문의</option>
                      <option value="ExchangeInquiry">교환문의</option>
                      <option value="ReturnInquiry">반품문의</option>
                      <option value="OtherInquiry">기타문의</option>
                    </select>
                  </div>
                </div>
                <div className="row p-b-25">
                  <div className="col-12 p-b-5">
                    <textarea
                      className="size-110 bor8 stext-102 cl2 p-lr-20 p-tb-10"
                      value={inquiryContent}
                      onChange={(e) => setInquiryContent(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <button
                  className="flex-c-m stext-101 cl0 size-112 bg7 bor11 hov-btn3 p-lr-15 trans-04 m-b-10"
                  type="submit"
                >
                  작성하기
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemInquiry;
