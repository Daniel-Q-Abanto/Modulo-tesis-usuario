import React from 'react';
import styled from 'styled-components';

const colores = {
  blanco: '#ffffff',
  negro: '#000000',
  rojo: '#e53935',
  amarillo: '#fdd835',
  azulmarino: '#1e3a8a',
  plomo: '#757575',
  verde: '#4caf50',
  rosa: '#f48fb1',
  crema: '#fff9c4',
  marron: '#8B4513',
  naranja: '#ff9800',
  celeste: '#4fc3f7',

};

const Controls = styled.div`
  width: 250px;
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
`;

const SectionTitle = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  margin: 20px 0 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const OptionButton = styled.button`
  padding: 8px 16px;
  background: ${(props) => (props.selected ? '#ffb3b3' : 'linear-gradient(to right, #ececec, #d9d9d9)')};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover {
    transform: scale(1.05);
    background: #ffe5e5;
  }
`;

export const ColorSelector = ({ color, setColor, talla, setTalla }) => {
  const handleTallaClick = (tallaSeleccionada) => {
    setTalla((prev) => (prev === tallaSeleccionada ? null : tallaSeleccionada));
  };

  return (
    <Controls>
      <h4>Selecciona color del polo:</h4>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
        {Object.entries(colores).map(([nombre, hex]) => (
          <div
            key={nombre}
            onClick={() => setColor(nombre)}
            style={{
              backgroundColor: hex,
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              cursor: 'pointer',
              border: color === nombre ? '2px solid #000' : '1px solid #ccc',
            }}
          />
        ))}
      </div>

      <SectionTitle>Tallas</SectionTitle>
      <ButtonGroup>
        {['S', 'M', 'L', 'XL', 'XXL'].map((t) => (
          <OptionButton
            key={t}
            onClick={() => handleTallaClick(t)}
            selected={talla === t}
          >
            {t}
          </OptionButton>
        ))}
      </ButtonGroup>
    </Controls>
  );
};
