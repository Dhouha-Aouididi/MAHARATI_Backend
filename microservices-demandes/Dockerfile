# Utilisez une image de base Node.js
FROM node:14

# Créez le répertoire de travail de l'application
WORKDIR /usr/src/app

# Copiez les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers de l'application
COPY . .

# Exposez le port sur lequel votre application écoute
EXPOSE 3009

# Commande pour démarrer l'application
CMD ["npm", "start"]
