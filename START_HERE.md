# 🚀 9jaLinks - Complete Startup Guide

## ✅ All Issues Fixed!

All configuration errors have been resolved. Your application is ready to run!

## 🎯 Start All Services (5 Terminals)

Open **5 separate terminals** in VS Code and run these commands:

### Terminal 1 - Auth Service
```bash
cd "C:\Users\ABDULRZQ ISAH DIKKO\Pictures\9jaLinks"
npm run dev --workspace=@9jalinks/auth-service
```
**Expected output:**
```
[INFO] MongoDB connected successfully
[INFO] Auth service listening at http://localhost:3001
```

### Terminal 2 - User Service
```bash
cd "C:\Users\ABDULRZQ ISAH DIKKO\Pictures\9jaLinks"
npm run dev --workspace=@9jalinks/user-service
```
**Expected output:**
```
[INFO] MongoDB connected successfully (User Service)
[INFO] User service listening at http://localhost:3002
```

### Terminal 3 - Product Service
```bash
cd "C:\Users\ABDULRZQ ISAH DIKKO\Pictures\9jaLinks"
npm run dev --workspace=@9jalinks/product-service
```
**Expected output:**
```
[INFO] MongoDB connected successfully (Product Service)
[INFO] Product service listening at http://localhost:3003
```

### Terminal 4 - API Gateway
```bash
cd "C:\Users\ABDULRZQ ISAH DIKKO\Pictures\9jaLinks"
npm run dev --workspace=@9jalinks/api-gateway
```
**Expected output:**
```
[INFO] API Gateway listening at http://localhost:3000
[INFO] Auth Service: http://localhost:3001
[INFO] User Service: http://localhost:3002
[INFO] Product Service: http://localhost:3003
```

### Terminal 5 - Frontend (Next.js)
```bash
cd "C:\Users\ABDULRZQ ISAH DIKKO\Pictures\9jaLinks"
npm run dev --workspace=@9jalinks/web
```
**Expected output:**
```
▲ Next.js 14.2.33
- Local: http://localhost:3004
✓ Ready in 4s
```

---

## 🌐 Access Your Application

**Open your browser:** http://localhost:3004

You should see the beautiful 9jaLinks landing page!

---

## 🧪 Test Sign Up

1. Click **"Get Started"** or **"Sign up"**
2. Fill in the form:
   - **Name:** Your Name
   - **Email:** test@9jalinks.com
   - **Password:** password123
   - **Confirm Password:** password123
   - **Role:** Choose "Shop" 🛍️ or "Sell" 🏪
3. Check "I agree to terms"
4. Click **"Create Account"**

**What should happen:**
- Account is created in MongoDB
- You get a JWT token
- You're redirected to `/dashboard` (which will show 404 for now - that's normal!)

---

## 📊 Service Architecture

```
Browser (localhost:3001)
    ↓
Next.js Frontend (Port 3001)
    ↓
API Gateway (Port 3000)
    ↓
├── Auth Service (Port 3001) → MongoDB Atlas
├── User Service (Port 3002) → MongoDB Atlas
└── Product Service (Port 3003) → MongoDB Atlas
```

---

## ✅ Checklist Before Starting

- [ ] MongoDB Atlas cluster is running
- [ ] All `.env` files have correct MongoDB URI
- [ ] No other processes using ports 3000-3003, 3001
- [ ] All dependencies installed (`npm install` was run)
- [ ] Shared packages built (logger & common)

---

## 🔍 Troubleshooting

### If Auth Service Won't Start
- Check MongoDB connection string in `services/auth/.env`
- Verify MongoDB Atlas is accessible
- Check terminal for specific error messages

### If Frontend Shows Errors
- Make sure it's running on port 3001 (not 3000)
- Check browser console (F12) for errors
- Verify API Gateway is running on port 3000

### If Sign Up Fails
1. **Check browser console (F12 → Console tab)**
2. **Check Auth Service terminal** for error logs
3. **Check Gateway terminal** for proxy logs
4. **Verify MongoDB connection** - try logging into MongoDB Atlas

---

## 🎉 Success Indicators

When everything is working:
- ✅ All 5 terminals show services running
- ✅ No error messages in any terminal
- ✅ Landing page loads at http://localhost:3001
- ✅ Sign up creates account successfully
- ✅ MongoDB Atlas shows new user in database

---

## 📝 What's Next?

After successful sign up, you can:
1. **Test Login** - Try logging in with your new account
2. **Create Products** - Use the API to create products
3. **Build Dashboard** - Create user/vendor dashboard pages
4. **Add Features** - Shopping cart, product catalog, etc.

---

**Need help?** Share:
- Which terminal is showing errors
- The exact error message
- What you were trying to do

Let's get your application running! 🚀
