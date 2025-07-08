# Usamos Python 3.10 para coincidir con tu entorno local
FROM python:3.10-slim

# Carpeta de trabajo
WORKDIR /app

# Copiamos dependencias y las instalamos
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos todo el proyecto Django
COPY . .

# Variables de entorno
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Comando para ejecutar Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]
