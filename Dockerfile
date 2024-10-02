FROM node:20-alpine
WORKDIR /app
COPY pnpm-lock.yaml package.json ./
COPY . .
RUN npm i -g pnpm && pnpm i && pnpm dlx tailwindcss -i ./src/index.css -o ./src/dist.css
RUN pnpm build
CMD ["pnpm", "dlx", "serve", "-s", "dist", "-l", "5173"]


