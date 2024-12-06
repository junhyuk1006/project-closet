import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = 'http://localhost:80'; // 서버 URL

// 공통 API 호출 함수
export const call = async (api, method = 'GET', request = null) => {
  const url = `${API_BASE_URL}${api}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (request) {
    options.body = JSON.stringify(request); // 요청 데이터가 있을 경우 body에 추가
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 403) {
        window.location.href = '/Login'; // 인증 오류시 로그인 페이지로 리디렉션
      }
      throw data; // 서버에서 반환한 오류 데이터를 던짐
    }

    return data; // 성공 시 데이터 반환
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    // 여기서 추가적인 에러 처리를 할 수있음(예: toast.error) 나중에 해볼예정
    throw error;
  }
};

// 로그인 API 함수
export const signin = async (userDTO) => {
  try {
    const response = await call('/auth/signin', 'POST', userDTO);
    console.log('로그인 응답:', response);
    localStorage.setItem('token', response.token); // 토큰을 로절저장소에 저장
    alert('로그인에 성공했습니다!'); // 성공 팝업 표시 (추후 사용자편의 입장에서 변경예정)
    return response; // 필요 시 응답 데이터 반환
  } catch (error) {
    console.error('로그인 실패:', error);
    alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.'); // 실패 팝업 표시
    throw error;
  }
};
