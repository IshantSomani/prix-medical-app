# PRIX Medical Platform

A full-stack medical platform designed to streamline patient management for healthcare professionals, built with the MERN stack (MongoDB, Express, React, Node.js).

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [Future Enhancements](#future-enhancements)

## Features

### Core Functionality

- **Role-Based Access Control**
  - **Admin**: Full system control, user management.
  - **Doctor**: Patient record management.
  
- **Authentication System**
  - JWT-based secure login.
  - Password encryption.
  - Session persistence.

- **Patient Management**
  - CRUD operations for patient records.
  - Form validation.
  - Recent patients tracking.

- **Dashboard**
  - Quick stats overview.
  - Recent activity tracking.
  - Upcoming appointments (placeholder).

## Tech Stack

### Frontend

- **React** (v18+)
- **React Router** (v6+)
- **Redux** (State management)
- **Formik/Yup** (Form handling)
- **Axios** (API communication)
- **Tailwind CSS** (Styling)
- **Material-UI** (UI components)

### Backend

- **Node.js** (v16+)
- **Express.js** (REST API)
- **MongoDB** (Database)
- **Mongoose** (ODM)
- **JWT** (Authentication)
- **Bcrypt** (Password hashing)
- **CORS** (Cross-origin requests)

### Development Tools

- Postman (API testing)
- MongoDB Compass (Database GUI)
- VS Code (IDE)
- Git (Version control)

## Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (v5.0 or higher)
- **Git**

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/IshantSomani/prix-medical-platform.git
   cd prix-medical-platform
   ```

2. **Set up backend:**
   ```bash
   cd backend
   npm install
   ```

3. **Set up frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Create `.env` files:**

   - **Backend `.env`**:
     ```bash
     # server/.env
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/prix-medical
     JWT_SECRET=your_jwt_secret_key
     ```

   - **Frontend `.env`**:
     ```bash
     # client/.env
     REACT_APP_API_URL=http://localhost:5000/api
     ```

## Configuration

### Environment Variables

| Variable           | Description                | Example                     |
|--------------------|----------------------------|-----------------------------|
| **PORT**           | Server port                | `5000`                      |
| **MONGO_URI**      | MongoDB connection string  | `mongodb://localhost:27017/prix-medical` |
| **JWT_SECRET**     | JWT encryption key         | `complex_secret_key`        |
| **REACT_APP_API_URL** | Backend API base URL      | `http://localhost:5000/api` |

## Running the App

1. **Start MongoDB service** (ensure MongoDB is running locally).
   
2. **Start Backend**:
   ```bash
   cd backend
   npm start
   ```

3. **Start Frontend**:
   ```bash
   cd frontend
   npm start
   ```

The application will be available at:

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend**: [http://localhost:5000](http://localhost:5000)

## Project Structure

```
prix-medical-app/
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── assets/      # Images, fonts
│   │   ├── components/  # Reusable components
│   │   ├── context/     # Auth context
│   │   ├── pages/       # Route components
│   │   ├── App.js       # Main component
│   │   └── index.js     # Entry point
│   └── .env
│
├── backend/
│   ├── config/          # DB configuration
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API endpoints
│   ├── server.js        # Server entry
│   └── .env
```

## API Endpoints

### Authentication

| Method | Endpoint       | Description           |
|--------|----------------|-----------------------|
| POST   | /api/auth/login | User login            |

### Patients

| Method | Endpoint          | Description            |
|--------|-------------------|------------------------|
| GET    | /api/patients     | Get all patients       |
| POST   | /api/patients     | Create new patient     |
| GET    | /api/patients/:id | Get single patient     |
| PUT    | /api/patients/:id | Update patient         |
| DELETE | /api/patients/:id | Delete patient         |

## Screenshots

1. **Login Page**
   - Clean, medical-themed interface.
   - Form validation.
   - Responsive design.

2. **Dashboard**
   - Recent patients overview.
   - Quick action buttons.
   - Stats summary.

3. **Patient Form**
   - Required field validation.
   - Medical data entry.
   - Error handling.

## Contributing

We welcome contributions! Here's how you can contribute to this project:

1. **Fork the repository**.
2. **Create your feature branch**:
   ```bash
   git checkout -b feature/new-feature
   ```
3. **Commit changes**:
   ```bash
   git commit -m 'Add some feature'
   ```
4. **Push to branch**:
   ```bash
   git push origin feature/new-feature
   ```
5. **Open a Pull Request**.

## Future Enhancements

- Patient profile management.
- Appointment scheduling system.
- Medical report generation.
- Real-time notifications.
- Role-based dashboards.
- Audit logging system.