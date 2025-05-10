# ---------- server/Dockerfile ----------
FROM node:20-alpine          # tiny Node runtime
WORKDIR /usr/src/app

COPY server/package*.json ./  # copy manifest first (layer caching)
RUN npm ci --omit=dev         # install only prod deps

COPY server/ .                
EXPOSE 3000                   
CMD ["node", "server.js"]     
