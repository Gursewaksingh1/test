# Pull the Node image from Docker Hub
FROM node:16.15

# Setting Working Directory
WORKDIR /app-backend


COPY package*.json ./


# Copy rest of the code to container
COPY . .

# Install Dependencies
RUN npm install

RUN apt-get update && apt-get install -y netcat

EXPOSE 2000

# Run the API
CMD ["npm", "start"]