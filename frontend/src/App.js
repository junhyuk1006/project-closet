import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/main/Home';
import Animsition from './components/Animsition';

const AppRoutes = () => (
  <Router>
    <Animsition>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Animsition>
  </Router>
);

export default AppRoutes;
