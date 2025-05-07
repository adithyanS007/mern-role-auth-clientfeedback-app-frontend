# MERN Role-Based Auth & Client Feedback App

A full-stack web application built with the **MERN stack (MongoDB, Express, React, Node.js)** implementing **role-based authentication** (admin and client), **protected routing**, and **client feedback management**.

---

## 🔗 Live Preview

👉 [Live App](https://mern-role-auth-clientfeedback-app-frontend.vercel.app)

---

## 🚀 Features

- 🔐 JWT Authentication
- 👥 Role-based access control (Admin, Client)
- 🔒 Protected Routes for Authenticated Users
- 📋 Clients can submit feedback with images
- 🛠 Admin can view feedback details
- 📈 Modern UI using React & Tailwind CSS
- 🧩 Clean project structure (separate frontend & backend)

---

## 📁 Folder Structure

```
MERN_AUTH/
├── frontend/ # React application (Vite)
├── server/ # Node.js + Express backend
└── README.md # Project documentation
```


---

## ⚙️ Tech Stack

### Frontend:
- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- dotenv
- multer

---

## 🔧 Installation & Setup

### 1. Clone the repositories
```bash
git clone https://github.com/adithyanS007/mern-role-auth-clientfeedback-app-frontend.git
git clone https://github.com/adithyanS007/mern-role-auth-clientfeedback-app-server.git
```

## 🔧 Backend Setup
```
cd mern-role-auth-clientfeedback-app-server
npm install
touch .env
```
- Inside .env file
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
- Run Backend
```
npm start
```

## 🔧 Frontend Setup
```
cd mern-role-auth-clientfeedback-app-frontend
npm install
npm run dev
```

## 🔐 Authentication Flow
✅ Login and Signup

##🧑‍💼 Role assigned during user creation (admin or client)
🛡 PrivateRoutes and RoleBasedRoutes components protect unauthorized access

## 🧪 Routes Overview
- Public Routes:
```
/login

/signup
```

- Protected Routes:
```
/admin-dashboard → Only accessible to admin

/client-dashboard → Accessible to admin & client

/feedback/:id → Admin can view specific feedback
```

## 📝 Feedback Module
- Client can submit feedback (feature can be extended)

Admin can view and manage all feedback entries



## 🌐 Deployment
You can deploy the frontend on Vercel and the backend on Render / Railway / Vercel (with vercel.json)


## ✍️ Author
👨‍💻 Adithyan S



## 📜 License
This project is licensed under the MIT License.

