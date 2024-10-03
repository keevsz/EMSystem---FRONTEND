# Dockerfile del frontend
FROM node:20

WORKDIR /app

# Instalar curl
RUN apk add --no-cache curl

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

COPY ./wait-for-http.sh /app/wait-for-http.sh
RUN chmod +x /app/wait-for-http.sh

ENTRYPOINT ["./wait-for-http.sh", "http://backend:3001", "--"]

# Construir la aplicación
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000

# Start the server using the production build, utilizando wait-for-http
CMD ["./wait-for-http.sh", "http://backend:3001", "--", "npm", "run", "start"]

# # Start the server using the production build, utilizando wait-for-http
# CMD ["npm", "run", "start"]
