import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DetailItem from './pages/DetailItem/DetailItem';
import Home from './pages/main/Home';
import Login from './pages/Auth/Login';
import SingUp from './pages/Auth/SignUp';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SingUp />} />
      {/*
            <Route path="/" element={<DetailItem/>} />
*/}
      {/* 추가 라우트 */}
    </Routes>
  </Router>
);

export default AppRoutes;
