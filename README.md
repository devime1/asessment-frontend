# Frontend README 
# Assessment Frontend (React)

This is the frontend application for the Assessment Summary project.
It provides a mobile-first interface for viewing assessments and managing hazards.

## Tech Stack

- React
- TypeScript
- Vite
- Zustand (state management)
- React Router

---

# Features

- Assessment list page
- Assessment summary page
- Hazard list
- Add hazard
- Delete hazard
- Edit assessment
- Form validation matching backend validation
- Reusable modal component
- Mobile-first layout
- Not Found page for invalid routes

---

# Setup Instructions

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/devime1/asessment-frontend.git
cd assessment-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.dist .env
```

Open `.env` and fill in the required values:

```env
VITE_API_BASE_URL=http://localhost:3000   # Base URL of the backend API
```

> **Note:** This frontend requires the backend API to be running. Make sure it's up before starting the dev server.

### 4. Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**

---


## Contributors
- [@jerimemoreno](https://github.com/jerimemoreno) - Fullstack Developer