# 📚 LearnHub

LearnHub is a modern full-stack **Course Management Web Application** built with **Next.js (App Router)**.  
It allows users to browse courses, view details, and manage courses with authentication-protected routes.

---

## 🚀 Live Demo
[https://learn-hub-rho-two.vercel.app/](https://learn-hub-rho-two.vercel.app/)

---

## ✨ Features

### 🌐 Public Features
- Modern landing page with responsive UI
- Course listing page with search functionality
- Course details page with full information
- Clean and reusable UI components
- Fully responsive design (mobile, tablet, desktop)

### 🔐 Authentication
- Google Login (NextAuth.js)
- Credentials-based login (demo)
- Protected routes (Add & Manage Courses)
- User session handling

### 📚 Course Management
- Add new courses (protected)
- View all courses
- Delete courses
- MongoDB database integration
- Real-time updates

### 🔎 Search & Filter
- Search courses by title
- Filter courses by level (Beginner / Intermediate / Advanced)

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Authentication:** NextAuth.js
- **Database:** MongoDB (Mongoose)
- **Styling:** Tailwind CSS
- **API:** Next.js API Routes




## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/LearnHub.git
cd LearnHub
2. Install dependencies
npm install
3. Setup environment variables

Create a .env.local file:

MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
4. Run the development server
npm run dev

App will run on:

http://localhost:3000
```
## 🔐 Authentication Setup (NextAuth)

Google OAuth is required for login
Credentials login is used for demo purposes
Session-based authentication for protected routes

📌 Key Pages
/ → Landing Page
/login → Authentication
/courses → Course Listing
/courses/[id] → Course Details
/add-course → Add Course (Protected)
/manage-courses → Manage Courses (Protected)

## 🎯 Learning Outcome

This project demonstrates:

Full-stack development with Next.js
Authentication handling with NextAuth
CRUD operations with MongoDB
Search & filter implementation
Responsive UI design
Protected routing system

