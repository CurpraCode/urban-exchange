FROM node:16
WORKDIR /user/src/app
COPY package*.json ./

RUN yarn install
# If you are building your code for production
# RUN yarn ci --only=production

# Bundle app source
COPY . .

RUN yarn build


EXPOSE 8080
CMD [ "node", "dist/main" ]