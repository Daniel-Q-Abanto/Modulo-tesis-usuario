# Etapa única: usar nginx para servir la build ya preparada
FROM nginx:alpine

# Copia directamente tu carpeta build descomprimida
COPY build /usr/share/nginx/html

# Configura nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
