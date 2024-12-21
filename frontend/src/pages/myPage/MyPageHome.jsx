import React, { useState, useEffect } from 'react';
import { useUser } from '../../api/auth/UserContext';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';
import MyPageHeader from '../../components/myPage/MyPageHeader';
import { call } from '../../api/auth/ApiService';

const MyPageHome = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [gradeInfo, setGradeInfo] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const handleProfileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(
          'http://localhost:8090/api/mypage/uploadProfileImage',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData,
          }
        );

        if (response.ok) {
          const fileName = await response.text(); // 반환된 파일명
          window.location.reload();

          console.log(`업로드 성공: ${fileName}`);
        } else {
          console.error('업로드 실패:', response.statusText);
        }
      } catch (error) {
        console.error('업로드 중 오류:', error);
      }
    }
  };

  const fetchGradeInfo = async () => {
    try {
      const response = await call(`/api/mypage/findGradeByUser`, 'GET');
      setGradeInfo(response.data);
    } catch (error) {
      console.error('에러발생 , 등급조회 에러', error);
    }
  };
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch(
          'http://localhost:8090/api/mypage/getProfileImage',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            credentials: 'include', // 인증 정보를 포함
          }
        );

        if (response.ok) {
          const blob = await response.blob();
          setProfileImageUrl(URL.createObjectURL(blob));
        } else {
          console.error(
            `HTTP Error: ${response.status} - ${response.statusText}`
          );
        }
      } catch (error) {
        console.error('API 호출 오류:', error);
      }
    };

    fetchProfileImage();
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
      link: '/MyPurchaseHistory',
    },
    {
      icon: 'bi-hearts',
      title: '코디조회',
      text: '코디예약, 코디조회',
      link: '/MyCoordination',
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
                <div className="profile-container">
                  <label htmlFor="profile-upload" className="profile-circle">
                    <img
                      src={profileImageUrl} // 백엔드에서 반환된 프로필 이미지 URL
                      alt="프로필 이미지"
                    />
                  </label>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleProfileUpload} // 이벤트 핸들러
                  />
                </div>
                {`${user?.nickname || ''}님의 등급은 ${gradeInfo.grade} 등급입니다.`}
                <br />
                {`등급에 따른 포인트 적립률은 ${gradeInfo.rate}%입니다.`}
              </>
            }
          />
        </div>

        <section className="pt-4">
          <div className="container px-lg-5">
            <div className="row gx-3 gy-4">
              {features.map((feature, index) => (
                <div className="col-lg-6 col-xxl-4" key={index}>
                  <div
                    className="card bg-light border-0 h-100"
                    onClick={() => navigate(feature.link)}
                    style={{ cursor: 'pointer' }}
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
