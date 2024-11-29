import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
import Detail from "./pages/DetailItem/Detail";
import Home from "./pages/main/Home";



const AppRoutes = () => (

    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Detail" element={<Detail />} />
{/*
            <Route path="/" element={<DetailItem/>} />
*/}
            {/* 추가 라우트 */}
        </Routes>
    </Router>

);

export default AppRoutes;