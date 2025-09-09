# Parcial Backend

NestJS backend application with JWT authentication and role-based access control.

## Features

- **JWT Authentication** - Secure login/signup system
- **Role-Based Access Control** - ANDREI, DAEMON, NETWORK_ADMIN roles
- **PostgreSQL Database** - With Prisma ORM
- **Docker Support** - Containerized deployment
- **RESTful API** - Complete CRUD operations

## Roles & Permissions

### 🔴 ANDREI (Super Administrator)
- Full platform control
- View/edit all data
- Assign punishments/rewards to daemons
- Access all endpoints

### 🤖 DAEMON
- Submit resistance reports
- Track personal statistics
- View own punishments/rewards
- Access daemon-specific endpoints

### 🌐 NETWORK_ADMIN
- Access resistance page (tips/memes)
- Submit anonymous reports
- Basic user functionality

## Quick Start

### 🚀 Local Development

1. **Install dependencies**
```bash
npm install
```

2. **Setup environment**
```bash
cp .env.example .env
# Edit .env with your database URL and JWT secret
```

3. **Setup database**
```bash
npx prisma migrate dev
npx prisma generate
```

4. **Start development server**
```bash
npm run start:dev
```

API available at: http://localhost:3000

### 🐳 Docker Deployment

1. **Start with Docker Compose**
```bash
npm run docker:run
```

2. **Run database migrations**
```bash
docker-compose exec app npx prisma migrate deploy
```

3. **Access application**
- API: http://localhost:3000
- Database: localhost:5432

### 🔧 Docker Commands
```bash
npm run docker:build    # Build image
npm run docker:run      # Start containers
npm run docker:stop     # Stop containers
```

### ☸️ Kubernetes Deployment

**Prerequisites:**
- Docker Desktop with Kubernetes enabled
- kubectl configured

1. **Deploy to Kubernetes**
```bash
npm run k8s:deploy
```

2. **Check deployment status**
```bash
kubectl get pods -n parcial-backend
kubectl get services -n parcial-backend
```

3. **View logs**
```bash
kubectl logs -f deployment/parcial-backend-app -n parcial-backend
```

4. **Cleanup resources**
```bash
npm run k8s:cleanup
```

### 🎯 Kubernetes Features
- **High Availability**: 2 app replicas
- **Persistent Storage**: PostgreSQL data persistence
- **Health Checks**: Liveness and readiness probes
- **Load Balancing**: External LoadBalancer service
- **Configuration Management**: ConfigMaps and Secrets
- **Database Migrations**: Automated via Kubernetes Jobs

## API Endpoints

### Authentication
```
POST /auth/signup    # Register user
POST /auth/login     # Login user
```

### Admin (ANDREI only)
```
GET  /admin/users        # All users
GET  /admin/reports      # All reports
GET  /admin/daemons      # All daemons
POST /admin/punishments  # Create punishment
POST /admin/rewards      # Create reward
GET  /admin/statistics   # Platform stats
```

### Reports
```
POST /reports/daemon        # Submit daemon report (DAEMON+)
GET  /reports/daemon/my     # Own daemon reports (DAEMON+)
POST /reports/resistance    # Submit resistance report (ALL)
GET  /reports/resistance    # View resistance reports (ALL)
```

### Users
```
GET /users/profile      # Own profile (ALL)
GET /users/statistics   # Own statistics (DAEMON+)
GET /users/punishments  # Own punishments (DAEMON+)
GET /users/rewards      # Own rewards (DAEMON+)
```

### Resistance
```
GET /resistance/tips    # Survival tips (ALL)
GET /resistance/memes   # Memes (ALL)
GET /resistance/status  # Network status (ALL)
```

## Usage Examples

### Signup as DAEMON
```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "daemon@example.com",
    "password": "password123",
    "name": "Daemon Unit 001",
    "role": "DAEMON"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "daemon@example.com",
    "password": "password123"
  }'
```

### Access Protected Endpoint
```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Environment Variables

```env
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key
```

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + Passport
- **Validation**: class-validator
- **Containerization**: Docker + Docker Compose

## Development

```bash
npm run start:dev    # Development mode
npm run build        # Build for production
npm run start:prod   # Production mode
npm run test         # Run tests
npm run lint         # Lint code
```

## Database

```bash
npx prisma studio           # Database GUI
npx prisma migrate dev      # Create migration
npx prisma migrate deploy   # Apply migrations
npx prisma generate         # Generate client
```