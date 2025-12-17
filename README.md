# Job Application Portal API

A simple and well-structured RESTful API built with **Node.js, Express, and MongoDB**
that allows candidates to register, upload resumes, apply for jobs, and track their
applications.

This project is designed to demonstrate clean REST API design, authentication,
file uploads, and backend best practices.

## Features

- User Authentication using JWT and Bcrypt
- Candidate registration and login
- Automatically seeded sample job listings
- Apply for jobs with resume upload (PDF/DOC/DOCX)
- View submitted job applications
- Service-layer architecture for clean separation of concerns

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **File Handling**: Multer (Disk Storage)

## Setup & Installation

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js** (v14+ recommended)
- **MongoDB** (Local instance or Atlas URI)
- **Postman** (For API testing)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/job-portal-api.git
    cd node_js_task
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add the following keys:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/job_portal
    JWT_SECRET=your_super_secret_key_change_this
    ```
    *Note: A `MONGO_URI` is required. If you don't have a local MongoDB, use a free cluster from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).*

4.  **Seed the Database (Optional)**
    The server automatically seeds sample jobs on startup if the database is empty.

5.  **Run the Server**
    ```bash
    # Development Mode (uses Nodemon for auto-restart)
    npm run dev

    # Production Mode
    npm start
    ```
    You should see: `Server running on port 5000` and `MongoDB Connected`.

## API Documentation

The API follows RESTful principles. Below are the key endpoints.

### 1. Authentication

#### Register User
- **Endpoint**: `POST /api/auth/register`
- **Body**:
    ```json
    {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "password": "password123",
        "role": "user" 
    }
    ```
    *(Note: Set `role` to `admin` to create a Recruiter)*

#### Login
- **Endpoint**: `POST /api/auth/login`
- **Body**:
    ```json
    {
        "email": "jane@example.com",
        "password": "password123"
    }
    ```
- **Response**: Returns a JWT `token`. **You must Include this token in the `Authorization` header (`Bearer <token>`) for protected routes.**

### 2. Jobs

#### Get All Jobs
- **Endpoint**: `GET /api/jobs`
- **Access**: Public
- **Response**: Array of job objects.

### 3. Applications

#### Apply for a Job
- **Endpoint**: `POST /api/applications`
- **Headers**: `Authorization: Bearer <token>`
- **Body (form-data)**:
    - `jobId`: (Text) ID of the job you are applying to.
    - `resume`: (File) The resume file (pdf, doc, docx).

#### View My Applications
- **Endpoint**: `GET /api/applications/me`
- **Headers**: `Authorization: Bearer <token>`

## Testing with Postman

A comprehensive Postman Collection is included to make testing easy.

1.  Open Postman.
2.  Click **Import** and select the file `job_portal.postman_collection.json` from this project's root folder.
3.  **Environment Setup**:
    - The collection uses a `{{URL}}` variable defaulting to `http://localhost:5000`.
    - It uses a `{{TOKEN}}` variable for authentication.
4.  **How to Test**:
    - Run the **Register** or **Login** request first.
    - Copy the `token` from the response.
    - Paste this token into the **Collection Variables** (Edit Collection -> Variables -> Current Value of `TOKEN`) OR manually add it to the Authorization header of subsequent requests.
    - Now you can run "Create Job", "Apply for Job", etc.

## Deployment

This project is ready for deployment on platforms like Render or Heroku.

1.  **Build Command**: `npm install`
2.  **Start Command**: `npm start`
3.  Ensure you set the `MONGO_URI` and `JWT_SECRET` in your cloud provider's environment variable settings.
