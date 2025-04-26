

# 🧠 Mini-CRM for Freelancers

A fullstack TypeScript-based CRM application tailored for freelancers to manage clients, projects, interaction logs, and reminders. Built with a clean, responsive UI and a secure, modular backend.

---

```markdown
## ✨ Tech Stack

### Frontend
- React (TypeScript)
- TailwindCSS
- Tanstack-Query
- Zod (Form Validation)
- React Hook Form

### Backend
- Express (TypeScript)
- PostgreSQL with Prisma ORM
- Zod (Request Validation)
- JWT Authentication (Access & Refresh Tokens)

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js ≥ 18
- PostgreSQL ≥ 14
- Yarn or npm

### 1. Clone the Repositories

```bash
# Frontend
git clone https://github.com/monishatBaishnab/crm-client
cd crm-client

# Backend
git clone https://github.com/monishatBaishnab/crm-server
cd crm-server
```

### 2. Configure Environment Variables

#### Backend `.env`
```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/mini_crm
JWT_SECRET=your_jwt_secret
```

#### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Install Dependencies & Run

#### Backend
```bash
cd crm-server
yarn install
yarn prisma migrate dev
yarn dev
```

#### Frontend
```bash
cd crm-client
yarn install
yarn dev
```

---

## 🚧 Development Workflow

1. **Requirement Analysis**: Thoroughly reviewed and analyzed the task requirements.
2. **Database Design**: Created a detailed ERD and planned the database schema to reflect task needs.
3. **Backend Development**:
   - Initialized the project with a modular structure.
   - Built reusable utility functions and middleware.
   - Implemented JWT-based authentication and Zod-based validation.
   - Created core modules (User, Client, Project, Reminder, Log) with full CRUD support.
4. **Frontend Development**:
   - Set up the folder structure, routing, layout, and theme switching.
   - Built reusable components (buttons, tables, pagination).
   - Integrated APIs using React and Zustand for state management.
   - Managed forms using React Hook Form with Zod validation.
5. **Finalization & Hosting**:
   - Performed final QA testing.
   - Made necessary UI/UX refinements.
   - Deployed the app on Vercel.

---

## 🧩 Core Features

### 🔐 Authentication
- Register/Login via email & password
- Access & refresh token-based sessions
- Secure protected routes

### 👥 Clients
- Full CRUD support

### 📁 Projects
- Linked to clients
- Full CRUD support

### 📝 Interaction Logs
- Track communication: calls, meetings, emails

### ⏰ Reminders
- Attach reminders to clients or projects
- Weekly summary of due items

### 📊 Dashboard
- Insights: total clients, total projects, status overview
- List of upcoming reminders

---

## 🌗 Light/Dark Mode Support
- Toggle between light and dark themes
- Preference saved in `localStorage`

---

## 🔒 Design & Security Highlights

- **JWT Authentication**: Stateless and scalable user sessions
- **Zod**: Uniform validation across frontend and backend
- **Prisma**: Type-safe and schema-driven ORM for PostgreSQL
- **Modular Architecture**: Clean and scalable codebase
- **Persistent Theme**: Simple theme management with localStorage

---

## 🗂 Entity Relationship Diagram

![ER Diagram](./er_diagram.png)

---

## 📬 API Documentation

- Includes routes for Auth, Clients, Projects, Reminders, and Logs
- [🔗 Postman Collection](./postman-collection.json)

