# --- STAGE 1: BUILD STAGE ---
# Use a Node image to build the React application.
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
# This step is often cached, speeding up rebuilds if dependencies haven't changed
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application for production (creates a 'build' folder)
RUN npm run build


# --- STAGE 2: PRODUCTION STAGE (Serving with Nginx) ---
# Use a lightweight Nginx image to serve the static files
FROM nginx:stable-alpine

# Copy the compiled build output from the 'builder' stage
# The 'build' folder contains the optimized HTML, CSS, and JS.
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the port Nginx runs on
EXPOSE 80

# Command to start Nginx (this is the default command for this Nginx image)
CMD ["nginx", "-g", "daemon off;"]