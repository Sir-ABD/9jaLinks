# MongoDB Atlas Setup Guide

## Your MongoDB Connection String

After setting up MongoDB Atlas, replace the MONGO_URI in all service .env files with your connection string:

**Format:**
```
mongodb+srv://9jalinks_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/9jalinks?retryWrites=true&w=majority
```

**Example:**
```
mongodb+srv://9jalinks_user:MySecurePass123@cluster0.abc123.mongodb.net/9jalinks?retryWrites=true&w=majority
```

## Files to Update

Update the MONGO_URI in these files:
1. services/auth/.env
2. services/user/.env
3. services/product/.env

## Quick Setup Steps

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create FREE account (M0 tier)
3. Create database user (username: 9jalinks_user)
4. Allow network access (0.0.0.0/0 for development)
5. Get connection string from "Connect" button
6. Replace <password> with your actual password
7. Add /9jalinks after .net/ to specify database name
8. Paste into MONGO_URI in .env files

## Test Connection

After updating, start any service:
```bash
npm run dev --workspace=@9jalinks/auth-service
```

You should see:
```
[INFO] MongoDB connected successfully
```

## Troubleshooting

**Error: "Authentication failed"**
- Check your password is correct in the connection string
- Make sure you replaced <password> with actual password

**Error: "Connection timeout"**
- Check Network Access allows your IP (0.0.0.0/0)
- Wait a few minutes for cluster to finish deploying

**Error: "Database not found"**
- Make sure you added /9jalinks at the end of connection string
- Format: ...mongodb.net/9jalinks?retryWrites=true...
