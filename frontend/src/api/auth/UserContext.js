import React, { createContext, useContext, useState, useEffect } from 'react';
import { me } from './ApiService';

const UserContext = createContext(null);

/**
 * 유저 데이터를 전역으로 사용하도록 만들어주는 컴포넌트입니다.
 */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await me();
        const { password, ...userWithoutPassword } = userData;
        setUser(userWithoutPassword);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setUser(null);
      }
    };

    const token = localStorage.getItem('token'); // 토큰 확인

    if (!token) {
      setUser(null); // 명확히 초기화
      return; // fetchUser 호출하지 않음
    }

    if (!user) {
      fetchUser(); // user가 없을 때만 호출
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * 유저 데이터를 반환받는 함수입니다.
 *
 * @returns {Users} user 객체를 반환받습니다 (e.g., user.nickname, user.id, ...).
 */
export const useUser = () => {
  const context = useContext(UserContext);
  return context || { user: {}, setUser: () => {} };
};
