# 🎬 CornFlix
### Project Overview & Technical Documentation

> **CornFlix** is a backend-centric application designed to demonstrate authentication workflows, REST API design, OTP handling, and cloud-based media management.
> This project is suitable for learning, portfolio showcase, and interview evaluation.

---

## 🏗 System Architecture

      Client (Browser)
   
      │
      │ HTTP (REST APIs)
      ▼
      Express Server (Node.js)
   
      │
      │ Cloudinary
      ▼
      MongoDB Database

---

## 🛠 Tech Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript

### Backend
- Node.js
- Express.js
- Multer (file uploads)

### Database
- MongoDB (MongoDB Atlas)

### Tools & Services
- Git & GitHub
- Render
- Cloudinary

---

## ⚙️ Environment Variables (.env)

PORT=5000

NOTE: Environment variables should never be committed to version control.

---

## 🗄 Database Design

### User Collection
      {
      
        email: { type: String, required: true },
        
        name: { type: String },
        
        gender: { type: String },
        
        pass: { type: String, required: true },
        
        confirm: { type: String },
        
        otp: { type: String },
        
        otpExpires: { type: Date }
      }

---


### QNA Collection
      {
      
        question: { type: String, required: true },
        answer: { type: String, default: "" },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
      }
      // timestamps enabled

---

## 🔗 API Endpoints

### User & Authentication APIs
      POST   /site/api/sign/signin  
      POST   /site/api/sign/signup  
      POST   /site/api/sign/sendotp  
      GET    /site/api/sign/getotp  
      POST   /site/api/sign/updatepass  

### QNA / Content APIs
      GET    /site/api/questions/

NOTE:
Check server file or routes folder for all routes and admin APIs.

---

## ⚡ Setup & Installation

      git clone https://github.com/oakleaf007/cornflix.git  
      cd cornflix  
      npm install  
      npm run dev  

Server runs at:
http://localhost:5000

---

## 🌱 Future Enhancements
- Genre based movies

---

## 📄 License
MIT License

---

## ⭐ Final Note

This documentation is designed to be interview-ready, recruiter-friendly, and scalable for future growth.

CornFlix — Built for learning. Designed for scalable backend systems.
