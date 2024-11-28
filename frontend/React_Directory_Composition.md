## React 디렉토리 기본 경로 디자인 (예시)

```plaintext
src/
├── api/                        # API 호출 로직
│   ├── auth/                   # 로그인/회원가입 관련 API
│   │   ├── auth.js             로그인/회원가입 API
│   │   └── socialAuth.js       SNS 로그인 API
|   |
│   ├── user/                   # 유저 정보 관련 API
│   │   ├── userInfo.js         유저 정보 API
│   │   └── userPreferences.js  유저 선호도 관련 API
|   |
│   ├── item/                   # 상품 정보 관련 API
│   │   ├── itemList.js         상품 리스트 API
│   │   ├── itemDetail.js       상품 상세 정보 API
│   │   └── itemCategory.js     상품 카테고리 API
|   |
│   ├── order/                  # 주문/결제 관련 API
│   │   ├── createOrder.js      주문 생성 API
│   │   ├── orderDetail.js      주문 상세 정보 API
│   │   └── payment.js          결제 API
|   |
│   ├── point/                  # 적립금 관련 API
│   │   ├── pointHistory.js     적립금 이력 API
│   │   └── pointUse.js         적립금 사용 API
|   |
│   └── ...                     # 기타 페이지별 API
|
├── assets/                     # 정적 파일 (이미지, CSS 등)
│   ├── images/                 이미지 파일
│   └── styles/                 전역 CSS 파일
|
├── components/                 # 재사용 가능한 UI 컴포넌트
│   ├── Header.jsx              헤더
│   ├── Footer.jsx              푸터
│   ├── Modal.jsx               모달 공통 컴포넌트
│   ├── Button.jsx              공통 버튼 컴포넌트
│   └── ...
|
├── hooks/                      # 커스텀 훅
│   ├── useAuth.js              인증 관련 훅
│   ├── useFetch.js             데이터 fetch 훅
│   └── ...
|
├── layouts/                    # 레이아웃 컴포넌트
│   ├── MainLayout.jsx          메인 레이아웃
│   ├── AdminLayout.jsx         관리자 레이아웃
│   └── ...
|
├── pages/                      # 페이지별 컴포넌트
│   ├── Auth/                   로그인/회원가입
│   │   ├── Login.jsx           로그인 페이지
│   │   └── Signup.jsx          회원가입 페이지
|   |
│   ├── Main/                   메인 페이지
│   │   ├── Home.jsx            메인 페이지
│   │   └── ItemList.jsx        상품 리스트 페이지
|   |
│   ├── MyPage/                 마이페이지
│   │   ├── MyInfo.jsx          회원정보
│   │   ├── MyOrders.jsx        구매내역
│   │   ├── MyPoints.jsx        적립금 조회
│   │   └── ...
|   |
│   ├── Admin/                  관리자 페이지
│   │   ├── UserManagement.jsx  회원 관리
│   │   ├── OrderManagement.jsx 주문 관리
│   │   ├── StockManagement.jsx 재고 관리
│   │   └── ...
|   |
│   ├── Cart/                   장바구니 페이지
│   │   └── Cart.jsx            장바구니
|   |
│   ├── Checkout/               결제 페이지
│   │   └── Checkout.jsx        결제창
|   |
│   ├── Community/              커뮤니티
│   │   ├── Board.jsx           일반 게시판
│   │   └── CoordiBoard.jsx     코디 자랑 게시판
│   └── ...
|
├── routes/                     # 라우팅 관련 파일 (기본 라우팅만 할거면 App.js 에서 해도 됨)
│   ├── routes.js               라우팅 설정
│   └── ProtectedRoute.js       로그인 보호 라우트
|
├── store/                      # 상태 관리 (Redux, Context API 등) (필수불가결한지 알아보는중)
│   ├── authSlice.js            인증 관련 상태
│   ├── cartSlice.js            장바구니 상태
│   ├── itemSlice.js            상품 상태
│   ├── userSlice.js            유저 상태
│   └── ...
|
├── utils/                      # 공통 유틸리티 함수 (필수불가결한지 알아보는중)
│   ├── formatDate.js           날짜 포맷 함수
│   ├── calculatePoints.js      적립금 계산 함수
│   └── ...
|
├── App.js                      # 루트 컴포넌트
├── index.js                    # 진입점
└── ...
```





<br><br>
## React 디렉토리 기본 경로설명

1. src/api/
```plaintext
설명
    - api/ 
        - 디렉토리는 서버와의 통신 로직(API 호출)을 관리 
        - 각 기능별로 파일을 분리하여 모듈화.

    - EX.
        - auth.js: 로그인 및 회원가입 관련 API를 담당하며
        - item.js: 상품 데이터를 서버에서 불러오는 로직을 담당합니다.

이유:
    1. API 호출 로직을 한 곳에서 관리하면, 유지보수가 용이하고 로직 재사용 가능.
    2. 페이지 컴포넌트에서 API 호출 로직을 분리함으로써 코드의 가독성을 높임.
```

<br>예시
```plaintext
export const login = async (credentials) => {
    try {
        const response = await fetch("http://localhost:80/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials), // 사용자 입력 전달
        });
        if (!response.ok) {
            throw new Error("Login failed");
        }
        const data = await response.json(); // 응답 데이터를 JSON으로 파싱
        return data; // 로그인 성공 시 데이터 반환
    } catch (error) {
        console.error("Error during login:", error);
        return null; // 에러 발생 시 null 반환
    }
};
```


<br><br>
2. src/assets/
```plaintext
설명
    - 정적 리소스(이미지, 스타일 등)를 저장.

    - images/
        - 로고, 아이콘, 배너 이미지 등 정적 이미지 파일.
    - styles/
        - 전역에서 재사용할 CSS 파일.

이유
    1. 모든 정적 자원을 한 디렉토리에 모아 관리하면, 파일을 쉽게 찾고 유지보수함.
```
<br><br>

3. src/components/
```plaintext
설명
    - 프로젝트에서 재사용 가능한 공통 UI 컴포넌트를 저장
    - ex) Header.js, Footer.js 등

이유
    1. 코드의 중복을 줄이고, 재사용성을 극대화
    2. 공통 컴포넌트를 한 디렉토리에 모아두면, 다른 개발자와 협업 시 구조를 쉽게 이해할 수 있음
```


<br>예시
```plaintext
import Button from "../components/Button";

<Button label="Submit" onClick={handleSubmit} />;
```

<br><br>