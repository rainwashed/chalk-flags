FROM node:16.40.0
RUN npm install
CMD ["node", "src/index.js"]