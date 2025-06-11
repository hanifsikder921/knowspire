# 📘 KnowSpire – A Knowledge Sharing Platform

Welcome to **KnowSpire**, a knowledge-sharing platform built using the **MERN stack** and **Firebase Authentication**. This platform empowers students to share articles, ideas, and insights, while interacting through comments and likes – helping them grow together through knowledge.

🔗 **Live Site:** [https://knowspire-49d88.web.app/](https://knowspire-49d88.web.app/)

---

## 📌 Project Purpose

The goal of KnowSpire is to create a student-friendly platform where anyone can:
- Read articles without logging in
- Post and manage their own articles (after login)
- Like and comment on other users’ articles
- Explore articles by category
- Engage with a growing student community

---

## 🚀 Tech Stack

### 🔧 Frontend
- React 19
- Vite
- Tailwind CSS
- DaisyUI
- Firebase Authentication
- Axios
- Framer Motion
- Lottie React
- React Slick
- SweetAlert2
- React Spinners
- React Helmet Async
- Typewriter Effect
- React Icons
- React Router

### 🌐 Backend
- Node.js
- Express.js
- MongoDB
- dotenv (for env security)
- CORS
- JWT (for protected APIs)

---

## ✨ Key Features

### 🧭 Navigation Bar
- Home
- All Articles
- My Articles (Private)
- Post Article (Private)
- About Us
- Conditional display based on authentication
- Profile picture dropdown for logged-in users

### 🏠 Home Page
- Hero banner with call-to-action button
- Featured articles section
- Categories list (e.g., Technology, Science, Arts)
- Clickable categories to filter articles
- Extra sections: **Top Contributors**, **Featured Tags**

### 🔐 Authentication
- Email/password based login and registration
- Google social login
- Error/success toasts using SweetAlert2
- Strong password validation

### 📄 All Articles Page
- Displays all published articles as cards with:
  - Title, Author, Date
  - "Read More" button

### 📑 Article Details Page
- Full article view with:
  - Title, content, category, tags, author info
  - Like and Comment section
  - Total number of likes and comments

### ✍️ Post Article (Private)
- Title
- Content
- Category
- Tags (optional)
- Thumbnail Image URL
- Automatically captures current user info

### 📋 My Articles (Private)
- Lists only current user's articles in a table format
- Options to Update (with pre-filled modal) or Delete (with confirmation)

### ❌ 404 Page
- Custom "Not Found" page with illustration
- "Back to Home" button

### 👣 Footer
- Logo
- Links: About Us, Contact, Terms & Conditions
- Social Media icons
- Copyright

---

## 🔐 Security & Environment Variables

- **Firebase config** stored in `.env` and accessed using `import.meta.env`
- **MongoDB URI** secured in `.env` file on server side
- **JWT Token** stored in localStorage and verified via middleware

---

## 🧠 Advanced Features

- 🔐 JWT Authentication for API & Private Routes
- 🌓 Light/Dark Theme Toggle
- 🔍 Server-side Article Filtering by Category/Tags
- 🧠 Rich text editor using `jodit-react` (optional)
- 👤 User Profile System (optional)
- 🎬 Framer Motion animations

---


---

## ✅ NPM Packages Used

### Core:
- `react`
- `react-dom`
- `react-router`
- `axios`
- `firebase`

### Styling & UI:
- `tailwindcss`
- `daisyui`
- `sweetalert2`
- `react-icons`
- `react-helmet-async`
- `react-slick`
- `slick-carousel`
- `lottie-react`
- `framer-motion`
- `typewriter-effect`
- `react-spinners`

### Dev & Config:
- `vite`
- `dotenv`
- `eslint`
- `@vitejs/plugin-react`
- `@tailwindcss/vite`

---

## 📝 Commit History

- **Client:** 15+ meaningful and descriptive commits
- **Server:** 8+ meaningful commits
> All commits include proper messages for features, fixes, and updates.

---

## 📄 Deployment Notes

- Live client deployed to Firebase Hosting
- Server deployed on Render with CORS enabled
- All routes (including private) work correctly on refresh
- Firebase auth domain is properly configured
- JWT protected routes redirect unauthenticated users

---



---

## 🧑‍💻 Author

**Hanif Sikder**  
Frontend Developer | MERN Stack Enthusiast  
 [GitHub](https://github.com/hanifsikder921)

---

> “Empowering students to learn from each other through shared knowledge.” – *KnowSpire*


