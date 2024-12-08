import React, { useState, useEffect } from "react";

/** custom css 및 react icon   */
import "../../assets/styles/DetailItem/ReviewInput.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import LockIcon from '@mui/icons-material/Lock';

/** api */
import FetchIdProduct from "../../api/item/FetchIdProduct";


function ItemInquiry({ activeTab, userId, productId }) {

    /** 리뷰, 드롭다운 상태, 폼 입력 상태를 관리하기 위한 state */
    const [inquiries, setInquiries] = useState([]); // 문의 목록
    const [dropdownStates, setDropdownStates] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [inquiryContent, setInquiryContent] = useState(""); // 문의 내용
    const [inquiryType, setInquiryType] = useState("ProductInquiry"); // Default inquiry type
    const [showAnswers, setShowAnswers] = useState({}); // 각 문의의 답변 노출 상태 관리

    /** 페이지 당 리뷰 수 */
    const inquiriesPerPage = 4;


    /** 특정 상품 문의의 드롭다운을 토글 */
    const toggleDropdown = (inquiryId) => {
        setDropdownStates((prevState) => ({
            ...prevState,
            [inquiryId]: !prevState[inquiryId],
        }));
    };

    const fetchInquiries = async () => {
        try {
            const response = await fetch(`http://localhost/api/inquiry/getInquiries/${productId}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setInquiries(Array.isArray(data) ? data : []); // 데이터가 배열인지 확인 후 설정
        } catch (error) {
            console.error("Error fetching inquiries:", error);
            setInquiries([]); // 오류 시 빈 배열로 설정
        }
    };

    /** 컴포넌트가 마운트될 때 리뷰 데이터를 가져오고, 드롭다운 외부 클릭을 감지하여 닫기 */
    useEffect(() => {

        fetchInquiries();
        setShowAnswers({});
        const handleClickOutside = () => {
            setDropdownStates({});
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [productId, activeTab]);

    /** 드롭다운 내부 클릭 시 이벤트 전파를 막음 */
    const handleDropdownClick = (event) => {
        event.stopPropagation();
    };

    /** 페이지네이션 계산 */
    const totalPages = Math.ceil(inquiries.length / inquiriesPerPage);
    const indexOfLastInquiry = currentPage * inquiriesPerPage;
    const indexOfFirstInquiry = indexOfLastInquiry - inquiriesPerPage;
    const currentInquires = inquiries.slice(indexOfFirstInquiry, indexOfLastInquiry);

    /** 페이지 변경 핸들러 */
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    /** 상품 문의 비활성화 핸들러 */
    const handleDeactivate = async (reviewId) => {
        try {
            const response = await fetch(`http://localhost:80/api/inquiry/deactivateInquiry/${reviewId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!response.ok) throw new Error("상품 문의 비활성화 실패");
            alert("상품 문의가 성공적으로 비활성화되었습니다.");
            fetchInquiries();
            setDropdownStates({});
            setShowAnswers({});
        } catch (error) {
            console.error("상품 문의 비활성화 중 오류 발생:", error);
        }
    };

    /** 상품 문의 활성화 핸들러 */
    const handleActivate = async (reviewId) => {
        try {
            const response = await fetch(`http://localhost:80/api/inquiry/activateInquiry/${reviewId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!response.ok) throw new Error("상품 문의 활성화 실패");
            alert("상품 문의가 성공적으로 활성화되었습니다.");
            fetchInquiries();
            setDropdownStates({});
            setShowAnswers({});
        } catch (error) {
            console.error("상품 문의 활성화 중 오류 발생:", error);
        }
    };

    /** 상품 문의 작성 폼 제출 핸들러 */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            /** 상품 문의 저장 데이터 (Json 형태) */
            const inquiryData = {
                userId: userId,
                itemDetailId: productId,
                inquiryType: inquiryType,
                content: inquiryContent,
            };

            /** 상품 문의 저장 API */
            const response = await fetch('http://localhost:80/api/inquiry/saveInquiry', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inquiryData),
            });

            const result = await response.json();
            if (!response.ok) {
                alert(result.message || "상품 문의 저장 실패");
            }

            alert(result.message);
            setInquiryContent("");
            await fetchInquiries();

        } catch (error) {
            console.error("상품 문의 저장 중 오류 발생:", error);
            alert("상품 문의 저장 실패");
        }
    };

    const handleInquiryTypeChange = (e) => {
        const selectedValue = e.target.value; // Ensure correct value is captured
        setInquiryType(selectedValue);
    };

    /** 문의 박스 클릭 핸들러: Answered 상태일 경우 답변 토글 */
    const handleInquiryClick = (inquiryId, answerStatus) => {
        if (answerStatus === "Answered") {
            setShowAnswers(prev => ({
                ...prev,
                [inquiryId]: !prev[inquiryId]
            }));
        }
    }

    return (
        <>
            <FetchIdProduct item_id={productId} onReviewFetch={setInquiries} />
            <div className={`tab-pane fade ${activeTab === 'inquiry' ? 'show active' : ''}`} id="inquiry" role="tabpanel">
                <div className="row">
                    <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                        <div className="p-b-30 m-lr-15-sm">
                            {/** 리뷰 목록 렌더링 */}
                            {currentInquires.map((inquiry) => (
                                <div key={inquiry.inquiryId} className="inquiry-container">
                                    <div
                                        className="inquiry-main flex-w-review flex-t p-bst-68"
                                        style={{cursor: inquiry.answerStatus === "Answered" ? "pointer" : "default"}}
                                        onClick={() => handleInquiryClick(inquiry.inquiryId, inquiry.answerStatus)}
                                    >
                                        <div className="wrap-pic-s size-109 bor0 of-hidden m-r-18 m-t-6">
                                            <img src={`images/${inquiry.profileImage}`} alt={inquiry.nickname}/>
                                        </div>
                                        <div className="size-207">
                                            <div className="flex-w-review flex-sb-m p-b-17-review">
                                                <span className="mtext-107 cl2 p-r-20">{inquiry.nickname}</span>
                                                {inquiry.inquiryType && (
                                                    <span className="inquiry-type-badge">
                                                        {(() => {
                                                            switch (inquiry.inquiryType) {
                                                                case "ProductInquiry":
                                                                    return "상품문의";
                                                                case "ExchangeInquiry":
                                                                    return "교환문의";
                                                                case "ReturnInquiry":
                                                                    return "반품문의";
                                                                case "OtherInquiry":
                                                                    return "기타문의";
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
                                                                case "Pending":
                                                                    return "답변 대기";
                                                                case "Answered":
                                                                    return "답변 완료";
                                                                default:
                                                                    return inquiry.answerStatus;
                                                            }
                                                        })()}
                                                    </span>
                                                )}
                                                <div className="menu-icon-wrapper" onClick={(e) => e.stopPropagation()}>
                                                    {userId && inquiry.userId === userId && (
                                                        <>
                                                            <MoreHorizIcon
                                                                style={{ fontSize: 25, cursor: "pointer" }}
                                                                onClick={() => toggleDropdown(inquiry.inquiryId)}
                                                            />
                                                            {dropdownStates[inquiry.inquiryId] && (
                                                                <div className="dropdown-menu">
                                                                    {inquiry.status === "inactive" ? (
                                                                        <button
                                                                            onClick={() => handleActivate(inquiry.inquiryId)}
                                                                            className="dropdown-item"
                                                                        >
                                                                            활성화
                                                                        </button>
                                                                    ) : (
                                                                        <button
                                                                            onClick={() => handleDeactivate(inquiry.inquiryId)}
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
                                                {inquiry.status === "inactive" ? (
                                                    <p className="stext-102 cl6"><LockIcon /> 해당 상품 문의는 유저의 요청에 의해 비활성화되었습니다.</p>
                                                ) : (
                                                    <p className="stext-102 cl6">{inquiry.inquiryContent}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/** 여기서 inquiry-main 아래에 조건부로 답변 영역을 출력 */}
                                    {inquiry.status === "active" && inquiry.answerStatus === "Answered" && showAnswers[inquiry.inquiryId] && (
                                        <div className="answer-content">
                                            <h6>관리자 답변:</h6>
                                            <p>{inquiry.answer ? inquiry.answer : "답변 내용이 없습니다."}</p>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/** 페이지네이션 */}
                            <div className="pagination">
                                {Array.from({length: totalPages}, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={currentPage === i + 1 ? "active" : ""}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            {/** 리뷰 작성 폼 */}
                            <form onSubmit={handleSubmit} className="w-full">
                                <h5 className="mtext-108 cl2 p-b-7">Inquiry Info</h5>
                                <div className="stext-102 cl6">
                                    <p className="inquiry-info-text"><ArrowRightIcon/> 문의 작성 후 문의 목록 박스 오른쪽 상단 메뉴를 통해 비활성화가 가능합니다.</p>
                                    <ArrowRightIcon/>  답변 완료일 경우 문의를 클릭하시면 답변 확인이 가능합니다.
                                </div>
                                <input type="hidden" value={userId || ""} name="userId"/>
                                <input type="hidden" value={productId || ""} name="productId"/>
                                <div className="flex-w flex-m p-t-50 p-b-23">
                                    <div className="inquiry-type-dropdown">
                                        <label htmlFor="inquiry-type" style={{width: "100%"}}>문의 유형</label>
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
                                    문의 작성
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