# 🎓 Student Scholarship Requests System
> **A Decoupled Full-Stack Web Application for Automated Grant Management**

---

## 🔗 Quick Links & Documentation
* 🖥️ **[Frontend Client Repository](https://github.com/Chana-Winefeld/student-grant-management-system/tree/main/client)** — React components and UI application logic.
* ⚙️ **[Backend Server API](https://github.com/Chana-Winefeld/student-grant-management-system/tree/main/server)** — Node.js runtime and Express endpoint configurations.
* 📦 **[Production Codebase](https://github.com/Chana-Winefeld/student-grant-management-system)** — Main deployment gate and cascading configuration setup.

---

## 💻 System Core Capabilities

### 🔹 Unified Client Application (Frontend)
* **Modular UI Architecture:** Built using React functional components with deterministic state flow.
* **Asynchronous Document Intake:** Integrated file selection system optimized for secure document handling.
* **Dynamic State Sync:** Client-side tracking logic ensuring zero-refresh rendering and fluid user experience.

### 🔹 Secure Gateway API (Backend)
* **Decoupled REST Routing:** Express router handling clean, high-performance request/response cycles.
* **Confidential Asset Isolation:** Dedicated file system pipeline dynamically managing incoming data streams within `/uploads`.
* **Environment-Level Protection:** Multi-environment runtime encapsulation powered by `dotenv` to secure infrastructure ports and credentials.

---

## 🛠️ System Architecture & Stack

### 📂 Dynamic Data Flow Diagram
```text
 ┌────────────────────────────────┐         Axios HTTP         ┌──────────────────────────────┐
 │     Client (React.js UI)       │ ─────────────────────────> │   Server (Node.js & Express) │
 │                                │ <───────────────────────── │                              │
 │  - Functional Components        │          JSON Data         │  - REST Endpoints / API      │
 │  - Reactive View Layer         │       & Uploaded Assets    │  - Secure File Storage       │
 └────────────────────────────────┘                            └──────────────────────────────┘
 📦 Dependency Infrastructure
Frontend Environment: React.js Core Engine

UI Layout & Styling: Tailwind CSS (Utility-first, fluid layout)

API Runtime Environment: Node.js Asynchronous Platform

Server Framework: Express.js (HTTP middleware & API routing handler)

Credential Encryption & Config: Dotenv Module

📂 Repository Blueprint
Student-Scholarship-Requests/
│
├── client/                     # Frontend Interface Layer
│   ├── public/                 # Deployment compilation assets
│   └── src/                    # Modular Components, Views & API layers
│
├── server/                     # Backend API Gateway
│   ├── api/                    # System Endpoints & Application Controllers
│   ├── uploads/                # Encapsulated student documentation vault
│   └── app.js                  # Main Express bootstrap configuration
│
└── .gitignore                  # Production-grade global repository ignore rules
⚙️ Local Development Setup
📥 1. Backend API Layer Activation
# Navigate to the server root
cd server

# Install verified repository dependencies
npm install

# System Environment Initialization:
# Create a local '.env' file inside the server directory and configure your port:
# PORT=5000

# Launch the backend development gateway
npm start
📤 2. Client Application Layer Activation
# Open a new terminal window and navigate to the client root
cd client

# Install frontend node modules
npm install

# Run the local Webpack compiler & start the React app
npm start
🔒 Security & Version Control Standards
Zero Secret Exposure: Credentials, local server configurations, and development parameters are strictly confined to independent .env files and never tracked.

Optimized Storage Footprint: Version control clutter is mitigated using a robust cascading configuration, keeping heavy compiled node_modules and local testing assets outside the remote cloud repository.
