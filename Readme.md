# IdeaSpark – Mini Idea Pitching Board

🔗 **Live URL:** https://cashflowcrew-assignment-eight.vercel.app

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite), Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Deployment | Vercel (Frontend), Render (Backend) |

---

## Features

- Submit new ideas with title, description, and author name
- View all ideas sorted by newest or most upvoted
- Upvote your favorite ideas
- Delete ideas
- Search and filter ideas by title or author
- Comment on ideas
- Form validation with error messages

---

## Local Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/cashflowcrew-assignment.git
cd cashflowcrew-assignment
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App will run at `http://localhost:5173`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/ideas` | Fetch all ideas |
| POST | `/api/ideas` | Create new idea |
| PUT | `/api/ideas/:id/upvote` | Upvote an idea |
| DELETE | `/api/ideas/:id` | Delete an idea |
| POST | `/api/ideas/:id/comments` | Add a comment |

---

## Folder Structure

```
cashflowcrew-assignment/
├── backend/
│   ├── models/
│   │   └── Idea.js
│   ├── routes/
│   │   └── ideas.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── componenents/
│   │   │   ├── IdeaForm.jsx
│   │   │   └── IdeaList.jsx
│   │   └── App.jsx
│   └── index.html
└── README.md
```
