import React from 'react';
import styled from 'styled-components';
import { FaUser, FaTshirt, FaHeart, FaPalette } from 'react-icons/fa';
import servicios3 from '../assets/servicios3.png'; // 👈 importa la imagen

const ServicesSection = styled.section`
  width: 100%;
  background-color: #fdf6ee;
  padding: 10px 5px 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px; /* espacio entre texto e imagen */
  flex-wrap: wrap; /* para que se acomode en pantallas pequeñas */
`;

const Content = styled.div`
  max-width: 500px;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-family: 'Georgia', serif;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 40px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: #222;
  margin-bottom: 20px;
  font-weight: bold;

  svg {
    margin-right: 12px;
    font-size: 1.4rem;
  }
`;

const StyledImage = styled.img`
  max-width: 400px;
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const Services = () => {
  return (
    <ServicesSection id="services">
      <Content>
        <Title>Nuestros Servicios</Title>
        <List>
          <ListItem><FaUser /> Personalización</ListItem>
          <ListItem><FaTshirt /> Confección Digital</ListItem>
          <ListItem><FaHeart /> Visita Casual</ListItem>
          <ListItem><FaPalette /> Color y Estilo</ListItem>
        </List>
      </Content>
      <StyledImage src={servicios3} alt="Servicios ilustración" />
    </ServicesSection>
  );
};

export default Services;
