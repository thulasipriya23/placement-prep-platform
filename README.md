# 🚀 PlacementPrep – Full-Stack AI Placement Readiness Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 6.0" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js Express" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <br/>
  <img src="https://img.shields.io/badge/Nodemailer-Gmail_SMTP-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Nodemailer" />
  <img src="https://img.shields.io/badge/Groq_AI-Llama_3.3-F05A28?style=for-the-badge&logo=groq&logoColor=white" alt="Groq AI" />
  <img src="https://img.shields.io/badge/Vercel-Frontend_Deployment-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <br/>
  <img src="https://img.shields.io/badge/Render-Backend_Deployment-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="MIT License" />
</p>

<p align="center">
  <b>An AI-powered campus placement preparation platform for engineering candidates.</b><br/>
  Frontend deployed on Vercel, backend deployed on Render Web Services.
</p>

<p align="center">
  <a href="https://placement-prep-platform-beige.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Visit_PlacementPrep-00C7B7?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  &nbsp;&nbsp;
  <a href="https://placement-prep-platform-1dlz.onrender.com" target="_blank">
    <img src="https://img.shields.io/badge/⚡_Backend_API-Render_Live-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Backend API" />
  </a>
</p>

---

PlacementPrep is a full-stack web application designed to help students prepare for campus placements through a single integrated platform.

It combines DSA practice, mock assessments, company-specific preparation, resume analysis, AI-powered interview practice, and placement readiness tracking.

## Features

- **User Authentication**
  - Secure registration and login
  - JWT-based authentication
  - Protected routes

- **DSA Practice**
  - Track DSA preparation
  - Organize and monitor problem-solving progress

- **Mock Tests**
  - Take placement-oriented assessments
  - Track test performance

- **Company DNA**
  - Company-specific placement preparation
  - Understand important preparation areas for different companies

- **AI Resume Analyzer**
  - Analyze resumes
  - Receive AI-generated feedback and improvement suggestions

- **AI Interview Simulator**
  - Practice interview questions
  - Receive AI-powered responses and feedback

- **Placement Readiness Dashboard**
  - Centralized overview of preparation progress
  - Placement Readiness Index (PRI)
  - Tracks DSA, mock tests, consistency, and interview preparation

## Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- CSS
- Axios
- React Router

### Backend

- Node.js
- Express.js
- REST APIs
- JWT Authentication

### Database

- MongoDB
- Mongoose

### AI Integration

- Groq API

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Project Architecture

```text
User
 │
 ▼
React + Vite Frontend
 │
 │ REST API Requests
 ▼
Node.js + Express Backend
 │
 ├── Authentication
 ├── DSA APIs
 ├── Mock Test APIs
 ├── Dashboard APIs
 ├── Resume Analyzer
 ├── Interview Simulator
 │
 ▼
MongoDB Atlas
```

## Project Structure

```text
placement-prep-platform/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Installation

Clone the repository:

```bash
git clone https://github.com/thulasipriya23/placement-prep-platform.git
cd placement-prep-platform
```

Install backend dependencies:

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

Start the backend:

```bash
node server.js
```

Install and start the frontend:

```bash
cd ../frontend
npm install
npm run dev
```

## Security

Sensitive credentials such as database connection strings, JWT secrets, and API keys are stored using environment variables and are not committed to the repository.

## 🌐 Live Demo

- 🚀 **Live Platform**: [https://placement-prep-platform-beige.vercel.app](https://placement-prep-platform-beige.vercel.app)
- ⚡ **Backend API**: [https://placement-prep-platform-1dlz.onrender.com](https://placement-prep-platform-1dlz.onrender.com)

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_PlacementPrep-00C7B7?style=for-the-badge&logo=vercel&logoColor=white)](https://placement-prep-platform-beige.vercel.app)

## Future Improvements

- Forgot password and email verification
- Advanced placement analytics
- More company-specific preparation data
- Improved AI interview evaluation
- Personalized preparation recommendations

## Author

- **Name**: Bhukya Thulasi Priya
- **Role**: Full-Stack Developer | B.Tech in Computer Science and Engineering
- **Email**: [thulasipriyarathod@gmail.com](mailto:thulasipriyarathod@gmail.com)
- **GitHub**: [github.com/thulasipriya23](https://github.com/thulasipriya23)
- **Project Repository**: [github.com/thulasipriya23/placement-prep-platform](https://github.com/thulasipriya23/placement-prep-platform)



