# 📒 ContactBook – Contact Management System

A full-stack Contact Management System developed as part of the **SyntecxHub Web Development Internship – Week 3**.

ContactBook helps users organize, manage, search, update, and delete their contacts through a clean and responsive interface.

## ✨ Features

- ➕ Add new contacts
- 👀 View all saved contacts
- ✏️ Edit existing contacts
- 🗑️ Delete contacts
- 🔍 Search contacts by name, email, or phone number
- 🏷️ Categorize contacts into Personal, Work, Family, and Other
- 📊 View contact statistics
- 💾 Store contact information in MongoDB
- 📱 Responsive user interface

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Tools
- Visual Studio Code
- Git
- GitHub
- Postman

## 📁 Project Structure

```text
Syntecxhub_Week3_Contact_Manager/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Contact.js
│   ├── routes/
│   │   └── contactRoutes.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
│
└── .gitignore
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/haniya-sabrin/Syntecxhub_Week3_Contact_Manager.git
```

### 2. Backend Setup

```bash
cd Syntecxhub_Week3_Contact_Manager/backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd Syntecxhub_Week3_Contact_Manager/frontend
npm install
npm run dev
```

Open the local URL provided by Vite in your browser.

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/contacts | Get all contacts |
| GET | /api/contacts/:id | Get a single contact |
| POST | /api/contacts | Add a contact |
| PUT | /api/contacts/:id | Update a contact |
| DELETE | /api/contacts/:id | Delete a contact |

## 🎯 Learning Outcomes

- Understanding full-stack application development
- Building RESTful APIs using Express.js
- Connecting React applications with backend APIs
- Performing CRUD operations
- Working with MongoDB and Mongoose
- Managing application state using React Hooks

## 👩‍💻 Developed By

**Haniya Sabrin A.**

B.Tech – Information Technology

SyntecxHub Web Development Internship – Week 3

GitHub: https://github.com/haniya-sabrin