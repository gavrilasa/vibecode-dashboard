FROM node:20 as base

RUN curl -fsSL https://bun.sh/install | bash && \
    mv /root/.bun/bin/bun /usr/local/bin

WORKDIR /usr/src/app

COPY package*.json bun.lock ./
RUN bun install

COPY . .
RUN bun run build

FROM node:20 as production

RUN curl -fsSL https://bun.sh/install | bash && \
    mv /root/.bun/bin/bun /usr/local/bin

WORKDIR /usr/src/app

COPY --from=base /usr/src/app/node_modules ./node_modules
COPY --from=base /usr/src/app/.next ./.next
COPY --from=base /usr/src/app/package*.json ./
COPY --from=base /usr/src/app/bun.lock ./

EXPOSE 3000

CMD ["bun", "run", "start"]