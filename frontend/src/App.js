import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
import Detail from "./pages/DetailItem/Detail";
import Home from "./pages/main/Home";
import Recommend from "./pages/comunity/recommend/Recommend";
import Animsition from "./hooks/Animation";
import ShoppingCart from "./pages/cart/ShoppingCart";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import MyPageHome from "./pages/mypage/MyPageHome";
import MemberInfo from "./pages/mypage/MemberInfo";
import MyPoint from "./pages/mypage/MyPoint";
import Header from "./components/Header";
import Footer from "./components/Footer";



const AppRoutes = () => (
    <Router>
        <Animsition>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Detail" element={<Detail />} />
                <Route path="/Recommend" element={<Recommend />}/>
                <Route path="/ShoppingCart" element={<ShoppingCart />}/>
                <Route path="/MyPageHome" element={<MyPageHome/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
                <Route path="/MyPoint" element={<MyPoint/>}/>
                <Route path="/MemberInfo" element={<MemberInfo/>}/>
            </Routes>
            <Footer/>
        </Animsition>
    </Router>
);

export default AppRoutes;