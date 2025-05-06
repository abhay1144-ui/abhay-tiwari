# Daily Mental Health Exercises App

A full-stack web application that provides daily mental health exercises to help users maintain their mental wellbeing. The app includes a frontend for practicing exercises and a backend API for user authentication and progress tracking.

## Features

- 5 different mental health exercises with interactive animations
- Timer functionality for guided practice
- User authentication (register/login)
- Progress tracking for completed exercises 
- Streak tracking to maintain daily practice
- Mobile-responsive design

## Project Structure

```
├── index.html              # Frontend main HTML
├── styles.css              # Frontend styles
├── script.js               # Frontend main JavaScript
├── js/
│   └── api.js              # API integration client
└── backend/                # Backend API
    ├── server.js           # Express server setup
    ├── models/             # MongoDB models
    ├── controllers/        # API controllers
    ├── routes/             # API routes
    ├── middleware/         # Auth middleware
    ├── data/               # Seed data
    └── utils/              # Utility scripts
```

## Technologies Used

### Frontend
- HTML5, CSS3, JavaScript
- Local Storage for offline progress tracking

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcrypt.js for password hashing

## Setup Instructions

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (local installation or MongoDB Atlas account)

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with:
   ```
   MONGODB_URI=mongodb://localhost:27017/mental-health-app
   JWT_SECRET=your_jwt_secret_key_change_in_production
   PORT=5000
   ```

4. Seed the database with initial exercises:
   ```
   npm run seed
   ```

5. Start the backend server:
   ```
   npm run dev
   ```
   The backend will run on http://localhost:5000

### Frontend Setup
1. The frontend doesn't require any build steps and can be served using any static file server.

2. You can use a simple development server like the Live Server extension in VS Code, or Python's built-in HTTP server:
   ```
   python -m http.server
   ```
   The frontend will typically run on http://localhost:8000

## Usage

1. Open the frontend URL in your browser
2. Register a new account or login with existing credentials
3. Browse through the different mental health exercises
4. Use the timer to practice each exercise
5. Your progress will be tracked automatically

## Offline Support

The app can function without a backend connection:
- Exercise data is cached
- Progress is saved to local storage
- However, streak tracking and synchronization between devices requires a backend connection

## License

This project is open source and available under the [MIT License](LICENSE). 