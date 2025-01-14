# Farmlytics

## Table of Contents

- [Overview](#overview)
- [Features](#features)
  - [User Authentication](#1-user-authentication)
  - [Field Management](#2-field-management)
  - [AI Integration](#3-ai-integration)
  - [Data Visualization](#4-data-visualization)
  - [Payment Gateway](#5-payment-gateway)
  - [Responsive Design](#6-responsive-design)
- [Technical Specifications](#technical-specifications)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Deployment](#deployment)
- [Project Structure](#project-structure)
  - [Backend](#backend-1)
  - [Frontend](#frontend-1)
- [How to Run the Project](#how-to-run-the-project)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
- [Future Enhancements](#future-enhancements)
- [Live Deployment](#live-deployment)

## Overview

Farmlytics is a web-based platform that enables farmers to efficiently monitor, manage, and analyze their field data. By integrating Google Gemini AI, the system provides actionable insights to support decision-making. The platform is designed with a user-friendly interface and advanced features like AI-driven analysis, data visualization, and subscription-based premium services.

## Features

### 1. User Authentication

- **Secure Login and Signup**:
  - Implements token-based authentication using JWT (JSON Web Tokens).
  - Protects sensitive routes using middleware for authentication and role validation.
- **Role-Based Access Control**:
  - Provides differentiated access for roles such as Admin and Farmer.
  - Allows Admins to manage all users and farmers to manage their own data.

### 2. Field Management

- **Dashboard for Field Operations**:
  - Enables farmers to add, update, and delete field data.
  - Provides input fields such as field name, location (latitude/longitude), crop type, and area size.
- **Field Overview**:
  - Displays an overview of all fields managed by the user.
  - Includes 7 different chart types to represent various data related to the field, such as soil health trends, investment to profit, harvesting period etc ...

### 3. AI Integration

- **Google Gemini AI**:
  - Leverages Google Gemini AI for soil health and crop health analysis.
  - Outputs actionable insights such as crop yield predictions and soil condition.
- **Insight Display**:
  - Presents AI-generated insights on the farmer’s dashboard.

### 4. Data Visualization

- **Interactive Charts**:
  - Visualizes field data including crop yield trends and health statistics.
  - Used recharts libray for data visualization.

### 5. Payment Gateway

- **Subscription Management**:
  - Integrated Stripe payement gateway.
- **Transaction History**:
  - Maintains a record of all payments and subscriptions in the mongo database for user reference.
- **Test Payment Gateway**:
  - Use the test card number 4242 4242 4242 4242 with expiry 11/25 and CVC 123 for testing payments

### 6. Responsive Design

- **Mobile-Friendly UI**:
  - Ensures optimal user experience across devices.
  - Utilized Tailwind CSS for styling

## Technical Specifications

### Backend

- **Node.js and Express.js with typescript**:
  - Develops the RESTful API for the system with type safety.
- **MongoDB with Mongoose**:
  - Stores data in a NoSQL database.
  - Uses Mongoose for schema definitions and data validation.
- **Authentication Middleware**:
  - Secures API endpoints and validates user roles.
- **Stripe for payment gateway**:
  - Payment checkout dont with stripe with sessions.

### Frontend

- **React.js with typescript**:
  - Builds the dynamic and interactive user interface.
- **State Management**:
  - Just used context API since its not that complex Application.
- **Recharts**:
  - Recgarts used for data visualization both in admin and farmer dashboard

### Deployment

- **Frontend Deployment**:
  - Deployed the React app on Vercel for fast and scalable hosting.
- **Backend Deployment**:
  - Hosted the Node.js server on Render Platform.

## Project Structure

### Backend

```
backend/
|-- controllers/
|   |--userController.ts
|   |--fieldController.ts
|   |--aiInsightController.ts
|   |--paymentController.ts
|-- middleware/
|   |--verifyToken.ts
|   |--isAdmin.ts
|   |--verifyNewField.ts
|   |--errorHandler.ts
|   |--verifyAdminRegister.ts
|-- models/
|   |--fieldModel.ts
|   |--userModel.ts
|   |--transactionModel.ts
|-- routes/
|   |--userRoute.ts
|   |--fieldRoute.ts
|   |--aiInsightRoute.ts
|   |--paymentRoute.ts
|-- lib/
|   |--utils.ts
|-- server.ts
|-- package.json
```

### Frontend

### frontend is pretty big cant write all that here

```
frontend/
|-- src/
|   |-- components/
|   |-- pages/
|   |-- context/
|   |-- App.tsx
|   |-- tailwind
|-- package.json
```

## How to Run the Project

### Prerequisites

- Node.js
- MongoDB
- npm

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/vasa-r/sensegrass-assignment
   ```

2. Install dependencies for backend and frontend:

   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```

3. Set up environment variables:

   - Backend `.env` file:
     ```env
        JWT_SECRET = your jwt secret
        REFERRAL_CODE = 'farmlytics' - for admin user signup
        PORT = 3000
        IS_PRODUCTION = false
        MONGO_URI = your mongo uri
        GOOGLEAI_API = google api key for gemini AI
        STRIPE_SECRET = stripe api key
        BASE_URL = http://localhost:5173
     ```
   - Frontend `.env` file:
     ```env
        VITE_API_BASE_URL = http://localhost:3000
        ITE_STRIPE_PK = stripe public key
     ```

4. Run the backend server:

   ```bash
   cd backend
   npm start
   ```

5. Run the frontend server:

   ```bash
   cd frontend
   npm run dev
   ```

6. Access the application:

   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3000`

7. Test Payment Gateway:

- Use the test card number 4242 4242 4242 4242 with expiry 11/25 and CVC 123 for testing payments

## Live Deployment

- **Frontend**: [Vercel URL](https://sensegrass-assignment.vercel.app/)
- **Backend**: [Render](https://sensegrass-assignment.onrender.com)
