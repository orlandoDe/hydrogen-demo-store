# Use the official Node.js image (version 16 or later)
FROM node:16

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 8085

# Command to run the application
CMD ["node", "server.js"]