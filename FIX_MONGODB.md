# 🔧 Fix MongoDB Connection Error

## ❌ The Error
You are seeing `MongooseServerSelectionError`. This means **MongoDB Atlas blocked your connection** because your IP address is not on the "whitelist" (allowed list).

## ✅ The Solution: Allow Your IP Address

1. **Log in to MongoDB Atlas**: [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. In the left sidebar, under **Security**, click **Network Access**.
3. Click the green **+ ADD IP ADDRESS** button.
4. Click **ALLOW ACCESS FROM ANYWHERE** (or "Add Current IP Address").
   - *Note: "Allow Access From Anywhere" (0.0.0.0/0) is easiest for development so you don't have to keep updating it if your IP changes.*
5. Click **Confirm**.
6. **Wait 1-2 minutes** for the changes to deploy (status will change from "Pending" to "Active").

## 🔄 Restart Services

Once the status is "Active" in MongoDB Atlas:

1. Go to your **Auth Service terminal**.
2. It might restart automatically, but if it crashed, restart it:
   ```bash
   npm run dev --workspace=@9jalinks/auth-service
   ```
3. You should see: `[INFO] MongoDB connected successfully`

## 📝 Check Other Services
If Auth Service connects, the others (User, Product) should connect too. If they failed earlier, restart them as well.
