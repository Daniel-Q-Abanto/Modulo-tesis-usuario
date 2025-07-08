import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Footer from './components/Footer';
import HowItWorks from './components/HowItWorks';
import Services from './components/Services';
import Diseño from './components/Diseño';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Prompt from './components/Prompt';
import { scroller } from 'react-scroll';
import Personalizar from './components/Personalizar';
import Finalizacion from './components/Finalizacion';
import WhatsAppButton from './components/WhatsAppButton'; 

const ScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      scroller.scrollTo(location.state.scrollTo, {
        smooth: true,
        duration: 500,
        offset: -70,
      });
    }
  }, [location]);

  return null;
};

const MainApp = () => {
  const location = useLocation();

  return (
    <>
      <TopBar />
      <Header />
      <ScrollHandler />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HowItWorks id="how-it-works" />
              <Diseño />
              <Services id="services" />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/prompts" element={<Prompt />} />
        <Route path="/personalizar" element={<Personalizar />} />
        <Route path="/finalizar" element={<Finalizacion />} />
      </Routes>
      {!['/login', '/register', '/profile', '/prompts', '/Personalizar'].includes(location.pathname) && <Footer />}
      
      <WhatsAppButton /> {/* Aquí añadimos el botón flotante */}
    </>
  );
};

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

export default App;
