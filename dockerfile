# Utilise une image Node.js comme base
FROM node:16.18.0

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm install --force

# Copie le reste des fichiers de l'application
COPY . .

# Expose le port sur lequel l'application Next.js s'exécute
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "run", "dev"]