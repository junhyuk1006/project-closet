// 클라이언트 단(리액트)에서 JWT 토큰의 유무, 만료 여부를 확인하는 로직입니다.
// isValidJWT 함수를 호출하면 유효한 토큰일시 true, 이외에 false를 반환합니다.
// if (isValidJWT()) { ... } 등 boolean 값이 필요한 로직에 사용합니다.
export default function isValidJWT() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log('토큰이 존재하지 않습니다.');
    return false; // token이 존재하지 않으면 false 반환
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = new Date(payload.exp * 1000);
    return expirationDate > new Date(); // 만료일자가 지나지 않았다면 true, 지났다면 false 반환
  } catch (e) {
    alert(`토큰이 유효하지 않습니다. ${e}`); // 토큰의 형식이 잘못됐다면 alert 출력 (UX를 고려하여 추후 수정)
  }
}
