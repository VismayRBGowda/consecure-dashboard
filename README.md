
# Threat Intelligence Dashboard

## Overview
A full-stack Threat Intelligence Dashboard to:
- Visualize threat data by category, severity, and location using **Chart.js**.
- Analyze new threat descriptions using **ML model** (TF-IDF + Logistic Regression).
- Filter and explore individual threat reports.

## Tech Stack

| Layer        | Technology Used                   | Justification                                      |
|--------------|-----------------------------------|---------------------------------------------------|
| **Frontend** | React, TailwindCSS, Chart.js      | Reusable components, fast development, interactive charts     |
| **Backend**  | Node.js (Express), Python (Flask) | Node.js for API logic, Flask for ML prediction     |
| **Database** | MongoDB (Mongoose)                | Flexible schema                |

## Setup & Installation

### Prerequisites
- Node.js
- Python
- MongoDB

---

## Installation Guide

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/threat-dashboard.git
cd threat-dashboard
```

### 2. Frontend Setup (React)
```bash
cd frontend
npm install
npm run dev
```

### 3. Database Setup (MongoDB)
#### In backend/.env file, define MongoDB URI
```bash
MONGO_URI=mongodb://localhost:27017/consecureDB

cd backend/scripts
node ingest.js
```

### 4. Backend Setup (Node + Flask ML API)
```bash
cd backend
npm install
node server.js  # Starts Express backend

python app.py   # Starts Flask ML model API
```


---

## ML Model Overview

- **Input**: Cleaned Threat Description
- **Output**: Predicted Threat Category
- **Model**: Logistic Regression, TF-IDF Vectorizer

---