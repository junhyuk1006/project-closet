import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
import Detail from './pages/DetailItem/Detail';
import Home from './pages/main/Home';
import Recommend from './pages/comunity/recommend/Recommend';
import ShoppingCart from './pages/cart/ShoppingCart';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import MyPageHome from './pages/mypage/MyPageHome';
import MemberInfo from './pages/mypage/MemberInfo';
import MyPoint from './pages/mypage/MyPoint';
import Admin from './pages/admin/Admin';
import Layout from './store/Layout';

const renderRoute = (path, component, includeHeaderFooter = true) => (
  <Route
    path={path}
    element={
      <Layout includeHeaderFooter={includeHeaderFooter}>{component}</Layout>
    }
  />
);

const AppRoutes = () => (
  <Router>
    <Animation>
      <Routes>
        {renderRoute('/', <Home />)}
        {renderRoute('/Detail', <Detail />)}
        {renderRoute('/Recommend', <Recommend />, false)}
        {renderRoute('/ShoppingCart', <ShoppingCart />)}
        {renderRoute('/MyPageHome', <MyPageHome />)}
        {renderRoute('/Login', <Login />)}
        {renderRoute('/SignUp', <SignUp />)}
        {renderRoute('/MyPoint', <MyPoint />)}
        {renderRoute('/MemberInfo', <MemberInfo />)}
        {renderRoute('/admin/*', <Admin />, false)}
      </Routes>
    </Animation>
  </Router>
);

export default AppRoutes;
