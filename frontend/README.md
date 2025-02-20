
# Assignment Infloso AI

This project is a full-stack web application built using the following technologies:

- **Frontend**: React.js with Vite
- **Backend**: Node.js with Express.js
- **Database**: MySQL2

The frontend and backend are separated into two different directories: `frontend` and `backend`.

## Project Structure

```
assignment_infloso_ai/
│
├── backend/               # Node.js/Express backend
│   ├── package.json       # Backend dependencies and scripts
│   ├── index.js           # Entry point for Express app
│   └── other files...     # Other backend-related files
│
└── frontend/              # React frontend with Vite
    ├── package.json       # Frontend dependencies and scripts
    ├── src/               # React app source code
    └── other files...     # Other frontend-related files
```

## Prerequisites

Before getting started, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 14 or above)
- [MySQL](https://www.mysql.com/) (or any MySQL-compatible database)

## Installation

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/assignment_infloso_ai.git
cd assignment_infloso_ai
```

### 2. Backend Setup

Navigate to the `backend` folder and install the backend dependencies:

```bash
cd backend
npm install
```

Make sure to set up your MySQL database, and configure your MySQL credentials in the backend code (e.g., `backend/config/db-conneect.js`).

```js
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your-database-password',
  database: 'your-database-name'
});
```

### 3. Frontend Setup

Navigate to the `frontend` folder and install the frontend dependencies:

```bash
cd frontend
npm install
```

### 4. Run the Application

You can run the backend and frontend servers separately, or run them simultaneously.

#### Option 1: Run Backend and Frontend Separately

1. In one terminal, start the backend:

```bash
cd backend
npm run start:dev
```

2. In another terminal, start the frontend:

```bash
cd frontend
npm run dev
```

By default, the backend will be running at `http://localhost:5000` and the frontend at `http://localhost:3000`.


## Usage

- The backend serves API endpoints (e.g., `/`) that the frontend can consume.
- The frontend (React app) makes HTTP requests to the backend API and displays the data in the UI.

## CORS

Since the frontend and backend run on different ports by default, **CORS (Cross-Origin Resource Sharing)** is enabled in the backend. If you encounter CORS-related issues, verify that your backend is configured with the `cors` middleware.

To enable CORS in your backend, ensure that this line exists in your `index.js`:

```js
const cors = require('cors');
app.use(cors());
```

## Technologies Used

- **Frontend**: React.js, Vite
- **Backend**: Node.js, Express.js, MySQL2, CORS
- **Development Tools**: Nodemon, Concurrently

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize any sections (like the database credentials or project links) to fit your specific use case.

Let me know if you need any changes or additions!