# 🚀 DevBoard – Feedback Management Web App

A clean, real-world **Three-Tier DevOps Project** featuring a modern frontend, a Flask API, and MongoDB, all dockerized for easy deployment.

## 🏗️ Architecture

- **Frontend (Presentation Layer)**: HTML5, CSS3 (Glassmorphism & Animations), JavaScript. Served by Nginx.
- **Backend (Application Layer)**: Flask REST API (Python) handling feedback logic and validation.
- **Database (Data Layer)**: MongoDB for persistent document storage.
- **Orchestration**: Docker Compose for multi-container deployment.

## 📂 Project Structure

```text
three-tier-devops-project/
│
├── frontend/             # HTML, CSS, JS files
├── backend/              # Flask API source & Dockerfile
├── database/             # MongoDB initialization scripts
├── docker-compose.yml    # Docker orchestration setup
└── README.md             # Project documentation
```

## 🚀 Quick Start

### 1. Prerequisites
Ensure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed.

### 2. Run the App
Navigate to the project root and run:
```bash
docker-compose up --build
```

### 3. Access the Tiers
- **Frontend UI**: [http://localhost:8080](http://localhost:8080)
- **Backend API**: [http://localhost:5000/feedback](http://localhost:5000/feedback)
- **MongoDB**: `localhost:27017`

## ✨ Features
- **Modern UI**: Animated glassmorphism interface with responsive design.
- **Full-Stack Connectivity**: Seamless flow from form submission to database persistence.
- **Dockerized**: One-command deployment with isolated networks.
- **Error Handling**: Basic validation and error responses included in the API.

---
Built with ❤️ by Antigravity
