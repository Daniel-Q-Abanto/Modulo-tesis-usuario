import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 40px;
  max-width: 600px;
  margin: auto;
  text-align: center;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
`;

const Input = styled.textarea`
  width: 100%;
  padding: 18px;
  font-size: 1.1rem;
  border: 2px solid #ddd;
  border-radius: 50px;  /* Bordes más redondeados */
  resize: none;
  margin-bottom: 25px;
  box-sizing: border-box;
  transition: all 0.3s ease;
  background: #f9f9f9;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);  /* Sombra sutil */

  &:focus {
    border-color: #ff6868;  /* Borde de color al enfocar */
    outline: none;
    box-shadow: 0 0 15px rgba(255, 104, 104, 0.5);  /* Sombra más fuerte al enfocar */
  }
`;

const FileInput = styled.input`
  display: none;
`;

const Button = styled.button`
  background-color: #ff6868;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;  /* Bordes redondeados */
  font-size: 1rem;
  cursor: pointer;
  margin: 12px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #e05050;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ImagenWrapper = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImagenGenerada = styled.img`
  width: 100%;
  max-width: 400px;
  height: 400px;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background: #f2f2f2;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: ${props => (props.show ? '0' : '-380px')};
  width: 350px;
  height: 100vh;
  background: linear-gradient(to bottom, #fff, #f9f9f9);
  border-left: 1px solid #ddd;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px 20px 80px;
  overflow-y: auto;
  transition: right 0.3s ease-in-out;
  z-index: 1000;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
  }
`;

const HistorialItem = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.03);
    background-color: #f1f1f1;
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    border-radius: 12px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  p {
    font-size: 1rem;
    color: #444;
    margin: 4px 0;
  }

  small {
    color: #999;
    font-size: 0.85rem;
  }

  .acciones {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
  }

  .acciones button {
    padding: 6px 12px;
    font-size: 0.9rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    background-color: #eee;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ddd;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: 15px;
  right: 20px;
  cursor: pointer;
  color: #666;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #ff6868;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
  margin: auto;
`;

const Prompt = () => {
  const [prompt, setPrompt] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [localImage, setLocalImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [historial, setHistorial] = useState([]);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const navigate = useNavigate();

  const generarImagen = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/generar-imagen/`,
        { prompt },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const imageUrl = response.data.imagen_url;
      if (imageUrl) {
        setImagenUrl(imageUrl);
        setLocalImage(null);
        obtenerHistorial();
      } else {
        alert('No se encontró imagen para este prompt.');
      }
    } catch (error) {
      console.error('Error al generar imagen:', error);
      alert(error.response?.data?.error || 'Ocurrió un error al generar la imagen.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLocalImage(imageUrl);
      setImagenUrl('');
    }
  };

  const irAPersonalizar = () => {
    const imagenSeleccionada = imagenUrl || localImage;
    navigate('/Personalizar', { state: { image: imagenSeleccionada } });
  };

  const obtenerHistorial = async () => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/historial-ia/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistorial(response.data);
    } catch (error) {
      console.error('Error al obtener historial:', error);
    }
  };

  const descargarImagen = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'imagen_ia.png'; // El nombre del archivo a descargar
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const eliminarImagen = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta imagen del historial?')) return;
    const token = localStorage.getItem('access_token');
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/historial-ia/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistorial((prev) => prev.filter(item => item.id_historial !== id));
    } catch (error) {
      console.error('Error al eliminar imagen:', error);
      alert('No se pudo eliminar la imagen.');
    }
  };

  useEffect(() => {
    if (mostrarHistorial) obtenerHistorial();
  }, [mostrarHistorial]);

  return (
    <>
      <Container>
        <Title>Genera una imagen con IA</Title>
        <Input
          rows="4"
          placeholder="¡Que comience la creatividad!"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div>
          <Button onClick={generarImagen} disabled={loading}>
            {loading ? 'Generando...' : 'Generar Imagen'}
          </Button>
          <label htmlFor="upload-image">
            <Button as="span">Subir Imagen</Button>
          </label>
          <FileInput
            id="upload-image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Button onClick={() => setMostrarHistorial(true)}>Ver historial</Button>
        </div>

        {loading && (
          <ImagenWrapper>
            <Loader />
          </ImagenWrapper>
        )}

        {(imagenUrl || localImage) && !loading && (
          <ImagenWrapper>
            <ImagenGenerada src={imagenUrl || localImage} alt="Vista previa" />
            <div>
              <Button onClick={irAPersonalizar}>Personalizar diseño</Button>
              <Button onClick={() => descargarImagen(imagenUrl || localImage)}>Descargar Imagen</Button>
            </div>
          </ImagenWrapper>
        )}
      </Container>

      <Sidebar show={mostrarHistorial}>
        <CloseButton onClick={() => setMostrarHistorial(false)}>×</CloseButton>
        <h3 style={{ marginBottom: '15px' }}>Historial de imágenes</h3>

        {historial.length === 0 ? (
          <p>No hay imágenes generadas aún.</p>
        ) : (
          historial.map((item) => (
            <HistorialItem key={item.id_historial}>
              <img
                src={item.imagen_generada}
                alt="IA"
                onClick={() => {
                  setImagenUrl(item.imagen_generada);
                  setLocalImage(null);
                  setMostrarHistorial(false);
                }}
              />
              <p><strong>Prompt:</strong> {item.prompt}</p>
              <small>{new Date(item.fecha_generacion).toLocaleString()}</small>
              <div className="acciones">
                <button onClick={() => descargarImagen(item.imagen_generada)}>Descargar</button>
                <button onClick={() => eliminarImagen(item.id_historial)}>Eliminar</button>
              </div>
            </HistorialItem>
          ))
        )}
      </Sidebar>
    </>
  );
};

export default Prompt;