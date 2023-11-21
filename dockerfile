# # Install dependencies only when needed
# FROM node:16.18.0 AS deps
# # RUN apk add --no-cache libc6-compat
# WORKDIR /app
# COPY package.json ./
# # COPY yarn.lock ./
# #RUN yarn install --frozen-lockfile
# RUN npm install --force

# # Rebuild the source code only when needed
# FROM node:16.18.0 AS builder
# WORKDIR /app
# COPY . .
# COPY --from=deps /app/node_modules ./node_modules
# RUN npm install --force -g env-cmd
# #RUN env-cmd -f .env.prod 
# RUN rm package-lock.json
# RUN npm run build --production --ignore-scripts --prefer-offline

# # Production image, copy all the files and run next
# FROM node:16.18.0 AS runner
# WORKDIR /app

# ENV NODE_ENV production

# COPY --from=builder /app/. ./

# EXPOSE 80

# ENV NEXT_TELEMETRY_DISABLED 1

# CMD ["npm", "run", "dev"]


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