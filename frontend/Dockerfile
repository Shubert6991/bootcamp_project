FROM node:18-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent

COPY . ./

RUN chown -R node /app/node_modules

USER node
CMD npm start --host 0.0.0.0 --port 3000 --disableHostCheck true

# CMD ["npm", "start"]