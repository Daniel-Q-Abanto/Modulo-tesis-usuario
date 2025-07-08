import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll'; // ✅ Cambio aquí
import florImage from '../assets/flor.png';

const HeaderContainer = styled.header`
  position: sticky; /* 👈 Esto lo fija */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  background-color: #f7f7f7;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;


const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 35px;
  height: 35px;
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1;

  span {
    font-size: 1.1rem;
    font-weight: 900;
    color: #222;
    text-align: left;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;

  button.link-button {
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
    font-size: 1rem;
    font-weight: 800;
    padding: 0;

    &:hover {
      color: #ff6868;
    }
  }
`;

const ActionButton = styled.button`
  background-color: #ff6868;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 800;

  &:hover {
    background-color: #e65555;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('access_token');

  const handleScrollToSection = (section) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: section } });
    } else {
      scroller.scrollTo(section, {
        smooth: true,
        duration: 600,
        offset: -70,
      });
    }
  };

  const handleExploreClick = () => {
    if (token) {
      navigate('/prompts');
    } else {
      navigate('/login', { state: { from: '/prompts' } });
    }
  };

  return (
    <HeaderContainer>
      <LogoContainer onClick={() => navigate('/')}>
        <LogoImage src={florImage} alt="Logo flor" />
        <LogoText>
          <span>SELTA</span>
          <span>CONFECCIONES</span>
        </LogoText>
      </LogoContainer>

      <Nav>
        <button className="link-button" onClick={() => handleScrollToSection('how-it-works')}>Inicio</button>
        <button className="link-button" onClick={() => handleScrollToSection('about')}>Acerca de</button>
        <button className="link-button" onClick={() => handleScrollToSection('services')}>Servicios</button>
        <ActionButton onClick={handleExploreClick}>¡Comienza ya!</ActionButton>
        {token && <ActionButton onClick={() => navigate('/profile')}>Perfil</ActionButton>}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
