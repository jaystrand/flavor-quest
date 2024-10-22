// import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './pages/homepage';
import SearchRecipes from './pages/searchRecipes';
import Register from './pages/Registration';
import Profile from './pages/Profile';
import AboutUs from './pages/aboutus';
import ProtectedRoute from './components/ProtedtedRoute'; 
import './styles/style.css'
// Find the root element for rendering
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
        <Route path="/register" element={<Register />} />
          <Route index element={<Home />} />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="search-recipes" element={<ProtectedRoute><SearchRecipes /></ProtectedRoute>} />
          <Route path="about-us" element={<AboutUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
} else {
  console.error("Root element not found.");
}