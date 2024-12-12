// React 기본 및 라우팅 관련 라이브러리
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { UserProvider } from './api/auth/UserContext';

// 외부 CSS 및 아이콘 라이브러리
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 스타일
import 'font-awesome/css/font-awesome.min.css'; // Font Awesome 아이콘
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css'; // Material Design 아이콘

// 페이지 컴포넌트 (Others 는 2개 이상일 경우 별도로 나눌 예정)
import Home from './pages/main/Home';

/** ./pages/auth  */
import Login from './pages/auth/Login';
import OAuth2RedirectHandler from './pages/auth/OAuth2RedirectHandler ';
import SignUp from './pages/auth/SignUp';

/** ./pages/MyPage  */
import MemberInfo from './pages/myPage/MemberInfo';
import MyInquirement from './pages/myPage/MyInquirement';
import MyPageHome from './pages/myPage/MyPageHome';
import MyPoint from './pages/myPage/MyPoint';

/** ./pages/Admin  */
import Admin from './pages/admin/Admin';

/** ./pages/Other  */
import ShoppingCart from './pages/cart/ShoppingCart';
import Recommend from './pages/community/recommend/Recommend';
import Detail from './pages/detailItem/Detail';

/** ./pages/community  */
import Board from './pages/community/board/Board';
import WritePost from './pages/community/board/WritePost';
import Coordi from './pages/community/coordi/Coordi';
import BoardDetail from './pages/community/board/BoardDetail';

// 공통 애니메이션과 레이아웃
import Page404 from './components/main/Page404';
import ScrollToTop from './components/ScrollToTop';
import Animation from './hooks/animation/Animation'; // 페이지 전환 애니메이션 효과
import Layout from './layouts/Layout'; // Header/Footer 포함 여부를 제어하는 레이아웃
import Agreement from './pages/main/Agreement';
import Guide from './pages/main/Guide';
import Privacy from './pages/main/Privacy';

/**
 * 공통적으로 사용하는 Route 생성 함수
 * @param {string} path - 라우트 경로
 * @param {JSX.Element} component - 렌더링할 컴포넌트
 * @param {boolean} includeHeaderFooter - Header/Footer 포함 여부 (기본값: true)
 * @returns {JSX.Element} - Route 컴포넌트
 */

const renderRoute = (path, component, includeHeaderFooter = true) => (
  <Route
    path={path}
    element={
      <Layout includeHeaderFooter={includeHeaderFooter}>{component}</Layout>
    }
  />
);

/**
 * App 전체 라우팅을 관리하는 컴포넌트
 * @returns {JSX.Element} - 전체 라우팅 구성
 */

const AppRoutes = () => (
  <UserProvider>
    <Router>
      <ScrollToTop />
      <Animation>
        <Routes>
          {/** ./pages/main */}
          {renderRoute('/', <Home />)} {/* 메인 페이지 */}
          {renderRoute('/guide', <Guide />)} {/* 이용안내 페이지 */}
          {renderRoute('/agreement', <Agreement />)} {/* 이용약관 페이지 */}
          {renderRoute('/privacy', <Privacy />)} {/* 개인정보처리방침 페이지 */}
          {/** ./pages/auth */}
          {renderRoute('/Login', <Login />)} {/* 로그인 페이지 */}
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
          {renderRoute('/SignUp', <SignUp />)} {/* 회원가입 페이지 */}
          {/** ./pages/MyPage */}
          {renderRoute('/MyPageHome', <MyPageHome />)} {/* 마이페이지 홈 */}
          {renderRoute('/MyPoint', <MyPoint />)} {/* 포인트 페이지 */}
          {renderRoute('/MemberInfo', <MemberInfo />)} {/* 회원정보 페이지 */}
          {renderRoute('/MyInquirement', <MyInquirement />)}{' '}
          {/* 문의내역 페이지 */}
          {/**./pages/admin */}
          {renderRoute('/admin/*', <Admin />, false)} {/* 관리자 페이지 */}
          {/** ./pages/Other  */}
          {renderRoute('/Detail/*', <Detail />)} {/* 상품 상세 페이지 */}
          {renderRoute('/Recommend', <Recommend />)} {/* 추천 페이지 */}
          {renderRoute('/ShoppingCart', <ShoppingCart />)}{' '}
          {/* 장바구니 페이지 */}
          {renderRoute('/*', <Page404 />, false)} {/* 에러 페이지 */}
          {/** ./pages/community  */}
          {renderRoute('/Board', <Board />)} {/* 일반게시판 페이지 */}
          {renderRoute('/WritePost', <WritePost />)} {/* 글 작성페이지 */}
          {renderRoute('/board/:id', <BoardDetail />)} {/* 글 상세페이지 */}
          {renderRoute('/Coordi', <Coordi />)} {/* 코디자랑 페이지 */}
        </Routes>
      </Animation>
    </Router>
  </UserProvider>
);

export default AppRoutes;
