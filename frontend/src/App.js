import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import DetailItem from "./pages/DetailItem/DetailItem";
import Home from "./pages/main/Home";

const AppRoutes = () => (

    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
{/*
            <Route path="/" element={<DetailItem/>} />
*/}
            {/* 추가 라우트 */}
        </Routes>
    </Router>

);

export default AppRoutes;