import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './WhatsAppButton.css';

import whatsappIcon from '../assets/images/whatsapp-icon.png';

const WhatsAppButton = () => {
  const location = useLocation();

  if (location.pathname === '/personalizar' || location.pathname === '/finalizar') {
    return null;
  }

  return (
    <Link 
      to="https://wa.me/message/RNKBE23J25CVA1" 
      target="_blank" 
      className="whatsapp-button"
    >
      <div className="whatsapp-container">
        <img 
          src={whatsappIcon} 
          alt="WhatsApp" 
          className="whatsapp-icon"
        />
        <span className="whatsapp-text">¿Necesitas más información?</span>
      </div>
      <div className="whatsapp-message">
        ¡Hola! Somos Selta, escríbenos
      </div>
    </Link>
  );
};

export default WhatsAppButton;
