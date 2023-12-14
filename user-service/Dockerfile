FROM node:18-alpine


RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN rm -rf package-lock.json
RUN rm -rf node_modules/
RUN npm install
# RUN npm run migration:generate
# RUN npm run migration:run

EXPOSE 50052
CMD ["npm", "run", "start:dev"]


