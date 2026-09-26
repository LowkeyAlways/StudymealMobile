FROM node:22-alpine AS quality

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .

CMD ["npm", "run", "quality"]
