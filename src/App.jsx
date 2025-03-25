import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About/About';
import Menu from './pages/Menu/Menu';
import Reservation from './pages/Reservation/Reservation';
import Contact from './pages/Contact/Contact';
import Auth from './components/Auth';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main> 
        <Footer />
      </div>
    </Router>
  );
}

export default App;
