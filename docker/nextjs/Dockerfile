# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY frontend/package.json ./
COPY frontend/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY frontend/ ./

# Build the application using npx to ensure the correct execution of the next command
RUN npx next build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npx", "next", "start"]
