# ---- Build Frontend Stage ----
FROM node:18 AS build-frontend

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Vite application
RUN npm run build:frontend

# ---- Build Frontend Stage ----
FROM node:18 AS build-backend

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Vite application
RUN npm run build:backend

# ---- Serve Stage ----
FROM node:18 AS serve

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY src/services/backend/package.json ./src/services/backend/package.json
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy the frontend built assets from the build stage
COPY --from=build-frontend /app/src/services/frontend/dist /app/public

# Copy the backend built assets from the build stage
COPY --from=build-backend /app/src/services/backend/dist /app

# Expose the port the app will run on
EXPOSE 80

# Start the application
CMD ["node", "index.js"]
