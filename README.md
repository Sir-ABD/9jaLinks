# 9jaLinks - Getting Started

## Prerequisites

- Node.js 18+ and npm
- MongoDB (local or cloud instance)

## Installation

1. **Install all dependencies:**
   ```bash
   npm install
   ```

2. **Build shared packages:**
   ```bash
   npm run build --workspace=@9jalinks/logger
   npm run build --workspace=@9jalinks/common
   ```

## Configuration

### Backend Services

Create `.env` files for each service based on the `.env.example` files:

**Auth Service** (`services/auth/.env`):
```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/9jalinks
JWT_SECRET=your-super-secret-jwt-key-change-in-production
LOG_LEVEL=info
```

**User Service** (`services/user/.env`):
```env
PORT=3002
MONGO_URI=mongodb://localhost:27017/9jalinks
LOG_LEVEL=info
```

**Product Service** (`services/product/.env`):
```env
PORT=3003
MONGO_URI=mongodb://localhost:27017/9jalinks
LOG_LEVEL=info
```

**Gateway Service** (`services/gateway/.env`):
```env
PORT=3000
AUTH_SERVICE_URL=http://localhost:3001
USER_SERVICE_URL=http://localhost:3002
PRODUCT_SERVICE_URL=http://localhost:3003
JWT_SECRET=your-super-secret-jwt-key-change-in-production
LOG_LEVEL=info
```

### Frontend

**Web App** (`apps/web/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Running the Application

### Start MongoDB

Make sure MongoDB is running on your system:
```bash
# If using local MongoDB
mongod
```

### Start Backend Services

Open separate terminals for each service:

**Terminal 1 - Auth Service:**
```bash
npm run dev --workspace=@9jalinks/auth-service
```

**Terminal 2 - User Service:**
```bash
npm run dev --workspace=@9jalinks/user-service
```

**Terminal 3 - Product Service:**
```bash
npm run dev --workspace=@9jalinks/product-service
```

**Terminal 4 - Gateway:**
```bash
npm run dev --workspace=@9jalinks/api-gateway
```

### Start Frontend

**Terminal 5 - Web App:**
```bash
npm run dev --workspace=@9jalinks/web
```

## Access the Application

- **Frontend:** http://localhost:3001 (Next.js dev server)
- **API Gateway:** http://localhost:3000
- **Auth Service:** http://localhost:3001
- **User Service:** http://localhost:3002
- **Product Service:** http://localhost:3003

## Testing the API

### Register a new user:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User",
    "role": "user"
  }'
```

### Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Create a product (requires authentication):
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Sample Product",
    "description": "A great product",
    "price": 9999,
    "vendorId": "vendor123",
    "stock": 100,
    "category": "Electronics"
  }'
```

## Project Structure

```
9jaLinks/
├── apps/
│   └── web/                 # Next.js frontend
├── packages/
│   ├── common/              # Shared types and utilities
│   ├── logger/              # Logging package
│   └── tsconfig/            # Shared TypeScript config
├── services/
│   ├── auth/                # Authentication service
│   ├── user/                # User management service
│   ├── product/             # Product catalog service
│   ├── gateway/             # API Gateway
│   ├── ai/                  # AI service (future)
│   └── personalization/     # Personalization service (future)
└── package.json             # Root package.json
```

## Features Implemented

✅ **Authentication Service**
- User registration with role selection (user/vendor)
- JWT-based authentication
- Password hashing with bcrypt

✅ **User Service**
- User profile CRUD operations
- Profile preferences management

✅ **Product Service**
- Product CRUD operations
- Inventory management
- Search and filtering
- Pagination

✅ **API Gateway**
- Request routing to microservices
- JWT authentication middleware
- CORS support

✅ **Frontend**
- Premium landing page with glassmorphism effects
- Responsive design with Tailwind CSS
- Login/Register pages with form validation
- Smooth animations and transitions

## Next Steps

1. **AI Service**: Implement product recommendations
2. **Personalization Service**: User behavior tracking
3. **Dashboard**: Create user and vendor dashboards
4. **Product Catalog**: Build product browsing interface
5. **Shopping Cart**: Implement cart functionality
6. **Payment Integration**: Add payment gateway
7. **Testing**: Add unit and integration tests
8. **Deployment**: Set up CI/CD pipeline

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the `MONGO_URI` in your `.env` files
- Verify MongoDB is accessible on the specified port

### Port Conflicts
- If ports are already in use, update the `PORT` values in `.env` files
- Make sure to update the Gateway's service URLs accordingly

### Module Not Found Errors
- Run `npm install` in the root directory
- Build the shared packages: `npm run build --workspace=@9jalinks/logger` and `npm run build --workspace=@9jalinks/common`

## Support

For issues or questions, please check the documentation or create an issue in the repository.
