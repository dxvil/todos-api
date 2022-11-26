# install node

FROM node:alpine

# COPY all the files from Current Directory into the Container
COPY ./ ./

# Install the project dependencies 
RUN npm install

# Tell that this image is going to Open a Port 
EXPOSE 9999:9999

# Default Command to launch the Application 
CMD ["npm", "run", "dev"]