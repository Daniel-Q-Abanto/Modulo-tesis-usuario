import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
  position: relative;
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
  background: ${(props) =>
    props.selected ? '#ffb3b3' : 'linear-gradient(to right, #ececec, #d9d9d9)'};
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

const DropdownWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DropdownContent = styled.div`
  display: flex;
  gap: 10px;
`;

const ClearButton = styled.span`
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 0.85rem;
  color: #ff6868;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    opacity: 0.7;
  }
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  font-size: 18px;
  background: #ffb3b3;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #ff8888;
  }
`;

const QuantityInput = styled.input`
  width: 60px;
  padding: 5px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

export const SidebarInfo = ({ modelo, setModelo, material, setMaterial, subMaterial, setSubMaterial, cantidad, setCantidad }) => {
  const handleModeloClick = (modeloValue) => {
    setModelo((prev) => (prev === modeloValue ? null : modeloValue));
  };

  const handleMaterialClick = (materialValue) => {
    if (material === materialValue) {
      setMaterial(null);
      setSubMaterial(null);
    } else {
      setMaterial(materialValue);
    }
  };

  const handleSubClick = (valor) => {
    setSubMaterial((prev) => (prev === valor ? null : valor));
  };

  const handleClear = () => {
    setModelo(null);
    setMaterial(null);
    setSubMaterial(null);
    setCantidad(1);
  };

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 0) {
      setCantidad(val);
    }
  };

  const increment = () => setCantidad((prev) => prev + 1);
  const decrement = () => setCantidad((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <SidebarContainer>
      <ClearButton onClick={handleClear}>Limpiar</ClearButton>

      <SectionTitle>MODELO DE POLO</SectionTitle>
      <ButtonGroup>
        {['Básico', 'Oversize', 'BoxyFit'].map((modeloValue) => (
          <OptionButton
            key={modeloValue}
            onClick={() => handleModeloClick(modeloValue)}
            selected={modelo === modeloValue}
          >
            {modeloValue}
          </OptionButton>
        ))}
      </ButtonGroup>

      <SectionTitle>MATERIAL</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {['Algodón', 'Poliéster'].map((materialValue) => (
          <DropdownWrapper key={materialValue}>
            <OptionButton
              onClick={() => handleMaterialClick(materialValue)}
              selected={material === materialValue}
            >
              {materialValue}
            </OptionButton>
            {material === materialValue && (
              <DropdownContent>
                <OptionButton
                  onClick={() => handleSubClick('20/1')}
                  selected={subMaterial === '20/1'}
                >
                  20/1
                </OptionButton>
                <OptionButton
                  onClick={() => handleSubClick('30/1')}
                  selected={subMaterial === '30/1'}
                >
                  30/1
                </OptionButton>
              </DropdownContent>
            )}
          </DropdownWrapper>
        ))}
      </div>

      <SectionTitle>CANTIDAD DE POLOS</SectionTitle>
      <QuantityWrapper>
        <QuantityButton onClick={decrement}>−</QuantityButton>
        <QuantityInput
          type="number"
          value={cantidad}
          onChange={handleQuantityChange}
        />
        <QuantityButton onClick={increment}>+</QuantityButton>
      </QuantityWrapper>
    </SidebarContainer>
  );
};
