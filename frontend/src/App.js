import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/main/Home';
import Animsition from './components/Animsition';
import Header from './components/Header';
import Footer from './components/Footer';

const AppRoutes = () => (
  <Router>
    <Animsition>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Animsition>
  </Router>
);

export default AppRoutes;
