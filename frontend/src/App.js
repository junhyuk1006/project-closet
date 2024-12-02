import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
import Detail from "./pages/DetailItem/Detail";
import Home from "./pages/main/Home";
import Recommend from "./pages/comunity/recommend/Recommend";
import Animsition from "./components/Animation";



const AppRoutes = () => (
    <Router>
        <Animsition>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Detail" element={<Detail />} />
                <Route path="/Recommend" element={<Recommend/>}/>
            </Routes>
        </Animsition>
    </Router>
);

export default AppRoutes;