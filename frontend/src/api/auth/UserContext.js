import React, { createContext, useContext, useState, useEffect } from 'react';
import { me } from './ApiService';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // localStorage에서 user 데이터를 초기값으로 가져오기
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null; // 저장된 데이터가 있으면 파싱해서 반환
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await me();
        const { password, ...userWithoutPassword } = userData;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword)); // 사용자 정보를 localStorage에 저장
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setUser(null);
        localStorage.removeItem('user'); // 에러 발생 시 localStorage에서 데이터 삭제
      }
    };

    if (!user) {
      fetchUser(); // user가 없을 때만 사용자 정보 가져오기
    }
  }, []);

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
