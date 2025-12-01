# 🚀 Quick Start Guide - 9jaLinks

## Prerequisites

Before starting, ensure you have:
- ✅ **Node.js 18+** installed
- ✅ **MongoDB** running (local or cloud)
- ✅ **npm** package manager

## Step-by-Step Instructions

### 1️⃣ Verify MongoDB is Running

**Check if MongoDB is running:**
```bash
# Windows - check if MongoDB service is running
sc query MongoDB

# Or try connecting
mongosh
```

If MongoDB is not running, start it:
```bash
# Windows - start MongoDB service
net start MongoDB

# Or if installed manually
mongod
```

### 2️⃣ Install Dependencies (Already Done ✅)

The dependencies are already installed, but if you need to reinstall:
```bash
npm install
```

### 3️⃣ Start the Services

You need to open **5 separate terminal windows** in VS Code or your terminal app.

**How to open multiple terminals in VS Code:**
- Press `Ctrl + Shift + `` (backtick) to open terminal
- Click the `+` icon to add new terminals
- Or use the split terminal button

#### Terminal 1 - Auth Service
```bash
cd "c:\Users\ABDULRZQ ISAH DIKKO\Pictures\9jaLinks"
npm run dev --workspace=@9jalinks/auth-service
```

#### Terminal 2 - User Service
```bash
cd "c:\Users\ABDULRZQ ISAH DIKKO\Pictures\9jaLinks"
npm run dev --workspace=@9jalinks/user-service
```

#### Terminal 3 - Product Service
```bash
cd "c:\Users\ABDULRZQ ISAH DIKKO\Pictures\9jaLinks"
npm run dev --workspace=@9jalinks/product-service
```

#### Terminal 4 - API Gateway
```bash
cd "c:\Users\ABDULRZQ ISAH DIKKO\Pictures\9jaLinks"
npm run dev --workspace=@9jalinks/api-gateway
```

#### Terminal 5 - Frontend (Next.js)
```bash
cd "c:\Users\ABDULRZQ ISAH DIKKO\Pictures\9jaLinks"
npm run dev --workspace=@9jalinks/web
```

### 4️⃣ Verify Services are Running

You should see output like this in each terminal:

**Auth Service (Terminal 1):**
```
[INFO] MongoDB connected successfully
[INFO] Auth service listening at http://localhost:3001
```

**User Service (Terminal 2):**
```
[INFO] MongoDB connected successfully (User Service)
[INFO] User service listening at http://localhost:3002
```

**Product Service (Terminal 3):**
```
[INFO] MongoDB connected successfully (Product Service)
[INFO] Product service listening at http://localhost:3003
```

**API Gateway (Terminal 4):**
```
[INFO] API Gateway listening at http://localhost:3000
[INFO] Auth Service: http://localhost:3001
[INFO] User Service: http://localhost:3002
[INFO] Product Service: http://localhost:3003
```

**Frontend (Terminal 5):**
```
- ready started server on 0.0.0.0:3001, url: http://localhost:3001
```

### 5️⃣ Access the Application

Open your browser and navigate to:

🌐 **http://localhost:3001**

You should see the beautiful 9jaLinks landing page!

## 🎯 What You Can Do Now

### On the Website:
1. Click **"Get Started"** or **"Sign up"**
2. Fill in your details
3. Choose **"Shop"** (buyer) or **"Sell"** (vendor)
4. Create your account
5. Login with your credentials

### Test the API Directly:

**Register a user:**
```bash
curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d "{\"email\":\"test@example.com\",\"password\":\"password123\",\"name\":\"Test User\",\"role\":\"user\"}"
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

## 🔧 Troubleshooting

### Issue: "MongoDB connection error"
**Solution:** Make sure MongoDB is running
```bash
net start MongoDB
```

### Issue: "Port already in use"
**Solution:** Kill the process using the port or change the port in `.env` files

### Issue: "Module not found"
**Solution:** Rebuild shared packages
```bash
npm run build --workspace=@9jalinks/logger
npm run build --workspace=@9jalinks/common
```

### Issue: "ts-node not found"
**Solution:** This is being installed now. Wait for the installation to complete.

## 📝 Service URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3001 | User interface |
| API Gateway | http://localhost:3000 | Main API entry point |
| Auth Service | http://localhost:3001 | Authentication |
| User Service | http://localhost:3002 | User profiles |
| Product Service | http://localhost:3003 | Product catalog |

## 🎨 Features to Explore

- ✨ Beautiful landing page with animations
- 🔐 User registration and login
- 🛍️ Role-based access (Buyer/Vendor)
- 📱 Fully responsive design
- 🎭 Premium UI with glassmorphism effects

## 📚 Next Steps

Once everything is running:
1. Create a user account
2. Test the login flow
3. Explore the API endpoints
4. Check the [walkthrough.md](file:///C:/Users/ABDULRZQ%20ISAH%20DIKKO/.gemini/antigravity/brain/02b2cd39-3a1e-4d43-ba1e-0a3601f79924/walkthrough.md) for detailed documentation

---

**Need help?** Check the [README.md](file:///c:/Users/ABDULRZQ%20ISAH%20DIKKO/Pictures/9jaLinks/README.md) for more detailed instructions!
