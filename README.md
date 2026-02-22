# 📧 SmartMail AI

SmartMail AI is a full-stack AI-powered email reply generator built using:

- Spring Boot (Backend)
- React (Frontend)
- Chrome Extension (Gmail Integration)
- Cohere API (AI Model)

It allows users to generate professional AI-based email replies directly inside Gmail.

---

## 🚀 Features

- Generate AI-powered email replies
- Select tone (Professional, Friendly, Formal, Casual)
- Chrome Extension integration with Gmail
- Full-stack architecture (Frontend + Backend)
- Secure API key handling using environment variables

---

## 🏗️ Project Architecture

Gmail (Chrome Extension)
        ↓
Spring Boot Backend (REST API)
        ↓
Cohere AI API
        ↓
AI-generated email reply

---

## 📂 Project Structure

```
smartmailAI-backend      → Spring Boot API
smartmailAI-frontend     → React UI
smartmail-extension      → Chrome Extension
```

---

## 🛠️ Tech Stack

### Backend
- Java
- Spring Boot
- WebClient
- REST APIs

### Frontend
- React
- Axios
- Vite

### Extension
- Chrome Extension (Manifest v3)
- DOM Manipulation
- MutationObserver

---

## 🔐 Environment Variables

Create environment variable:

```
COHERE_API_KEY=your_api_key_here
```

Spring Boot reads it using:

```
cohere.api.key=${COHERE_API_KEY}
```

---

## ▶️ How To Run

### Backend
```
cd smartmailAI-backend
mvn spring-boot:run
```

Runs on:
```
http://localhost:8080
```

---

### Frontend
```
cd smartmailAI-frontend
npm install
npm run dev
```

Runs on:
```
http://localhost:5173
```

---

### Chrome Extension
1. Open `chrome://extensions`
2. Enable Developer Mode
3. Click "Load Unpacked"
4. Select `smartmail-extension` folder
5. Open Gmail and click "Generate AI Reply"

---

## 💡 Future Improvements

- Deploy backend to cloud
- Add authentication
- Improve UI/UX
- Add multiple AI providers
- Publish extension to Chrome Web Store

---

## 👨‍💻 Author

Sujeet Kumar  
Full-Stack Developer | Java | Spring Boot | React
