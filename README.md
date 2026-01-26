# Notes Application — Full Stack Implementation

This repository contains a full-stack note-taking web application built as a technical challenge for an interview.

The project focuses on implementing a clear frontend–backend separation, realistic API consumption, and a reproducible local development environment.

The application allows users to create, edit, delete, archive, and categorize notes. The frontend is a Single Page Application (SPA) built with React, while the backend is a REST API built with Spring Boot.

While this is a full stack application, the project places particular emphasis on backend API design, validation, and clear contracts between layers.

---

## Purpose

The goal of this project is not only to deliver a working application, but to demonstrate production-oriented full stack design and API-driven development.

The implementation emphasizes:
- Clear separation of responsibilities between frontend and backend
- Explicit data validation and API contracts
- A reproducible environment using containerization

---

## Technology Stack

### Backend

- **Java 17** — Core language
- **Spring Boot 3.5.7** — REST API and application configuration
- **PostgreSQL** — Relational database
- **Maven** — Dependency management and build automation

### Frontend

- **React 19 (TypeScript)** — Single Page Application
- **Vite** — Frontend build tool
- **Tailwind CSS** — Styling
- **Axios** — HTTP client for API communication

### Environment & Orchestration

- **Docker** — Application containerization
- **Docker Compose** — Multi-service local development environment (frontend, backend, database)

---

## Architecture Overview

The application is structured as a decoupled system:

- The backend exposes a REST API responsible for business logic, validation, and data persistence.
- The frontend consumes the API and handles UI state and user interactions.
- Communication between layers happens exclusively through HTTP using well-defined request and response models.

This structure mirrors common production setups where frontend and backend evolve independently.

---

## API Overview

The backend exposes REST endpoints to manage notes and categories, including:

- Creation and update of notes
- Archiving and deletion
- Categorization and filtering

Validation is handled at the API level to ensure data consistency regardless of the client.

---

## Prerequisites

Before running the application, ensure you have:

- **Docker** and **Docker Compose** installed  
  (Docker Desktop is the recommended option)

Verify installation:

```bash
docker --version
docker-compose --version
```

# Running the Application

The entire system can be started using a single command thanks to Docker Compose and a helper script.

1. **Clone the repository:**

```bash
git clone <repository-url>
cd <repository-directory>
```

2. **Make the run script executable (if necessary):**
```bash
chmod +x run.sh
```

3. **Start the application**
```bash
./run.sh
```
This will:

Build Docker images for the frontend and backend

Start the frontend, backend, and PostgreSQL database containers

Seed the database with sample data on first run (if empty)

## Once running:

Backend: http://localhost:8080
Frontend: http://localhost:5173

## Project Structure

/backend — Spring Boot REST API
/frontend — React SPA
docker-compose.yml — Service definitions and networking
run.sh — Convenience script to start the system

CHALLENGE.md — Original challenge description

## Demo 
<img width="1432" height="698" alt="Captura de pantalla 2026-01-02 a la(s) 8 19 21 p  m" src="https://github.com/user-attachments/assets/1c725112-cfa6-4802-9d0f-bb3e8f543dc4" />

