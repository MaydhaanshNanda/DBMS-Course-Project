# Review 3: Full-Stack Implementation & System Demonstration

**Project Title:** EMPLOYEE ATTENDANCE, SHIFT, LEAVE MANAGEMENT SYSTEM  
**Student Name:** Maydhaansh Nanda  
**Roll Number:** 25WU0102155  
**Course:** Database Management Systems (DBMS)  

---

## 1. Overview
This directory contains the final deliverables, source code, and deployment artifacts for **Review 3** of the DBMS Course Project. In this final milestone, the conceptual and logical designs from Reviews 1 & 2 are brought to life as an enterprise-grade full-stack web application integrated with **Prisma ORM**, a live relational **MySQL Database**, and a dynamic **Next.js** frontend.

### Directory Structure
```
presentation3/
├── readme.md               # Review 3 Executive Documentation
└── source code/            # Full-Stack Application Codebase
    ├── prisma/             # Database Schema & Seed Automation
    │   ├── schema.prisma   # Declarative Prisma Data Models
    │   ├── seed.js         # Automated Database Seeder
    │   └── current_data.json# Snapshot of Initial Relational Dataset
    ├── public/             # Static Assets & Vector Graphic Icons
    └── src/                # Next.js Source Code
        ├── components/     # UI Components (Tables, Modals, Forms, Stats)
        ├── context/        # EMSContext Live State & API Synchronization
        ├── lib/            # Prisma Client Singleton Instance
        └── pages/          # Application Routes & RESTful API Endpoints
            ├── api/        # Next.js Serverless Backend API Routes
            │   ├── admin/
            │   ├── attendance/
            │   ├── employees/
            │   ├── leave/
            │   ├── shifts/
            │   ├── reset.js
            │   └── stats.js
            ├── admin.jsx
            ├── attendance.jsx
            ├── dashboard.jsx
            ├── employees.jsx
            ├── index.jsx
            ├── leave.jsx
            └── shifts.jsx
```

---

## 2. Technical Stack Architecture

| Layer | Technology | Key Responsibility |
| :--- | :--- | :--- |
| **Relational Database** | **MySQL (InnoDB Engine)** | ACID compliance, primary/foreign key referential integrity, unique constraints, and physical storage in `EmployeeManagementDB`. |
| **ORM / Data Access** | **Prisma ORM (v6)** | Type-safe query building, introspected database contract mapping, automated schema synchronization, and deterministic migration. |
| **Backend API** | **Next.js API Routes (Node.js)** | RESTful API endpoints handling input validation, transactional operations, and JSON serialization. |
| **Frontend Framework** | **Next.js & React 19** | Dynamic Single Page Application (SPA) architecture, interactive forms, real-time toast feedback, and state management. |
| **Styling & Design** | **Modern Vanilla CSS System** | Clean dark/light theme accents, accessible contrast ratios, glassmorphism cards, and responsive data tables. |

---

## 3. Implemented Modules & Capabilities

### 1. Analytics & DBMS State Dashboard (`/`)
- Real-time KPI statistics: Total Headcount, Active Personnel, Daily Attendance Rate, Active Operational Shifts, and Pending Leave Requests.
- Visual Attendance Breakdown chart displaying proportional daily presence (`Present`, `Late`, `On Leave`, `Absent`).
- Real-time audit feed reflecting live transactional database events (`INSERT`, `UPDATE`, `DELETE`).

### 2. Employee Master Directory (`/employees`)
- **View Records**: Paginated/filtered data table showing Employee ID, full contact info, department, designation, and status badge.
- **Insert Record**: Interactive modal form to create a new record in `EMPLOYEE`, automatically assigning unique integer keys and default shift associations.
- **Delete Record**: Safe confirmation modal that executes referential cascade removals across attendance, leaves, and shift assignments in MySQL.

### 3. Attendance Management (`/attendance`)
- Daily attendance roster tracking check-in and check-out timestamps.
- **Insert / Upsert Attendance**: Quick logging modal enforcing `UNIQUE (Employee_ID, Date)` to prevent conflicting check-ins.
- Status classification with automated color indicators (`Present`, `Late`, `On Leave`, `Absent`).

### 4. Shift Scheduling & Assignment (`/shifts`)
- Operational shift cards displaying time boundaries (`07:00 AM - 03:30 PM`, `09:00 AM - 05:30 PM`, etc.) and capacity metrics.
- **Shift Assignment Modal**: Relational mapping assigning an employee to a shift with effective start date, persisting to `EMPLOYEE_SHIFT`.

### 5. Leave Processing & Approvals (`/leave`)
- Comprehensive registry of formal leave applications categorized by leave type (`Casual`, `Sick`, `Emergency`).
- **Submit Request**: Form modal capturing date ranges, category, and justification.
- **Administrative Decisioning**: Direct buttons to transition request state (`Pending` $\rightarrow$ `Approved` / `Rejected`), which dynamically updates corresponding employee presence.

### 6. Admin Roles & System Users (`/admin`)
- User table mapping system accounts to employees with distinct RBAC privileges (`Super Admin`, `HR Manager`, `System Auditor`).
- Create and remove administrative credentials with username uniqueness constraints.

---

## 4. Quick-Start Execution Guide

### Prerequisites
1. **Node.js** (v18 or newer)
2. **MySQL Server** running locally on port `3306`

### Running the Application
Navigate to the source code folder:
```bash
cd "presentation3/source code"
```

1. **Configure Environment**:
   Ensure `.env` contains your MySQL database connection:
   ```env
   DATABASE_URL="mysql://root:PASSWORD@localhost:3306/EmployeeManagementDB"
   ```

2. **Generate Prisma Client & Seed Database**:
   ```bash
   npx prisma generate
   node prisma/seed.js
   ```

3. **Launch the Development Server**:
   ```bash
   npm run dev
   ```

4. **Access Applications**:
   - Web Application Dashboard: **`http://localhost:3000`**
   - Prisma Visual Studio (GUI Database Browser):
     ```bash
     npx prisma studio
     ```
     Access at **`http://localhost:5555`**
