# 🔧 Troubleshooting Guide - Common Errors

## Most Common Errors & Solutions

### ❌ Error 1: "Cannot find module '@9jalinks/logger'" or "@9jalinks/common"

**Cause:** Shared packages not built

**Solution:**
```bash
npm run build --workspace=@9jalinks/logger
npm run build --workspace=@9jalinks/common
```

Then restart the services.

---

### ❌ Error 2: "ts-node: command not found" or "ts-node is not recognized"

**Cause:** ts-node not installed or nodemon config issue

**Solution:** Update nodemon config to use ts-node properly.

I'll create a fix for this - add `nodemon.json` files to each service.

---

### ❌ Error 3: "MongoDB connection error" or "MongooseServerSelectionError"

**Cause:** Cannot connect to MongoDB Atlas

**Solutions:**
1. Check your internet connection
2. Verify MongoDB Atlas cluster is running
3. Check the connection string in `.env` files
4. Make sure IP address is whitelisted (0.0.0.0/0)

**Test connection:**
```bash
# In PowerShell
curl "https://cluster0.gmnl4qa.mongodb.net"
```

---

### ❌ Error 4: "Port 3001 (or 3002, 3003) already in use"

**Cause:** Another process is using the port

**Solution:**
```powershell
# Kill all Node processes
Get-Process node | Stop-Process -Force

# Or kill specific port (e.g., 3001)
$port = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue
if ($port) { Stop-Process -Id $port.OwningProcess -Force }
```

---

### ❌ Error 5: "Module not found: Can't resolve 'next'"

**Cause:** Frontend dependencies not installed

**Solution:**
```bash
npm install --workspace=@9jalinks/web
```

---

### ❌ Error 6: "Error: Cannot find module 'dotenv'"

**Cause:** Missing dependencies in service

**Solution:**
```bash
# For auth service
npm install --workspace=@9jalinks/auth-service

# For user service  
npm install --workspace=@9jalinks/user-service

# For product service
npm install --workspace=@9jalinks/product-service

# For gateway
npm install --workspace=@9jalinks/api-gateway
```

---

## 🔍 How to Share Error Messages

To help me fix your specific error, please:

1. **Copy the full error message** from each terminal
2. **Include the service name** (Auth, User, Product, Gateway, or Web)
3. **Share the last 10-20 lines** of output

Example format:
```
Auth Service Error:
[nodemon] starting `ts-node src/index.ts`
Error: Cannot find module '@9jalinks/logger'
...
```

---

## 🚀 Quick Fix - Try This First

Run these commands in order:

```bash
# 1. Stop all running services (Ctrl+C in each terminal)

# 2. Kill any remaining Node processes
Get-Process node | Stop-Process -Force

# 3. Rebuild shared packages
npm run build --workspace=@9jalinks/logger
npm run build --workspace=@9jalinks/common

# 4. Reinstall dependencies (if needed)
npm install

# 5. Start services one by one and check each for errors
npm run dev --workspace=@9jalinks/auth-service
# Wait for "MongoDB connected" message, then open new terminal for next service
```

---

## 📋 Checklist Before Starting

- [ ] MongoDB Atlas cluster is running
- [ ] Internet connection is working
- [ ] Shared packages are built (`packages/logger/dist` and `packages/common/dist` exist)
- [ ] `.env` files have correct MongoDB URI
- [ ] No other Node processes running on ports 3000-3003
- [ ] All dependencies installed (`node_modules` folders exist)

---

## 💡 Alternative: Use Production Build

If dev mode keeps failing, try building and running in production mode:

```bash
# Build each service
npm run build --workspace=@9jalinks/auth-service
npm run build --workspace=@9jalinks/user-service
npm run build --workspace=@9jalinks/product-service

# Run built versions
cd services/auth && node dist/index.js
cd services/user && node dist/index.js
cd services/product && node dist/index.js
cd services/gateway && node dist/index.js
```

---

## 🆘 Need More Help?

Please share:
1. The exact error messages from your terminals
2. Which service(s) are failing
3. Any red error text you see

I'll provide a specific fix for your issue!
