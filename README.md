# Kaja Namajer Hishab

A full-stack web application for tracking missed prayers (কাযা নামাজ) with a modern React frontend and Express/MongoDB backend.

## Live Demo

🌐 [Live Site](https://kaja-namajer-hisab-frontend.vercel.app)

---

## Features

### Frontend (React + Vite)
- User authentication with Google (Firebase Auth)
- Dashboard showing missed prayer counts
- Edit and update missed prayer records
- Responsive UI with Tailwind CSS and DaisyUI
- Toast notifications for user feedback
- Protected routes for authenticated users

### Backend (Express + MongoDB)
- REST API for managing missed prayer data
- Secure MongoDB connection with environment variables
- Endpoints for fetching, updating, and listing prayer records
- CORS and JSON middleware for smooth API communication

---

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, DaisyUI, Firebase Auth
- **Backend:** Node.js, Express, MongoDB

---

## Getting Started

### Backend Setup
1. Go to `kaja-express-server/`
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Create a `.env` file with your MongoDB URI:
   ```env
   db_uri=YOUR_MONGODB_URI
   ```
4. Start the server:
   ```bash
   pnpm dev
   ```

### Frontend Setup
1. Go to `kaja-namajer-hishab/`
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up Firebase in `src/firebase/firebase.init.js`
4. Start the frontend:
   ```bash
   pnpm dev
   ```

---

## Folder Structure

```
kaja-express-server/
  index.js
  package.json
kaja-namajer-hishab/
  src/
    Pages/
    Components/
    contexts/
    firebase/
    providers/
    Routes/
  package.json
```

---

## API Endpoints
- `GET /namaz/missed` — List all missed prayers
- `GET /namaz/missed/:namazName` — Get missed count for a specific prayer
- `POST /update/namaz` — Update missed prayer record

---

## Contributing
Pull requests and suggestions are welcome! For major changes, please open an issue first.

---

## License
MIT

---

## Author
Made with ❤️ by learner-of-string
