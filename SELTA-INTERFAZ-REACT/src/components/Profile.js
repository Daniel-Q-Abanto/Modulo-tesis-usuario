import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Contenedor principal
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  background-color: #f2f2f2;
  font-family: 'Roboto', sans-serif;
  padding-top: 30px;
`;

// Título de la sección
const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  color: #3c3c3c;
  margin-bottom: 20px;
  text-align: center;
`;

// Información del usuario (contenedor)
const UserInfo = styled.div`
  background: #fff;
  padding: 35px;
  border-radius: 10px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

// Estilo de las filas de información
const InfoRow = styled.div`
  margin-bottom: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  color: #555;
  font-weight: 500;

  p {
    font-size: 1rem;
    color: #777;
  }

  span {
    color: #333;
    font-weight: 600;
  }
`;

// Contenedor de los botones
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
  gap: 10px;
`;

// Botón estilizado
const ButtonStyled = styled.button`
  background-color: #ff6868;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #e05d5d;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

// Estilo del formulario
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

// Estilo de los campos de entrada
const Input = styled.input`
  font-size: 1rem;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fafafa;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #ff6868;
    box-shadow: 0 0 5px rgba(255, 104, 104, 0.5);
  }
`;

// Alerta estilizada
const AlertStyled = styled.div`
  background-color: #4caf50;
  color: white;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  text-align: center;
  font-size: 1rem;
  width: 100%;
  max-width: 500px;
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease-in;

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

// Contenedor de historial de prompts
const HistoryContainer = styled.div`
  margin-top: 30px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 10px;
  background-color: #fafafa;
  border-radius: 6px;
  font-size: 1rem;
  color: #333;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
    transform: scale(1.02);
  }

  button {
    background-color: #ff6868;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background-color: #e05d5d;
    }
  }
`;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ nombre_usuario: '', correo: '', contraseña: '', confirmContraseña: '' });
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUser(data);
      setFormData({ nombre_usuario: data.nombre_usuario, correo: data.correo, contraseña: '', confirmContraseña: '' });
    };

    fetchUser();
  }, []);

  const fetchHistory = async () => {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/historial-ia/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setHistory(data);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setAlertMessage('');  // Clear alert when editing
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.contraseña !== formData.confirmContraseña && formData.contraseña) {
      setAlertMessage('Las contraseñas no coinciden');
      return;
    }

    const token = localStorage.getItem('access_token');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/profile/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setAlertMessage('Datos actualizados correctamente');
        setIsEditing(false);
        setTimeout(() => setAlertMessage(''), 4000); // Clear the alert after 4 seconds
      } else {
        setAlertMessage('Error al actualizar los datos');
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('Error en el servidor');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  };

  const handleViewHistory = async () => {
    setShowHistory(!showHistory);
    if (!showHistory) {
      await fetchHistory();
    }
  };

  const handleDeletePrompt = async (id) => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/historial-ia/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Prompt eliminado correctamente');
        setHistory(history.filter(item => item.id_historial !== id));
      } else {
        alert('Error al eliminar el prompt');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ProfileContainer>
      <Title>Perfil del Usuario</Title>
      {alertMessage && <AlertStyled>{alertMessage}</AlertStyled>} {/* Alerta de éxito o error */}

      {user ? (
        <UserInfo>
          {isEditing ? (
            <Form onSubmit={handleSave}>
              <Input
                type="text"
                name="nombre_usuario"
                placeholder="Nombre de usuario"
                value={formData.nombre_usuario}
                onChange={handleInputChange}
                required
              />
              <Input
                type="email"
                name="correo"
                placeholder="Correo electrónico"
                value={formData.correo}
                onChange={handleInputChange}
                required
              />
              <Input
                type="password"
                name="contraseña"
                placeholder="Nueva contraseña (opcional)"
                value={formData.contraseña}
                onChange={handleInputChange}
              />
              <Input
                type="password"
                name="confirmContraseña"
                placeholder="Confirmar contraseña"
                value={formData.confirmContraseña}
                onChange={handleInputChange}
              />
              <ButtonContainer>
                <ButtonStyled type="submit">Guardar</ButtonStyled>
                <ButtonStyled type="button" onClick={handleEditToggle}>
                  Cancelar
                </ButtonStyled>
              </ButtonContainer>
            </Form>
          ) : (
            <>
              <InfoRow>
                <p>Nombre:</p>
                <span>{user.nombre_usuario}</span>
              </InfoRow>
              <InfoRow>
                <p>Email:</p>
                <span>{user.correo}</span>
              </InfoRow>
              <InfoRow>
                <p>Rol:</p>
                <span>{user.rol ? user.rol.rol : 'No asignado'}</span>
              </InfoRow>
              <ButtonContainer>
                <ButtonStyled onClick={handleEditToggle}>Editar Perfil</ButtonStyled>
                <ButtonStyled secondary onClick={handleLogout}>
                  Cerrar Sesión
                </ButtonStyled>
              </ButtonContainer>
            </>
          )}
        </UserInfo>
      ) : (
        <p>Cargando...</p>
      )}

      <ButtonStyled onClick={handleViewHistory}>
        {showHistory ? 'Ocultar Historial' : 'Ver Historial de Prompts'}
      </ButtonStyled>

      {showHistory && (
        <HistoryContainer>
          <h3>Historial de Prompts</h3>
          {history.length > 0 ? (
            history.map((item) => (
              <HistoryItem key={item.id_historial}>
                <span>{item.prompt}</span>
                <button onClick={() => handleDeletePrompt(item.id_historial)}>Eliminar</button>
              </HistoryItem>
            ))
          ) : (
            <p>No hay prompts en el historial.</p>
          )}
        </HistoryContainer>
      )}
    </ProfileContainer>
  );
};

export default Profile;
