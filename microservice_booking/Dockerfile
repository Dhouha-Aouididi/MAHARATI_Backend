# Base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build stage (optional, if your app requires a build step)
FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules
COPY . .

# Start command
CMD [ "npm", "start" ]
