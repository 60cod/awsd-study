# Build stage

FROM node:18 as BUILD

WORKDIR /usr/src/app-dir

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

# Production stage

FROM node:18 as PRODUCTION

WORKDIR /usr/src/app-dir

COPY --from=BUILD ./usr/src/app-dir/build ./build
COPY --from=BUILD ./usr/src/app-dir/package.json ./package.json
COPY --from=BUILD ./usr/src/app-dir/package-lock.json ./package-lock.json

RUN npm install --only=production

CMD ["npm", "start"]