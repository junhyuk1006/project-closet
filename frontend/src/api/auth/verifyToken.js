export const verifyToken = async (navigate) => {
  const token = localStorage.getItem('token'); // JWT 가져오기

  if (!token) {
    navigate('/Login'); // 로그인 페이지로 리다이렉트
    return false; // 인증 실패 후 바로 종료
  }

  try {
    const response = await fetch('http://localhost:80/api/auth/validate-token', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Invalid token');
    }
    return true; // 인증 성공
  } catch (error) {
    alert('세션이 만료되었습니다. 다시 로그인해주세요.');
    navigate('/Login'); // 인증 실패 시 로그인 페이지로 리다이렉트
    return false; // 인증 실패
  }
};
