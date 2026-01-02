# Notes Application Challenge

This repository contains a full-stack note-taking web application built as a technical challenge for an interview.

The application allows users to create, edit, delete, archive, and categorize their notes. The frontend is a Single Page Application (SPA) built with React, and the backend is a REST API built with Spring Boot.

## Technology Stack & Tooling

### Backend

- **Java 17** — Core language
- **Spring Boot 3.5.7** — REST API and application configuration
- **PostgreSQL** — Relational database for persistent storage
- **Maven** — Dependency management and build automation

### Frontend

- **React 19 (TypeScript)** — Single Page Application
- **Vite** — Frontend build tool
- **Tailwind CSS** — Styling
- **Axios** — API communication

### Environment & Orchestration

- **Docker** — Application containerization
- **Docker Compose** — Multi-service local environment (frontend, backend, database)


### Architecture Overview

The application is structured as a decoupled frontend and backend system.
The frontend consumes a REST API exposed by the backend, which handles business logic, data persistence, and validation.
The system is containerized using Docker to ensure consistent local development and reproducible environments.

### API Overview 

The backend exposes REST endpoints to manage notes and categories, including creation, update, deletion, archiving, and filtering.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Docker** and **Docker Compose** (Docker Desktop is the easiest way to get both).
  Steps:

1. Download Docker Desktop
2. Run docker --version
   docker-compose --version

## How to Run the Application

The entire application can be started using a single command thanks to the provided shell script and Docker Compose setup.

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Make the run script executable (if necessary):**

    ```bash
    chmod +x run.sh
    ```

3.  **Run the application:**
    ```bash
    ./run.sh
    ```

This script will perform the following actions:

- It uses `docker-compose up` to build the Docker images for both the `backend` and `frontend` services.
- It starts the containers for the backend, frontend, and a PostgreSQL database.
- The backend will be available at `http://localhost:8080`.
- The frontend will be available at `http://localhost:5173`.

The first time the backend runs, it will automatically seed the database with some sample categories and notes if the database is empty.

## Project Structure

- `/backend`: Contains the Spring Boot REST API.
- `/frontend`: Contains the React SPA.
- `docker-compose.yml`: Defines the services, networks, and volumes for Docker.
- `run.sh`: A convenience script to start the application.
- `CHALLENGE.md`: The original challenge description.

## Demo
<img width="1432" height="698" alt="Captura de pantalla 2026-01-02 a la(s) 8 19 21 p  m" src="https://github.com/user-attachments/assets/041b3d84-a771-43e5-bd2b-71757ca1991a" />

