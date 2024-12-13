import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = 'http://localhost:80'; // 서버 URL

// 공동API 호출(null처리추가)
export const call = async (api, method = 'GET', request = null) => {
  const url = `${API_BASE_URL}${api}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  if (request) {
    options.body = JSON.stringify(request);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw (
        errorData || {
          message: '알 수 없는 오류 발생',
          status: response.status,
        }
      );
    }

    // JSON 응답 여부 확인
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    throw error;
  }
};

// 로그인 API 함수
export const signin = async (userDTO) => {
  try {
    const response = await call('/api/auth/signin', 'POST', userDTO);
    localStorage.setItem('token', response.token); // 토큰을 로절저장소에 저장
    alert('로그인에 성공했습니다!'); // 성공 팝업 표시 (추후 사용자편의 입장에서 변경예정)
    return response; // 필요 시 응답 데이터 반환
  } catch (error) {
    console.error('로그인 실패:', error);
    alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.'); // 실패 팝업 표시
    throw error;
  }
};

// 사용자 정보 가져오는 함수
export const me = async () => {
  try {
    // 로컬 스토리지에서 토큰 가져오기
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // 토큰 설정
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message ||
          `Error: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log('User data:', data);
    return data; // 사용자 데이터 반환
  } catch (err) {
    console.error('Failed to fetch user data:', err.message);
    return null; // 에러 발생 시 null 반환
  }
};
