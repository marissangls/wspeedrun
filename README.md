# 🏃 WSpeedrun.com — Backend System

A centralized platform for hosting and tracking speedrun entries across various popular video games. Players can submit run videos, view leaderboards, and interact through comments. All runs are reviewed before appearing publicly to ensure fairness.

Built with **NestJS** using a **microservice architecture**.

---

## 🧱 Architecture

| Service | Port | Description |
|---|---|---|
| **Auth Service** | 3000 | User registration, login, JWT authentication, and user profiles |
| **Game Service** | 3001 | Game and run category management (CRUD) |
| **Run Service** | 3002 | Speedrun submissions, leaderboards, comments, and admin review |

---

## 🛠️ Tech Stack

- **Framework:** NestJS
- **Database:** MySQL (via XAMPP)
- **ORM:** Prisma Client
- **Authentication:** JWT + Passport
- **API Docs:** Swagger
- **Runtime:** Node.js

---

## ⚙️ Prerequisites

- Node.js (v22+)
- XAMPP (with MySQL running)
- NestJS CLI (`npm install -g @nestjs/cli`)

---

## 🚀 Getting Started

### 1. Setup Database
1. Start **XAMPP** and run **MySQL**
2. Open **phpMyAdmin** → create database `wspeedrun`
3. Import `wspeedrun.sql`

### 2. Install Dependencies
Run in each service folder:
```bash
cd auth-service && npm install
cd ../game-service && npm install
cd ../run-service && npm install
```

### 3. Environment Variables
Each service has a `.env` file. Make sure they contain:
```env
DATABASE_URL="mysql://root:@localhost:3306/wspeedrun"
JWT_SECRET="wspeedrun-secret-key"
```

### 4. Generate Prisma Client
Run in each service folder:
```bash
npx prisma generate
```

### 5. Run All Services
Open 3 terminals and run each service:
```bash
# Terminal 1
cd auth-service && npm run start:dev

# Terminal 2
cd game-service && npm run start:dev

# Terminal 3
cd run-service && npm run start:dev
```

---

## 📖 API Documentation

Once running, access Swagger UI:

| Service | Swagger URL |
|---|---|
| Auth Service | http://localhost:3000/api |
| Game Service | http://localhost:3001/api |
| Run Service | http://localhost:3002/api |

---

## 👥 User Roles

| Role | Access |
|---|---|
| **Guest** | View games, leaderboards, user profiles, register & login |
| **User** | All guest features + submit runs, view run history, create/delete comments |
| **Admin** | Full access — manage games, categories, accept/reject runs |
