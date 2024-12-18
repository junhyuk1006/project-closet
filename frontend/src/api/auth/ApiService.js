import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = 'http://localhost:80'; // 서버 URL

/**
 * API 호출을 처리하는 함수입니다.
 *
 * @param {string} api - API의 엔드포인트를 입력합니다.
 * @param {string} [method='GET'] - HTTP 메서드를 입력합니다('GET', 'POST' 등). 기본값은 'GET'입니다.
 * @param {Object} [request=null] - 서버에 전송할 데이터를 입력합니다 (선택 사항).
 * @returns {Promise<any>} 서버로부터의 응답 데이터입니다.
 */
export const call = async (api, method = 'GET', request = null) => {
  const url = `${API_BASE_URL}${api}`;
  const options = {
    method,
    credentials: 'include',
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

export const signup = async (data) => {
  try {
    const response = await fetch('http://localhost:80/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || '회원가입에 실패했습니다.',
      };
    }

    return { success: true, message: '회원가입에 성공했습니다!' };
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    return { success: false, message: '서버와의 연결에 실패했습니다.' };
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
    console.log('data: ' + data);
    return data; // 사용자 데이터 반환
  } catch (err) {
    console.error('Failed to fetch user data:', err.message);
    return null; // 에러 발생 시 null 반환
  }
};

/**
 * 이메일 인증 코드 전송 함수
 *
 * @param {string} email - 인증 코드를 받을 이메일 주소
 * @returns {Promise<string>} 성공 메시지
 */
export const sendCode = async (email) => {
  try {
    // 이메일 중복 검사
    const isAvailable = await checkEmail(email);
    if (!isAvailable) {
      throw new Error('이미 사용 중인 이메일입니다.');
    }

    // 중복이 없을 경우 인증 코드 전송
    const response = await call(`/api/email/sendCode`, 'POST', { email });
    return response; // 성공 메시지 반환
  } catch (error) {
    console.error('인증 코드 전송 실패:', error);
    throw error;
  }
};

/**
 * 이메일 인증 코드 검증 함수
 *
 * @param {string} email - 이메일 주소
 * @param {string} code - 사용자가 입력한 인증 코드
 * @returns {Promise<string>} 성공 메시지
 */
export const verifyCode = async (email, code) => {
  try {
    const response = await call(`/api/email/verifyCode`, 'POST', {
      email,
      code,
    });
    return response; // 성공 메시지 반환
  } catch (error) {
    console.error('이메일 인증 실패:', error);
    throw error;
  }
};

/**
 * 아이디 중복 검사 함수
 *
 * @param {string} username - 중복 검사를 수행할 아이디
 * @returns {Promise<boolean>} 사용 가능 여부 (true: 사용 가능, false: 중복)
 */
export const checkUsername = async (username) => {
  try {
    const isAvailable = await call(
      `/api/auth/check-username?username=${username}`,
      'GET'
    );
    console.log('아이디 중복 검사 응답:', isAvailable); // 디버깅 로그 추가
    return isAvailable; // true 또는 false 반환
  } catch (error) {
    console.error('아이디 중복 검사 실패:', error);
    throw error;
  }
};

/**
 * 닉네임 중복 검사 함수
 *
 * @param {string} nickname - 중복 검사를 수행할 닉네임
 * @returns {Promise<boolean>} 사용 가능 여부 (true: 사용 가능, false: 중복)
 */
export const checkNickname = async (nickname) => {
  try {
    const isAvailable = await call(
      `/api/auth/check-nickname?nickname=${nickname}`,
      'GET'
    );
    console.log('닉네임 중복 검사 응답:', isAvailable); // 디버깅 로그 추가
    return isAvailable; // true 또는 false 반환
  } catch (error) {
    console.error('닉네임 중복 검사 실패:', error);
    throw error;
  }
};

/**
 * 이메일 중복 검사 함수
 *
 * @param {string} email - 중복 검사를 수행할 이메일 주소
 * @returns {Promise<boolean>} 사용 가능 여부 (true: 사용 가능, false: 중복)
 */
export const checkEmail = async (email) => {
  try {
    const response = await call(`/api/auth/check-email?email=${email}`, 'GET');
    console.log('이메일 중복 검사 응답:', response); // 디버깅 로그
    return response; // true 또는 false 반환
  } catch (error) {
    console.error('이메일 중복 검사 실패:', error);
    throw error;
  }
};
