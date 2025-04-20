# 🎸 JaMoveo Client

This is the **frontend application** for **JaMoveo** – a real-time, mobile-friendly web app designed to enhance rehearsal sessions for the Moveo band. Built with React and TypeScript, the client allows musicians to join live sessions, view song lyrics and chords based on their instrument, and stay in sync during rehearsals.

> 🔗 **Backend repository:** [jaMoveo_server](https://github.com/TalorLangnas/jaMoveo_server)

---

## ✨ Features

- 🔐 User registration and login with instrument selection  
- 🎭 Role-based interfaces (Admin, Singer, Instrumentalist) 
- 🧭 Full session control for Admin:
  - Session starts automatically upon admin login
  - Search and select songs in English or Hebrew
  - End the song at any time to return all participants to the main page
  - Logging out disconnects all users and closes the session   
- 🎼 Adaptive live view based on user role:
  - Singers view lyrics only
  - Instrumentalists view both chords and lyrics   
- ⏬ Auto-scroll feature for live view  
- 📱 Mobile-first responsive design for smooth experience across devices
- ⚡ Real-time communication via WebSockets (Socket.IO)

---

## 🌐 How to Use

Access the deployed app:  
🔗 **[https://my-express-app-9ynn.onrender.com](https://my-express-app-9ynn.onrender.com)**

### 👤 User Roles

- **Admin** – Controls the session  
- **Player** – Participates in the session (e.g., singer, guitarist, drummer)

### 📋 Application Flow

1. **Start a Session (Admin):**  
   Log in as the admin to automatically create and start a new rehearsal session.

2. **Join a Session (Player):**  
   After the admin has logged in, log in as a player to join the active session automatically.

3. **Search & Select Songs (Admin):**  
   Enter a query (English or Hebrew) to search songs. Select a result to broadcast it to all users.

4. **Live Page Behavior:**  
   All users are redirected to the Live Page with the selected song:
   - Singers see lyrics only  
   - Instrumentalists see lyrics and chords

5. **Ending or Leaving a Session:**  
   - When the admin clicks **"Quit"**, all users return to their main page.  
   - When the admin logs out, all players are logged out and the session is closed.


---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, CSS Modules  
- **API Integration:** Axios  
- **Real-time Communication:** Socket.IO Client  
- **Deployment:** Built and bundled into the backend server for deployment via [Render](https://render.com)

---

## 🚀 Getting Started

### 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- Backend server running locally or deployed ([JaMoveo Server](https://github.com/TalorLangnas/jaMoveo_server))

### 📁 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/TalorLangnas/jamoveo_client.git
cd jaMove_client
```
2. **Install dependencies:**

```bash
npm install
```
3. **Create a .env file in the project root:**

```bash
REACT_APP_BACKEND_URL=http://localhost:5000
```

**🧪 Run in Development Mode**
```bash
npm start
```
The frontend will run at:  
http://localhost:3000

**🌐 Production Deployment**  
The frontend is bundled and served as static files from the public/ directory of the backend.
To deploy:
- Run the frontend build:
```bash
npm run build
```
- Copy the contents of the build/ directory into the backend's public/ folder
- Deploy the backend (see [jaMoveo_server](https://github.com/TalorLangnas/jaMoveo_server))


