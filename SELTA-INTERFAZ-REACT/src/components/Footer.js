import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #e65555; /* tono rosa */
  color: #fff;
  padding: 60px 30px 30px;
`;

const FooterWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  @media(min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: 100px;
  }
`;

const Column = styled.div`
  text-align: center;
  max-width: 200px;

  @media(min-width: 768px) {
    text-align: left;
  }

  h4 {
    font-size: 1.1rem;
    margin-bottom: 15px;
    font-weight: bold;
    color: #fff;
  }

  a {
    display: block;
    margin-bottom: 8px;
    font-size: 0.95rem;
    color: #f9f9f9;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const CenterColumn = styled.div`
  text-align: center;

  h1 {
    font-size: 1.6rem;
    font-weight: 900;
    margin-bottom: 10px;
    letter-spacing: 1px;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;

  svg {
    font-size: 1.3rem;
    color: #fff;
    transition: color 0.3s;

    &:hover {
      color: #000;
    }
  }
`;

const FooterBottom = styled.div`
  margin-top: 40px;
  font-size: 0.85rem;
  color: #f7f7f7;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterGrid>
          <Column>
            <h4>Legal</h4>
            <a href="/aviso-legal">Aviso Legal</a>
            <a href="/privacidad">Política de Privacidad</a>
            <a href="/cookies">Política de Cookies</a>
            <a href="/calidad">Política de Calidad</a>
          </Column>

          <CenterColumn>
            <h1>SELTΛ</h1>
            <SocialIcons>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="mailto:contacto@selta.com"><FaEnvelope /></a>
            </SocialIcons>
          </CenterColumn>

          <Column>
            <h4>Explora</h4>
            <a href="/">Inicio</a>
            <a href="/about">Acerca de</a>
            <a href="/services">Servicios</a>
            <a href="/contact">Contacto</a>
          </Column>
        </FooterGrid>

        <FooterBottom>
          &copy; {new Date().getFullYear()} Selta Confecciones. Todos los derechos reservados.
        </FooterBottom>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;
