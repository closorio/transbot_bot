# Usa una imagen base de Node.js
FROM node:14

# Crea un directorio de trabajo
WORKDIR /transbot

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código al directorio de trabajo
COPY . .

# Define el comando para ejecutar la aplicación
CMD [ "npm", "start" ]
