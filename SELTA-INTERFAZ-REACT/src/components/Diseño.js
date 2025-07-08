import React from 'react';
import styled from 'styled-components';
import { Element } from 'react-scroll';
import procesoImage from '../assets/proceso.png';
import calidadIcon from '../assets/calidad.png';
import innovacionIcon from '../assets/innovacion.png';
import creatividadIcon from '../assets/creatividad.png';

const DiseñoSection = styled.section`
  width: 100%;
  background-color: #fdf6ee;
  padding: 80px 30px 100px;
  box-sizing: border-box;
`;

const Container = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const ProcesoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;

  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
`;

const TextContent = styled.div`
  max-width: 600px;
`;

const Title = styled.h2`
  font-size: 2.6rem;
  font-weight: 900;
  color: #222;
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  color: #444;
  line-height: 1.7;
  font-family: 'Poppins', sans-serif;
`;

const AboutTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 900;
  text-align: center;
  color: #1a1a1a;
  margin-bottom: 25px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #444;
  max-width: 1000px;
  margin: 0 auto 60px;
  line-height: 1.8;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background: #ffffff;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 1;
  min-width: 280px;
  max-width: 350px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 75px;
    height: auto;
    margin-bottom: 20px;
  }

  h4 {
    font-size: 1.5rem;
    color: #c86d6d;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
  }
`;

const Diseño = () => (
  <Element name="about">
    <DiseñoSection>
      <Container>
        <ProcesoContainer>
          <Image src={procesoImage} alt="Proceso de diseño personalizado" />
          <TextContent>
            <Title>¡Diseña a tu manera!</Title>
            <Paragraph>
              Con nuestra plataforma puedes generar tu diseño con inteligencia artificial o subir tu imagen favorita. Luego personalízala sobre el polo ajustando su tamaño, posición y colores.
              Finalmente, elige si deseas descargar el diseño o solicitar la confección con nosotros.
            </Paragraph>
          </TextContent>
        </ProcesoContainer>

        <div>
          <AboutTitle>¿A qué nos dedicamos?</AboutTitle>
          <Description>
            En Selta Confecciones, brindamos soluciones inteligentes de personalización de prendas
            con ayuda de la inteligencia artificial. Nuestra misión es fusionar tecnología y creatividad
            para ofrecer productos que reflejen tu estilo único de forma original, creativa y accesible.
          </Description>

          <CardsContainer>
            <Card>
              <img src={calidadIcon} alt="Calidad" />
              <h4>Calidad</h4>
              <p>
                Nos comprometemos a ofrecer productos de alta calidad, cuidando cada detalle en el proceso.
              </p>
            </Card>

            <Card>
              <img src={innovacionIcon} alt="Innovación" />
              <h4>Innovación</h4>
              <p>
                Aplicamos tecnología avanzada para brindarte diseños únicos y personalizables al instante.
              </p>
            </Card>

            <Card>
              <img src={creatividadIcon} alt="Creatividad" />
              <h4>Creatividad</h4>
              <p>
                Queremos que cada diseño exprese quién eres. Diseña libremente y refleja tu estilo sin límites.
              </p>
            </Card>
          </CardsContainer>
        </div>
      </Container>
    </DiseñoSection>
  </Element>
);

export default Diseño;
