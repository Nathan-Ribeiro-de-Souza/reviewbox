# ReviewBox

A full-stack movie and series review platform where users can create accounts, log in, save favorites, share reviews, and interact with the community.

## Live Demo

[Open ReviewBox](https://reviewbox-front-end-mu.vercel.app/)

## Features

- User registration and login
- JWT-based authentication
- Protected routes
- Create, edit, and delete movie reviews
- Community reviews
- Favorites system
- Personal user profile
- Public user profiles
- Edit personal profile name
- Movie and series catalog
- Search and filtering
- Loading, error, and empty states
- Responsive interface
- Persistent data with PostgreSQL

## Technologies

### Frontend

- React
- TypeScript
- Vite
- React Router
- Context API
- Fetch API
- CSS

### Backend

- Node.js
- Express
- PostgreSQL
- bcrypt
- JWT
- REST API

### Database & Deployment

- Supabase PostgreSQL
- Vercel
- Git/GitHub

## Architecture

The project is divided into two applications:

    reviewbox/
    ├── front-end/
    └── back-end/

### Frontend Flow

    React
      ↓
    Context / State
      ↓
    API Service
      ↓
    Backend REST API

### Backend Flow

    Routes
      ↓
    Controllers
      ↓
    Services
      ↓
    Repositories
      ↓
    PostgreSQL

## Authentication

The application uses JWT authentication.

    Register
       ↓
    Password hashed with bcrypt
       ↓
    User stored in PostgreSQL

    Login
       ↓
    Credentials validated
       ↓
    JWT generated
       ↓
    Frontend stores authentication state
       ↓
    Protected requests use Bearer token

## Database

The application uses PostgreSQL with relationships between users, reviews, and favorites.

Main entities:

- Users
- Reviews
- Favorites

## Environment Variables

### Frontend

    VITE_API_URL=
    VITE_TMDB_API_KEY=

### Backend

    DATABASE_URL=
    JWT_SECRET=
    TMDB_API_KEY=

## Running Locally

### Frontend

    cd front-end
    npm install
    npm run dev

### Backend

    cd back-end
    npm install
    node src/server.js

## Project Structure

    front-end/
    └── src/
        ├── components/
        ├── contexts/
        ├── hooks/
        ├── pages/
        ├── services/
        ├── types/
        └── utils/

    back-end/
    └── src/
        ├── controllers/
        ├── errors/
        ├── middlewares/
        ├── repositories/
        ├── routes/
        ├── services/
        ├── app.js
        ├── database.js
        └── server.js

## What I Learned

This project was developed as a full-stack learning project, focusing on:

- React and TypeScript
- State management with Context API
- React Router
- REST API integration
- Authentication and authorization
- JWT and middleware
- Backend architecture
- PostgreSQL and SQL
- CRUD operations
- Error handling
- Git and GitHub
- Debugging
- Frontend and backend integration
- Full-stack deployment

## Future Improvements

- Social login

## Author

**Nathan Ribeiro de Souza**