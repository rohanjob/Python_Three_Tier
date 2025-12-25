# 📔 Step-by-Step Deployment Guide

Follow this guide to set up and deploy the **DevBoard Three-Tier Web App** using Docker.

---

## 🛠️ Step 1: Environment Preparation
Before starting, ensure you have the following installed on your machine:
1. **Docker Desktop**: [Download here](https://www.docker.com/products/docker-desktop)
2. **Git**: To manage your code.
3. **Internal Network**: Ensure ports `8080` (Frontend), `5000` (Backend), and `27017` (Database) are not being used by other applications.

---

## 🏗️ Step 2: Understand the Architecture
This is a **Three-Tier** application:
1.  **Database (Tier 3)**: MongoDB container storing feedback data.
2.  **Backend (Tier 2)**: Flask API container that talks to MongoDB.
3.  **Frontend (Tier 1)**: Nginx container serving static HTML/CSS/JS that talks to the Backend API.

---

## 🚀 Step 3: Deployment (The One-Command Way)
Navigate to the root directory of the project (`three-tier-devops-project`) in your terminal and run:

```bash
docker-compose up --build
```

### What happens next?
- Docker reads the `docker-compose.yml` file.
- It builds the **Backend** image using the `backend/Dockerfile`.
- It pulls the **Nginx** and **MongoDB** images from Docker Hub.
- It starts all three containers and links them together in a virtual network.

---

## 🔍 Step 4: Verification & Testing
Once the command finishes and you see logs from all services, verify everything is working:

### 1. Check the Database
Look for a log entry like: `devboard_db | waiting for connections`.

### 2. Check the API
Open your browser and go to [http://localhost:5000/feedback](http://localhost:5000/feedback).
- You should see an empty JSON array `[]` (or existing feedback if you've already added some).

### 3. Use the Frontend
Open [http://localhost:8080](http://localhost:8080).
- Enter your **Name** and a **Message**.
- Click **Submit**.
- The page should refresh and show your feedback at the bottom.

---

## 🔧 Step 5: Troubleshooting
- **Frontend can't connect to API?**
  Ensure the `API_URL` in `frontend/script.js` is set to `http://localhost:5000/feedback`.
- **Backend can't connect to MongoDB?**
  Ensure the `MONGO_URI` in `docker-compose.yml` is `mongodb://mongodb:27017/devboard`.
- **Port Conflict?**
  If you get an error like `bind: address already in use`, stop the service using that port before running docker-compose.

---

## 🧹 Step 6: Cleanup
To stop the application and remove the containers, press `Ctrl+C` in your terminal and run:

```bash
docker-compose down
```
*(Note: Your data will persist because we use Docker Volumes).*
