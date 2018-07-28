FROM node

WORKDIR /earthbnb

COPY ./package.json .
COPY ./packages/common/package.json ./packages/common/
COPY ./packages/api/package.json ./packages/api/

RUN npm i -g yarn
RUN yarn install --production

COPY ./packages/common/dist ./packages/common/dist
COPY ./packages/api/dist ./packages/api/dist
COPY ./packages/api/.env.prod ./packages/api/.env
COPY ./ormconfig.json .

WORKDIR ./packages/api

RUN ls

ENV NODE_ENV production

EXPOSE 4000

CMD ["node", "dist/index.js"]