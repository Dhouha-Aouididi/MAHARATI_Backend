# Utiliser l'image officielle Node.js en tant que base
FROM node:14

# Créer le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel votre application s'exécute
EXPOSE 3009

# Commande pour démarrer votre application
CMD ["npm", "start"]
