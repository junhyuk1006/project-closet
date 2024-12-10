import React, { createContext, useContext, useState, useEffect } from 'react';
import { me } from './ApiService';

// UserContext 생성 (user 정보를 담을 Context)
const UserContext = createContext(null);

// UserProvider 컴포넌트 (하위 컴포넌트에 사용자 정보 제공)
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 로그인 후 사용자 정보 가져오기
  useEffect(() => {
    if (!user) {
      // user가 없을 때만 사용자 정보 요청
      const fetchUser = async () => {
        const userData = await me(); // me() 함수 호출하여 사용자 정보 받아오기
        const { password, ...userWithoutPassword } = userData; // 비밀번호를 제외한 나머지 정보
        setUser(userWithoutPassword); // 비밀번호 제외한 사용자 정보 상태에 저장
      };

      fetchUser();
    }
  }, [user]); // user 값이 변경될 때마다 실행

  // UserContext.Provider에서 user와 setUser를 value로 제공
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// UserContext 값을 사용할 수 있도록 훅 생성
export const useUser = () => {
  const context = useContext(UserContext);

  // user가 null일 경우 기본값인 빈 객체를 반환
  return context || { user: {}, setUser: () => {} };
};
