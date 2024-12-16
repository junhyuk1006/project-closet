import React, { createContext, useContext, useState, useEffect } from 'react';
import { me, signin } from './ApiService';

const UserContext = createContext(null);

/**
 * 유저 데이터를 전역으로 관리하고, 로그인/로그아웃 기능을 제공합니다.
 *
 * @component
 * @param {ReactNode} children - UserContext로 감싸는 하위 컴포넌트를 의미합니다.
 * @returns {JSX.Element} - 유저 데이터를 전역으로 제공하는 Context Provider입니다.
 */
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

/**
 * 유저와 관련된 로직을 전달받는 커스텀 훅입니다.
 *
 * @property {Users} user - 현재 로그인된 유저의 정보입니다.
 * @property {Function} setUser - 유저 정보를 설정하는 함수입니다.
 * @property {Function} login - 유저 로그인 함수입니다.
 * @property {Function} logout - 유저 로그아웃 함수입니다.
 * @returns {Object} 해당 프로퍼티들을 전달합니다.
 *
 * @example
 * const { user, login, logout } = useUser();
 */
export const useUser = () => {
  const context = useContext(UserContext);
  return context || { user: {}, setUser: () => {} };
};
