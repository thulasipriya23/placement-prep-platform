# 🚀 PlacementPrep – Full-Stack AI Placement Readiness Platform

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-Gmail_SMTP-EA4335?style=for-the-badge&logo=gmail&logoColor=white)
![Groq AI](https://img.shields.io/badge/Groq_AI-LLaMA_3.3-F05032?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Vercel-Frontend_Deployment-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-Backend_Deployment-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

### An AI-powered campus placement preparation platform for engineering candidates. Frontend deployed on Vercel, backend deployed on Render Web Services.

<p align="center">
  <a href="https://placement-prep-platform-beige.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Visit_PlacementPrep-00C7B7?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  &nbsp;&nbsp;
  <a href="https://placement-prep-platform-1dlz.onrender.com/api/message" target="_blank">
    <img src="https://img.shields.io/badge/⚡_Backend_API-Render_Live-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Backend API" />
  </a>
</p>

</div>

---

## 📖 Overview

**PlacementPrep** is a full-stack, enterprise-grade career preparation platform designed to help computer science and engineering students succeed in campus recruitment, technical interviews, and off-campus placement drives.

Rather than fragmenting preparation across multiple disconnected websites, PlacementPrep integrates DSA tracking, AI-powered custom mock tests, voice-enabled interview simulation, ATS resume analysis, and company-specific preparation roadmaps into a single high-performance dark-mode dashboard.

---

## ✨ Key Features & Capabilities

### 🔒 1. Advanced Authentication & Account Security
* **JWT & Secure Sessions**: Secure registration and token-based authentication with protected frontend and backend routes.
* **Nodemailer Gmail Password Reset**: One-click password reset and secure recovery powered by Gmail SMTP transport.
* **Security & Session Persistence**: Enforces password standards and stores tokens safely for persistent logins.

### 💻 2. DSA Tracker & Curated Sheet Filters
* **Direct LeetCode Routing**: Click any coding challenge to open the exact problem on LeetCode in a new tab.
* **Instant 0ms Status Toggle**: Optimistic state updates for instant checkmark progress toggling (`✓`).
* **Curated Interview Sheets**: Filter problems across **Blind 75** (75 problems), **NeetCode 150** (150 problems), and **Striver SDE Sheet** (180 problems).
* **Topic Badges & Starred Bookmarking**: Bookmark key problems for revision with time and space complexity tags (`O(N)`, `O(1)`).

### 📝 3. Custom AI Mock Tests
* **Any Custom Topic**: Type any technology, programming language, or engineering domain (*Python, React, Machine Learning, Cloud Computing, Cybersecurity, System Design*) to generate 10 fresh, high-quality MCQs.
* **Preset Core Topics**: Includes core CS subjects (JavaScript, Data Structures, Algorithms, Operating Systems, DBMS, Computer Networks, Object-Oriented Programming).
* **Adaptive Difficulty**: Select Easy, Medium, or Hard assessments with instant scoring and detailed explanations.

### 🎙️ 4. Voice-Enabled AI Mock Interview Simulator
* **Speech-to-Text Microphone Input**: Dictate answers verbally using the interactive microphone input (`🎤`).
* **Text-to-Speech AI Narrator**: Speaks interview questions aloud automatically with an audio toggle.
* **Domain Awareness**: Tailors questions to **Product-based** (DSA/System Design), **Service-based** (OOP/DBMS/Aptitude), or **Core Engineering** roles.

### 📄 5. ATS Resume Analyzer & Scorecard
* **ATS Compatibility Score**: Analyzes resume content against industry criteria and job roles.
* **Keyword Gap Analysis**: Identifies missing technical skills, frameworks, and metrics.
* **Actionable Improvement Recommendations**: Specific suggestions to boost resume impact and pass HR screening filters.

### 🏢 6. Company DNA & Preparation Roadmaps
* **Company-Specific Insights**: Curated preparation roadmaps for top tech companies (Google, Amazon, Microsoft, TCS, Infosys, Wipro, Accenture, etc.).
* **Pattern Breakdown**: Details rounds, typical DSA difficulty, coding question patterns, and behavioral topics.

### 📊 7. Placement Readiness Index (PRI) Dashboard
* Centralized score tracking DSA progress, mock test scores, interview simulations, and consistency metrics.
* Real-time metrics helping students identify preparation blind spots before interview day.

---

## 🛠️ Technology Stack & Architecture

### Frontend
* **Library / Framework**: React 19, Vite 6.0
* **Styling**: Tailwind CSS & Modern Glassmorphic Dark UI
* **Icons & State**: React Icons, React Router v7, Context API
* **HTTP Client**: Axios (with auto token interceptors)
* **Hosting**: Vercel

### Backend
* **Runtime / Framework**: Node.js, Express.js
* **Database**: MongoDB Atlas via Mongoose ODM
* **AI Engine**: Groq SDK (Llama 3.3 70B Versatile model)
* **Email Service**: Nodemailer (Gmail SMTP)
* **Document Parsing**: pdf-parse, Mammoth (DOCX)
* **Hosting**: Render Web Services

```text
User Browser (React 19 + Vite)
       │
       ▼ (REST API Requests with Bearer Token)
Node.js + Express Backend (Render)
       │
       ├── Authentication & JWT Middleware
       ├── Groq SDK AI Generation (Llama 3.3)
       ├── DSA & Mock Assessment Engine
       ├── Resume & Interview Handlers
       │
       ▼
MongoDB Atlas (Cloud Database)
```

---

## 🚀 Installation & Local Setup

### Prerequisites
* Node.js (v18 or higher)
* MongoDB database (Atlas or local)
* Groq API Key

### 1. Clone the Repository
```bash
git clone https://github.com/thulasipriya23/placement-prep-platform.git
cd placement-prep-platform
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GROQ_API_KEY=your_groq_api_key
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser!

---

## 🌐 Live Demo

- 🚀 **Live Platform**: [https://placement-prep-platform-beige.vercel.app](https://placement-prep-platform-beige.vercel.app)
- ⚡ **Backend API**: [https://placement-prep-platform-1dlz.onrender.com/api/message](https://placement-prep-platform-1dlz.onrender.com/api/message)

---

## 👩‍💻 Author & Connect

**Bhukya Thulasi Priya**  
*B.Tech in Computer Science and Engineering*  
- **GitHub**: [@thulasipriya23](https://github.com/thulasipriya23)  
- **Project Repository**: [placement-prep-platform](https://github.com/thulasipriya23/placement-prep-platform)  
- **Email**: [thulasipriyarathod@gmail.com](mailto:thulasipriyarathod@gmail.com)
