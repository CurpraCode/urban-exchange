FROM node:16

# Create app directory
WORKDIR /user/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND yarn.lock are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn install
# If you are building your code for production
# RUN yarn ci --only=production

# Bundle app source
COPY . .

RUN yarn build


EXPOSE 8080
CMD [ "node", "dist/main" ]