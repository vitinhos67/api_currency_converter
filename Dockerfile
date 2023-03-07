FROM node:14-alpine

# Define a pasta de trabalho da aplicação
WORKDIR /app

# Copia os arquivos necessários para a pasta de trabalho
COPY package*.json tsconfig.json .env ./
COPY src ./src

# Instala as dependências do projeto
RUN npm install

# Compila o código Typescript
RUN npm run build

# Expõe a porta 3000
EXPOSE 3000

# Inicia o servidor Node.js
CMD [ "npm", "start" ]