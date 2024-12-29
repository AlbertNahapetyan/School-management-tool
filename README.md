# Project Setup Instructions

This document provides the necessary steps to set up and run the project locally. Follow the instructions below to configure both the client and server.

## Prerequisites
Ensure the following tools are installed on your machine:

- **Node.js** (v22 or higher)
- **npm** (Node Package Manager)
- **MySQL Database**

---

## Setting Up the Server

1. **Install Dependencies**
   Navigate to the server directory and install the required dependencies:
   ```bash
   cd server
   npm install
   ```

2. **Set Up Environment Variables**
   Create a `.env` file in the `server` directory with the following content:
   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/smt-db?schema=public"
   JWT_SECRET="jwt-secret"
   ADMIN_SECRET="admin-secret"
   PORT="3000"
   ```
   Replace `user`, `password`, and other placeholder values with your actual database credentials and secrets.

3. **Prisma Commands**
   Use the following commands to manage the database and Prisma client:

   - **Pull Database Schema:**
     ```bash
     npm run prisma:pull
     ```

   - **Push Prisma Schema to Database:**
     ```bash
     npm run prisma:push
     ```

   - **Generate Prisma Client:**
     ```bash
     npm run prisma:generate
     ```

4. **Start the Server**
   Run the following command to start the backend server:
   ```bash
   npm run dev
   ```

---

## Setting Up the Client

1. **Install Dependencies**
   Navigate to the client directory and install the required dependencies:
   ```bash
   cd client
   npm install
   ```

2. **Set Up Environment Variables**
   Create a `.env` file in the `client` directory with the following content:
   ```env
   REACT_APP_GRAPHQL_URL="http://localhost:3000/graphql"
   ```

3. **Admin User Registration**
   During the registration process on the frontend, use the `ADMIN_SECRET` environment variable to create an admin user for the dashboard. Ensure this value matches the one set in the server's `.env` file.

4. **Start the Client**
   Run the following command to start the frontend application:
   ```bash
   npm start
   ```

---

## Summary of Commands

### Server
| Command               | Description                                   |
|-----------------------|-----------------------------------------------|
| `npm install`         | Install dependencies                         |
| `npm run prisma:pull` | Pull the database schema into Prisma         |
| `npm run prisma:push` | Push Prisma schema to the database           |
| `npm run prisma:generate` | Generate Prisma Client                   |
| `npm run dev`         | Start the server                             |

### Client
| Command       | Description                                   |
|---------------|-----------------------------------------------|
| `npm install` | Install dependencies                         |
| `npm start`   | Start the React development server            |

---

## Additional Notes
- Ensure the database is running and accessible before running the server.

---