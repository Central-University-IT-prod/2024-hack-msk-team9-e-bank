import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import authStore from './store/authStore';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import AuthorizationPage from './components/AuthorizationPage';
import Analitic from './components/analitic';
import MainPageProdact from './components/Main_page';
import Editor from './components/editor';
import Prodact from './components/prodact';
import Marketolog from './components/marketolog';
import Main_Editor from './components/main_editor';
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Маршрут для главной страницы */}
        <Route path="/home" element={<HomePage/>} />

        {/* Маршрут для страницы регистрации */}
        <Route path="/" element={<RegisterPage />} />

        {/* Маршрут для страницы авторизации */}
        <Route path="/authorization" element={<AuthorizationPage />} />
        <Route path="/analitic" element={<Analitic />} />
        <Route path="/main" element={<MainPageProdact />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/prodact" element={<Prodact />} />
        <Route path="/marketolog" element={<Marketolog />} />
        <Route path="/main_editor" element={<Main_Editor />} />

      </Routes>
    </Router>
  );
};

export default App;