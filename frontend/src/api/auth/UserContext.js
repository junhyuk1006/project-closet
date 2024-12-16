import React, { createContext, useContext, useState, useEffect } from 'react';
import { me } from './ApiService';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); // 토큰 확인
        if (!token) {
          setUser(null);
          return;
        }

        const userData = await me(); // 백엔드에서 유저 정보 가져오기
        const { password, ...userWithoutPassword } = userData;
        setUser(userWithoutPassword);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setUser(null);
      }
    };

    fetchUser(); // 초기 한 번만 실행
  }, []); // 의존성 배열에 빈 배열을 넣어 초기 실행만 수행

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  return context || { user: {}, setUser: () => {} };
};
