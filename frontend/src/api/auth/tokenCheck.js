export async function tokenCheck(navigate) {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('인증 정보가 없습니다. 다시 로그인해주세요.');
      navigate('/Login');
      return null;
    }

    // 환경 변수에서 API 서버 URL 가져오기
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    // API 요청 보내기 (GET 요청 예제)
    const response = await fetch(`${apiUrl}/api/auth/protected-resource`, {
      method: 'GET', // HTTP 메서드 지정
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // JWT 추가
      },
    });

    if (response.status === 401) {
      alert('인증이 만료되었습니다. 다시 로그인해주세요.');
      navigate('/Login');
      return null;
    }

    if (response.ok) {
      return await response.json();
    } else {
      console.log('API URL:', apiUrl);

      console.error('요청 실패:', response.status, response.statusText);
      return null;
    }
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    return null;
  }
}
