import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DetailItem from './pages/DetailItem/DetailItem';
import Home from './pages/main/Home';
import Admin from './pages/admin/Admin';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      {/*
            <Route path="/" element={<DetailItem/>} />
*/}
      {/* 추가 라우트 */}
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  </Router>
);

export default AppRoutes;
