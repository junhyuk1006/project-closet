import React, { createContext, useContext, useState, useEffect } from 'react';
import { me } from './ApiService';

const UserContext = createContext(null);

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

export const useUser = () => {
  const context = useContext(UserContext);
  return context || { user: {}, setUser: () => {} };
};
