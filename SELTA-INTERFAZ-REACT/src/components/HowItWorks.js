import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import portada1 from '../assets/portada1.png';
import portada2 from '../assets/portada2.png';
import portada3 from '../assets/portada3.png';
import { useNavigate } from 'react-router-dom';

const images = [portada1, portada2, portada3];

const CarouselContainer = styled.section`
  position: relative;
  height: 90vh;
  width: 100%;
  overflow: hidden;
`;

const Slide = styled.div`
  height: 100%;
  width: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${props => (props.active ? 1 : 0)};
  transition: opacity 1s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.55); /* Fondo oscuro */
  }
`;

const Content = styled.div`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 30px;
`;

const ExploreButton = styled.button`
  background-color: #c86d6d;
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 1rem;
  border-radius: 30px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #a84f4f;
  }
`;

const HowItWorks = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleExploreClick = () => {
    const token = localStorage.getItem('access_token');
    if (token) navigate('/prompts');
    else navigate('/login');
  };

  return (
    <CarouselContainer id="how-it-works">
      {images.map((img, index) => (
        <Slide key={index} image={img} active={index === current} />
      ))}
      <Content>
        <Title>Transforma tus ideas en prendas únicas</Title>
        <Description>
          Diseña, personaliza y luce tu estilo con la ayuda de nuestra tecnología inteligente.
        </Description>
        <ExploreButton onClick={handleExploreClick}>DESCUBRE LA PLATAFORMA</ExploreButton>
      </Content>
    </CarouselContainer>
  );
};

export default HowItWorks;