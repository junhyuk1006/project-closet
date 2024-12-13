import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = 'http://localhost:80'; // 서버 URL

/**
 * API 호출을 처리하는 함수입니다.
 *
 * @param {string} api API의 엔드포인트를 입력합니다.
 * @param {string} [method='GET'] - HTTP 메서드를 입력합니다('GET', 'POST' 등). 기본값은 'GET'입니다.
 * @param {Object} [request=null] - 서버에 전송할 데이터를 입력합니다 (선택 사항).
 * @returns {Promise<any>} 서버로부터의 응답 데이터입니다.
 */
export const call = async (api, method = 'GET', request = null) => {
  const url = `${API_BASE_URL}${api}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`, // 토큰을 헤더에 포함
    },
  };

  if (request) {
    options.body = JSON.stringify(request); // 요청 데이터가 있을 경우 body에 추가
  }

  try {
    const response = await fetch(url, options);

    // 응답 상태 확인
    if (!response.ok) {
      if (response.status === 403 || response.status === 401) {
        alert('세션이 만료되었습니다. 다시 로그인해주세요.');
        localStorage.removeItem('token'); // 토큰 제거
        window.location.href = '/login'; // 로그인 페이지로 이동
      }
      const errorData = await response.json().catch(() => null); // JSON 파싱 에러 처리
      throw (
        errorData || {
          message: '알 수 없는 오류 발생',
          status: response.status,
        }
      );
    }

    // 응답 본문이 있는 경우만 JSON 파싱
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return null; // JSON 응답이 없을 경우 null 반환
    }
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    throw error; // 추가 처리를 위해 호출자에게 에러 전달
  }
};

/**
 * 로그인 API 호출 함수입니다.
 *
 * @param {Object} userDTO - 로그인을 시도할 유저의 데이터 객체를 입력합니다.
 * @returns {Promise<UserDTO>} 로그인 성공 시 UserDTO 객체가 반환됩니다.
 */
export const signin = async (userDTO) => {
  try {
    const response = await call('/api/auth/signin', 'POST', userDTO);
    localStorage.setItem('token', response.token); // 토큰을 로컬 저장소에 저장
    alert('로그인에 성공했습니다!'); // 성공 팝업 표시

    return response; // 필요 시 응답 데이터 반환
  } catch (error) {
    console.error('로그인 실패:', error);
    alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.'); // 실패 팝업 표시
    throw error;
  }
};

/**
 * !!! 직접 사용금지 !!!
 *
 * !!! 비밀번호 노출 !!!
 *
 * !!! UserProvider 사용 !!!
 *
 * ~~사용자 정보를 가져오는 함수입니다.~~
 *
 * ~~@returns {Promise<CustomUserDetail>} 현재 로그인된 사용자의 데이터를 포함한 객체입니다.~~
 *
 * ~~반환 객체 구조:~~
 * ~~- `user`: `Users` 사용자 객체~~
 */
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
    return data; // 사용자 데이터 반환
  } catch (err) {
    console.error('Failed to fetch user data:', err.message);
    return null; // 에러 발생 시 null 반환
  }
};
