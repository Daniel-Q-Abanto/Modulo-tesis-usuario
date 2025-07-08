import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { Rnd } from 'react-rnd';
import { FaTrash } from 'react-icons/fa';

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

import { SidebarInfo } from './SidebarInfo';
import { ColorSelector } from './ColorSelector';

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
  marron: {pecho: MarronPecho, espalda: MarronEspalda},
  naranja: {pecho: NaranjaPecho, espalda: NaranjaEspalda},
  celeste: {pecho: CelestePecho, espalda: CelesteEspalda},
};

const Container = styled.div`
  background-color: #eef2f7;
  padding: 30px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 1400px; /* Aumenta esto para dar más aire */
  margin-top: 20px;
  padding: 0 20px;
  gap: 40px;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Center = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
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

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff6868;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const ViewButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const ViewButton = styled.button`
  background-color: #ff6868;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e05050;
  }
`;

const AddButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff6868;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  z-index: 5;
`;

const FinalButton = styled.button`
  margin-top: 30px;
  padding: 14px 28px;
  background-color: #ff4d4d;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e43c3c;
  }
`;

const DeleteIcon = styled(FaTrash)`
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  background: #ff6868;
  border-radius: 50%;
  padding: 6px;
  font-size: 1rem;
  cursor: pointer;
  z-index: 5;
`;

const HiddenFileInput = styled.input`
  display: none;
`;
export const Personalizar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const diseñoRef = useRef();
  const defaultImage = location.state?.image;

  const [vista, setVista] = useState(null);
  const [color, setColor] = useState('blanco');
  const [modelo, setModelo] = useState(null);
  const [material, setMaterial] = useState(null);
  const [subMaterial, setSubMaterial] = useState(null);
  const [talla, setTalla] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  const [imagePecho, setImagePecho] = useState(null);
  const [imageEspalda, setImageEspalda] = useState(null);
  const [posPecho, setPosPecho] = useState({ x: 110, y: 100, width: 180, height: 180 });
  const [posEspalda, setPosEspalda] = useState({ x: 110, y: 100, width: 180, height: 180 });

  const mockupActual = mockups[color];

  const handleDragStop = (d, posSetter) => {
    posSetter((prev) => ({ ...prev, x: d.x, y: d.y }));
  };

  const handleResizeStop = (e, direction, ref, delta, position, posSetter) => {
    posSetter({
      x: position.x,
      y: position.y,
      width: parseInt(ref.style.width, 10),
      height: parseInt(ref.style.height, 10),
    });
  };

  const seleccionarVistaInicial = (opcion) => {
    setVista(opcion);
    if (opcion === 'pecho') setImagePecho(defaultImage);
    else if (opcion === 'espalda') setImageEspalda(defaultImage);
  };

  const handleFileUploadPecho = (e) => {
    const file = e.target.files[0];
    if (file) setImagePecho(URL.createObjectURL(file));
  };

  const handleFileUploadEspalda = (e) => {
    const file = e.target.files[0];
    if (file) setImageEspalda(URL.createObjectURL(file));
  };
  const handleFinalizar = () => {
  if (!modelo || !material || !subMaterial || !talla || !cantidad || !color) {
    alert('Por favor selecciona todas las características del polo antes de finalizar.');
    return;
  }

  navigate('/finalizar', {
    state: {
      imagePecho,
      imageEspalda,
      color,
      modelo,
      material: `${material} ${subMaterial}`,
      talla,
      cantidad,
      vista,
      posPecho,
      posEspalda,
    },
  });
};


  if (!vista) {
    return (
      <Container>
        <Title>¿Dónde deseas aplicar tu diseño?</Title>
        <ViewButtons>
          <ViewButton onClick={() => seleccionarVistaInicial('pecho')}>Pecho</ViewButton>
          <ViewButton onClick={() => seleccionarVistaInicial('espalda')}>Espalda</ViewButton>
        </ViewButtons>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Personalizar</Title>
      <Content>
        <SidebarInfo
          modelo={modelo}
          setModelo={setModelo}
          material={material}
          setMaterial={setMaterial}
          subMaterial={subMaterial}
          setSubMaterial={setSubMaterial}
          cantidad={cantidad}
          setCantidad={setCantidad}
        />
        <Center>
  {vista === 'ambos' ? (
    <>
      {/* Polo - Pecho */}
      <PoloWrapper>
        {imagePecho && (
          <Rnd
            size={{ width: posPecho.width, height: posPecho.height }}
            position={{ x: posPecho.x, y: posPecho.y }}
            onDragStop={(e, d) => handleDragStop(d, setPosPecho)}
            onResizeStop={(e, dir, ref, delta, pos) =>
              handleResizeStop(e, dir, ref, delta, pos, setPosPecho)
            }
            bounds="parent"
            lockAspectRatio
            style={{ zIndex: 3 }}
          >
            <img
              src={imagePecho}
              alt="Diseño pecho"
              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '10px' }}
            />
          </Rnd>
        )}
        {imagePecho && <DeleteIcon onClick={() => setImagePecho(null)} />}
        {!imagePecho && (
          <>
            <HiddenFileInput type="file" accept="image/*" id="file-pecho" onChange={handleFileUploadPecho} />
            <AddButton onClick={() => document.getElementById('file-pecho').click()}>
              ¿Deseas agregar diseño?
            </AddButton>
          </>
        )}
        <MockupImage src={mockupActual.pecho} alt="Polo frente" />
      </PoloWrapper>

      {/* Polo - Espalda */}
      <PoloWrapper>
        {imageEspalda && (
          <Rnd
            size={{ width: posEspalda.width, height: posEspalda.height }}
            position={{ x: posEspalda.x, y: posEspalda.y }}
            onDragStop={(e, d) => handleDragStop(d, setPosEspalda)}
            onResizeStop={(e, dir, ref, delta, pos) =>
              handleResizeStop(e, dir, ref, delta, pos, setPosEspalda)
            }
            bounds="parent"
            lockAspectRatio
            style={{ zIndex: 3 }}
          >
            <img
              src={imageEspalda}
              alt="Diseño espalda"
              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '10px' }}
            />
          </Rnd>
        )}
        {imageEspalda && <DeleteIcon onClick={() => setImageEspalda(null)} />}
        {!imageEspalda && (
          <>
            <HiddenFileInput type="file" accept="image/*" id="file-espalda" onChange={handleFileUploadEspalda} />
            <AddButton onClick={() => document.getElementById('file-espalda').click()}>
              ¿Deseas agregar diseño?
            </AddButton>
          </>
        )}
        <MockupImage src={mockupActual.espalda} alt="Polo espalda" />
      </PoloWrapper>
    </>
  ) : (
    <PoloWrapper ref={diseñoRef}>
      {/* Renderiza solo la vista seleccionada */}
      {(vista === 'pecho' && imagePecho) && (
        <Rnd
          size={{ width: posPecho.width, height: posPecho.height }}
          position={{ x: posPecho.x, y: posPecho.y }}
          onDragStop={(e, d) => handleDragStop(d, setPosPecho)}
          onResizeStop={(e, dir, ref, delta, pos) =>
            handleResizeStop(e, dir, ref, delta, pos, setPosPecho)
          }
          bounds="parent"
          lockAspectRatio
          style={{ zIndex: 3 }}
        >
          <img
            src={imagePecho}
            alt="Diseño pecho"
            style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '10px' }}
          />
        </Rnd>
      )}
      {(vista === 'pecho' && imagePecho) && <DeleteIcon onClick={() => setImagePecho(null)} />}
      {(vista === 'pecho' && !imagePecho) && (
        <>
          <HiddenFileInput type="file" accept="image/*" id="file-pecho" onChange={handleFileUploadPecho} />
          <AddButton onClick={() => document.getElementById('file-pecho').click()}>
            ¿Deseas agregar diseño?
          </AddButton>
        </>
      )}
      {(vista === 'pecho') && <MockupImage src={mockupActual.pecho} alt="Polo frente" />}

      {(vista === 'espalda' && imageEspalda) && (
        <Rnd
          size={{ width: posEspalda.width, height: posEspalda.height }}
          position={{ x: posEspalda.x, y: posEspalda.y }}
          onDragStop={(e, d) => handleDragStop(d, setPosEspalda)}
          onResizeStop={(e, dir, ref, delta, pos) =>
            handleResizeStop(e, dir, ref, delta, pos, setPosEspalda)
          }
          bounds="parent"
          lockAspectRatio
          style={{ zIndex: 3 }}
        >
          <img
            src={imageEspalda}
            alt="Diseño espalda"
            style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '10px' }}
          />
        </Rnd>
      )}
      {(vista === 'espalda' && imageEspalda) && <DeleteIcon onClick={() => setImageEspalda(null)} />}
      {(vista === 'espalda' && !imageEspalda) && (
        <>
          <HiddenFileInput type="file" accept="image/*" id="file-espalda" onChange={handleFileUploadEspalda} />
          <AddButton onClick={() => document.getElementById('file-espalda').click()}>
            ¿Deseas agregar diseño?
          </AddButton>
        </>
      )}
      {(vista === 'espalda') && <MockupImage src={mockupActual.espalda} alt="Polo espalda" />}
    </PoloWrapper>
  )}
</Center>


        <ColorSelector color={color} setColor={setColor} talla={talla} setTalla={setTalla} />
      </Content>

      <ViewButtons>
        {['pecho', 'espalda', 'ambos'].map((v) => (
          <ViewButton key={v} onClick={() => setVista(v)}>
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </ViewButton>
        ))}
      </ViewButtons>

      <FinalButton onClick={handleFinalizar}>Finalizar</FinalButton>
      <BackButton onClick={() => navigate('/prompts')}>Volver a generar</BackButton>
    </Container>
  );
};

export default Personalizar;
