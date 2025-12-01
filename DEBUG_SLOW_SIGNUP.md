# 🐢 Debugging Slow Signup

If signup is taking a long time and then failing, it usually means the **Database Connection is hanging**.

## 1. Check Auth Service Terminal
Look at the terminal where you ran `npm run dev --workspace=@9jalinks/auth-service`.

**Do you see this?**
```
[INFO] MongoDB connected successfully
```
✅ **If YES:** The DB is connected. The issue might be the API Gateway.
❌ **If NO:** The DB is trying to connect but failing/hanging.

## 2. If DB is Hanging (No "Connected" message)
This is 99% likely an **IP Whitelist Issue** in MongoDB Atlas.

1. Go to [MongoDB Atlas](https://cloud.mongodb.com).
2. **Network Access** -> **Add IP Address**.
3. Select **"Allow Access From Anywhere"** (0.0.0.0/0).
   * *Why?* Your dynamic IP might have changed, or the auto-detect was wrong.
4. **Confirm** and wait for it to become "Active".
5. **Restart Auth Service** (Ctrl+C, then run it again).

## 3. If DB IS Connected
If the DB is connected but signup still fails:

1. **Check API Gateway Terminal:**
   - Does it show `Proxying POST /register to Auth Service`?
   - Does it show any errors?

2. **Check Auth Service Terminal:**
   - Does it show `User registered: ...`?
   - Or does it show an error?

## 🚀 Quick Restart
Sometimes a fresh start fixes everything:

1. **Stop ALL terminals** (Ctrl+C in all 5).
2. **Start them in order:**
   - Auth Service
   - User Service
   - Product Service
   - API Gateway
   - Frontend
3. **Wait** for "MongoDB connected" in the service terminals BEFORE trying to sign up.
