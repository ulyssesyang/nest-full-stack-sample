FROM node:carbon
# App directory
WORKDIR /app

# App dependencies
COPY package*.json ./
RUN npm i

# Copy app source code
COPY . .

# Env setup
COPY .env.dev .env.test .env.prod

#Expose port and begin application
EXPOSE 6060

# Start the app
CMD [ "npm", "run", "start:dev"]