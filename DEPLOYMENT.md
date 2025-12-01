# 🚀 Deployment Guide for 9jaLinks

This guide explains how to deploy your microservices application to production.

## 📋 Prerequisites

1.  **GitHub Account:** Push your code to a GitHub repository.
2.  **Vercel Account:** For deploying the Frontend (Next.js).
3.  **Railway or Render Account:** For deploying Backend Services.
4.  **MongoDB Atlas:** You already have this! Use the connection string.

---

## 1️⃣ Deploy Frontend (Next.js) to Vercel

Vercel is the creators of Next.js and the best place to deploy it.

1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your **9jaLinks** GitHub repository.
4.  **Configure Project:**
    *   **Framework Preset:** Next.js
    *   **Root Directory:** Click "Edit" and select `apps/web`.
5.  **Environment Variables:**
    *   Add `NEXT_PUBLIC_API_URL`.
    *   *Value:* The URL of your deployed API Gateway (you'll get this in Step 2). For now, you can leave it blank and update it later.
6.  Click **Deploy**.

---

## 2️⃣ Deploy Backend Services (Railway)

Railway is excellent for monorepos and microservices.

1.  Go to [Railway Dashboard](https://railway.app/).
2.  Click **"New Project"** -> **"Deploy from GitHub repo"**.
3.  Select your **9jaLinks** repo.
4.  **Configure Services:**
    *   Railway will try to detect your services. You need to add a service for each folder: `services/auth`, `services/user`, `services/product`, `services/gateway`.
    *   For each service, go to **Settings** -> **Root Directory** and set it (e.g., `services/auth`).
    *   **Build Command:** `npm run build`
    *   **Start Command:** `npm start`

5.  **Environment Variables (for each service):**
    *   Go to the **Variables** tab for each service.
    *   Add the variables from your local `.env` files (`MONGO_URI`, `JWT_SECRET`, `PORT` is handled by Railway).
    *   **Important:** For the **API Gateway**, you need to set the Service URLs (`AUTH_SERVICE_URL`, etc.) to the *internal* Railway addresses of your other services.

---

## 3️⃣ Docker Deployment (Advanced)

You can also containerize your application using Docker.

### Create a `Dockerfile` for each service

Example `Dockerfile` for `services/auth`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY services/auth/package*.json ./services/auth/
COPY packages/ ./packages/

RUN npm install

COPY . .

RUN npm run build --workspace=@9jalinks/common
RUN npm run build --workspace=@9jalinks/logger
RUN npm run build --workspace=@9jalinks/auth-service

CMD ["npm", "start", "--workspace=@9jalinks/auth-service"]
```

Build and run with `docker-compose`.

---

## 📝 Post-Deployment Checklist

- [ ] Update `NEXT_PUBLIC_API_URL` in Vercel to point to your production API Gateway.
- [ ] Whitelist the IP addresses of your Railway/Render services in MongoDB Atlas (or allow 0.0.0.0/0).
- [ ] Test the full flow: Sign up -> Login -> Create Product.
