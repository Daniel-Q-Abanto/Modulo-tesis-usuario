// src/components/TopBar.js
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const slide = keyframes`
  0% { transform: translateY(100%); opacity: 0; }
  10% { transform: translateY(0); opacity: 1; }
  90% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-100%); opacity: 0; }
`;

const Bar = styled.div`
  background-color: #222;
  color: #fff;
  padding: 6px 20px;
  font-size: 0.88rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  letter-spacing: 0.3px;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const MessageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${slide} 5s ease-in-out infinite;
`;

const messages = [
  '📦 Envíos a todo el país',
  '💳 Pagos seguros con Yape y tarjeta',
  '🧵 Personaliza tus prendas al 100%',
  '📞 Soporte 24/7'
];

const TopBar = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Bar>
      <MessageWrapper key={currentMessage}>
        {messages[currentMessage]}
      </MessageWrapper>
    </Bar>
  );
};

export default TopBar;
