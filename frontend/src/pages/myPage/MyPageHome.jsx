import React, { useState, useEffect } from 'react'; // useContext 임포트 추가
import { useUser } from '../../api/auth/UserContext';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';
import MyPageHeader from '../../components/myPage/MyPageHeader';
import { call } from '../../api/auth/ApiService'; // API 호출 함수
import { RepeatOneSharp } from '@mui/icons-material';

const MyPageHome = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [gradeInfo, setGradeInfo] = useState('');

  const fetchGradeInfo = async () => {
    try {
      const response = await call(`/api/mypage/findGradeByUser`, 'GET');
      setGradeInfo(response.data);
    } catch (error) {
      console.error('에러발생 , 등급조회 에러', error);
    }
  };
  // 사용자 정보와 등급 정보를 가져옴
  useEffect(() => {
    fetchGradeInfo(); // 등급 정보 호출
  }, []);

  const features = [
    {
      icon: 'bi-info-circle',
      title: '회원정보',
      text: '회원정보 조회 및 수정',
      link: '/MyMemberInfo',
    },
    {
      icon: 'bi-cart-check',
      title: '구매내역',
      text: '구매내역 조회',
      link: '/PurchaseHistory',
    },
    {
      icon: 'bi-hearts',
      title: '코디조회',
      text: '코디예약, 코디조회',
      link: '/Coordination',
    },
    {
      icon: 'bi-journal-text',
      title: '나의리뷰',
      text: '나의 게시글, 리뷰, 댓글 확인',
      link: '/MyReviews',
    },
    {
      icon: 'bi-search',
      title: '문의내역',
      text: '나의 문의내역 조회',
      link: '/MyInquirement',
    },
    {
      icon: 'bi-piggy-bank',
      title: '적립금조회',
      text: '적립금 조회',
      link: '/MyPoint',
    },
  ];

  return (
    <>
      <div style={{ marginBottom: '100px', marginTop: '100px' }}>
        <div>
          <MyPageHeader
            title="마이페이지"
            description={
              <>
                {`${user?.nickname || ''}님의 등급은 ${gradeInfo.grade} 등급입니다.`}
                <br />
                {`(${gradeInfo.rate}%)`}
              </>
            }
          />
        </div>

        <section className="pt-4">
          <div className="container px-lg-5">
            <div className="row gx-3 gy-4">
              {features.map((feature, index) => (
                <div className="col-lg-6 col-xxl-4" key={index}>
                  {/* 클릭 이벤트를 카드 전체에 적용 */}
                  <div
                    className="card bg-light border-0 h-100"
                    onClick={() => navigate(feature.link)}
                    style={{ cursor: 'pointer' }} // 클릭 가능 포인터 추가
                  >
                    <div className="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                      <div
                        className={`feature bg-gradient text-black rounded-3 mt-4 mb-2 mt-n4`}
                      >
                        <i className={`bi ${feature.icon} fs-2`}></i>
                      </div>
                      <h2 className="fs-4 fw-bold mb-3">{feature.title}</h2>
                      <p className="mb-0">{feature.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MyPageHome;
