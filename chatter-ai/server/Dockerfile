# ────────────────────────────────────────────────────────────────
# Chatter-AI  •  Express API container
# Builds a lean production image for the back-end service.
# ────────────────────────────────────────────────────────────────

# 1️⃣ Base image — Node.js 20 on Alpine (small footprint)
FROM node:20-alpine

# 2️⃣ Create & switch to working directory inside the container
WORKDIR /usr/src/app

# 3️⃣ Copy dependency manifests first (better layer-caching)
COPY package*.json ./

# 4️⃣ Install ONLY production dependencies
RUN npm ci --omit=dev

# 5️⃣ Copy the rest of the API source code into the image
COPY . .

# 6️⃣ Expose the port the Express server listens on
EXPOSE 3000

# 7️⃣ Default command — launch the server
CMD ["node", "server.js"]
