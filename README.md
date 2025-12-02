# Notes Application Challenge

This repository contains a full-stack note-taking web application built as a technical challenge for an interview.

The application allows users to create, edit, delete, archive, and categorize their notes. The frontend is a Single Page Application (SPA) built with React, and the backend is a REST API built with Spring Boot.

## Technologies Used

### Backend

- **Java:** 17
- **Spring Boot:** 3.5.7
- **Database:** PostgreSQL
- **Build Tool:** Maven

### Frontend

- **Node.js:** 18.x
- **Package Manager:** npm
- **Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.2
- **Language:** TypeScript 5.9.3
- **Styling:** Tailwind CSS 3.4.18
- **HTTP Client:** Axios 1.13.2

### Environment & Orchestration

- **Containerization:** Docker
- **Orchestration:** Docker Compose

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
