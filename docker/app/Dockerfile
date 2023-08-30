# Use the official Node.js image as the base image
FROM node:14

# Create and set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# # Build TypeScript code
# RUN npm run build

# Expose the port your app is running on
EXPOSE 8081

# Command to start your app
CMD ["npm", "start"]
