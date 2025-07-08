import React, { useRef } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { Rnd } from 'react-rnd';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import BlancoPecho from '../assets/Blanco/BlancoPecho.png';
import BlancoEspalda from '../assets/Blanco/BlancoEspalda.png';
import NegroPecho from '../assets/Negro/NegroPecho.png';
import NegroEspalda from '../assets/Negro/NegroEspalda.png';
import RojoPecho from '../assets/Rojo/RojoPecho.png';
import RojoEspalda from '../assets/Rojo/RojoEspalda.png';
import AmarilloPecho from '../assets/Amarillo/AmarilloPecho.png';
import AmarilloEspalda from '../assets/Amarillo/AmarilloEspalda.png';
import AzulMarinoPecho from '../assets/AzulMarino/AzulMarinoPecho.png';
import AzulMarinoEspalda from '../assets/AzulMarino/AzulMarinoEspalda.png';
import PlomoPecho from '../assets/Plomo/PlomoPecho.png';
import PlomoEspalda from '../assets/Plomo/PlomoEspalda.png';
import VerdePecho from '../assets/Verde/VerdePecho.png';
import VerdeEspalda from '../assets/Verde/VerdeEspalda.png';
import RosaPecho from '../assets/Rosa/RosaPecho.png';
import RosaEspalda from '../assets/Rosa/RosaEspalda.png';
import CremaPecho from '../assets/Crema/CremaPecho.png';
import CremaEspalda from '../assets/Crema/CremaEspalda.png';
import MarronPecho from '../assets/Marron/MarronPecho.png';
import MarronEspalda from '../assets/Marron/MarronEspalda.png';
import NaranjaPecho from '../assets/Naranja/NaranjaPecho.png';
import NaranjaEspalda from '../assets/Naranja/NaranjaEspalda.png';
import CelestePecho from '../assets/Celeste/CelestePecho.png';
import CelesteEspalda from '../assets/Celeste/CelesteEspalda.png';

const mockups = {
  blanco: { pecho: BlancoPecho, espalda: BlancoEspalda },
  negro: { pecho: NegroPecho, espalda: NegroEspalda },
  rojo: { pecho: RojoPecho, espalda: RojoEspalda },
  amarillo: { pecho: AmarilloPecho, espalda: AmarilloEspalda },
  azulmarino: { pecho: AzulMarinoPecho, espalda: AzulMarinoEspalda },
  plomo: { pecho: PlomoPecho, espalda: PlomoEspalda },
  verde: { pecho: VerdePecho, espalda: VerdeEspalda },
  rosa: { pecho: RosaPecho, espalda: RosaEspalda },
  crema: { pecho: CremaPecho, espalda: CremaEspalda },
  marron: { pecho: MarronPecho, espalda: MarronEspalda },
  naranja: { pecho: NaranjaPecho, espalda: NaranjaEspalda },
  celeste: { pecho: CelestePecho, espalda: CelesteEspalda },
};

const Container = styled.div`
  background-color: #eef2f7;
  min-height: 100vh;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 30px;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const PoloWrapper = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
`;

const MockupImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 2;
`;

const InfoCard = styled.div`
  background: white;
  padding: 25px 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  text-align: left;
  min-width: 300px;
  flex: 1;
`;

const InfoItem = styled.div`
  margin-bottom: 12px;
  strong {
    display: block;
    font-weight: bold;
    font-size: 1.05rem;
    margin-bottom: 3px;
    color: #444;
  }
  span {
    font-size: 1rem;
    color: #666;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #ff6868;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e05050;
  }
`;

const Finalizacion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const finalRef = useRef();

  const {
    modelo,
    material,
    color,
    talla,
    cantidad,
    imagePecho,
    imageEspalda,
    vista,
    posPecho,
    posEspalda
  } = location.state || {};

  const mockupActual = mockups[color];

  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(finalRef.current);
    const imgData = canvas.toDataURL('image/png');

    const doc = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] });
    doc.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    doc.save('mockup_completo.pdf');
  };

  const handleEnviarProduccion = async () => {
  const canvas = await html2canvas(finalRef.current);
  const imgData = canvas.toDataURL('image/png');
  const pdfDoc = new jsPDF();
  pdfDoc.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  const pdfUrl = pdfDoc.output('bloburl');

  const mensaje = `Hola, quiero enviar el siguiente diseño a producción: ${pdfUrl}`;
  const whatsappUrl = `https://wa.me/message/RNKBE23J25CVA1?text=${encodeURIComponent(mensaje)}`; // Tu enlace aquí
  window.open(whatsappUrl, '_blank');
};


  return (
    <Container>
      <Title>Mockup Finalizado</Title>

      <ContentWrapper ref={finalRef}>
        {(vista === 'ambos' || vista === 'pecho') && (
          <PoloWrapper>
            {imagePecho && (
              <Rnd
                size={{ width: posPecho.width, height: posPecho.height }}
                position={{ x: posPecho.x, y: posPecho.y }}
                enableResizing={false}
                disableDragging
                style={{ zIndex: 3 }}
              >
                <img src={imagePecho} alt="Diseño pecho" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '10px' }} />
              </Rnd>
            )}
            <MockupImage src={mockupActual?.pecho} alt="Polo frente" />
          </PoloWrapper>
        )}

        {(vista === 'ambos' || vista === 'espalda') && (
          <PoloWrapper>
            {imageEspalda && (
              <Rnd
                size={{ width: posEspalda.width, height: posEspalda.height }}
                position={{ x: posEspalda.x, y: posEspalda.y }}
                enableResizing={false}
                disableDragging
                style={{ zIndex: 3 }}
              >
                <img src={imageEspalda} alt="Diseño espalda" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '10px' }} />
              </Rnd>
            )}
            <MockupImage src={mockupActual?.espalda} alt="Polo espalda" />
          </PoloWrapper>
        )}

        <InfoCard>
          <InfoItem><strong>Modelo:</strong><span>{modelo}</span></InfoItem>
          <InfoItem><strong>Material:</strong><span>{material}</span></InfoItem>
          <InfoItem><strong>Color:</strong><span>{color}</span></InfoItem>
          <InfoItem><strong>Talla:</strong><span>{talla}</span></InfoItem>
          <InfoItem><strong>Cantidad:</strong><span>{cantidad}</span></InfoItem>
        </InfoCard>
      </ContentWrapper>

      <ButtonGroup>
        <Button onClick={handleDownloadPDF}>Descargar PDF</Button>
        <Button onClick={() => navigate('/prompts')}>Volver al Generador</Button>
        <Button onClick={handleEnviarProduccion}>Enviar a Producción</Button>
      </ButtonGroup>
    </Container>
  );
};

export default Finalizacion;
