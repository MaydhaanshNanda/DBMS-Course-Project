# EMPLOYEE ATTENDANCE, SHIFT, LEAVE MANAGEMENT SYSTEM

**Author:** Maydhaansh Nanda  
**Roll Number:** 25WU0102155  
**Project Title:** EMPLOYEE ATTENDANCE, SHIFT, LEAVE MANAGEMENT SYSTEM  
**Course:** Database Management Systems (DBMS)  

> A centralized, relational database management system built with **Next.js**, **Prisma ORM**, and **MySQL** to streamline workforce administration, shift scheduling, daily attendance recording, and formal leave workflows.

---

## 1. Executive Summary & Objective

In enterprise organizations, maintaining accurate records of human capital across scheduling shifts, daily time tracking, and leave entitlement is vital for operational continuity. The **Employee Attendance, Shift, and Leave Management System** replaces disparate manual ledgers with a unified, relational database model enforcing ACID compliance, referential integrity, and performant data retrieval.

### Key Objectives
1. **Unified Relational Repository**: Consolidate employee demographics, shift allocations, daily punch logs, and leave requests into normalized MySQL tables.
2. **Referential Integrity Enforcement**: Guarantee data consistency via foreign key relationships (`ON DELETE CASCADE` / `ON DELETE RESTRICT`) to prevent orphaned transactional logs.
3. **Automated Conflict Prevention**: Implement composite unique constraints (`UNIQUE (Employee_ID, Date)`) preventing duplicate punch entries on any calendar date.
4. **Transparent Approval Workflows**: Enable administrators and HR managers to transition leave statuses (`Pending` $\rightarrow$ `Approved` / `Rejected`) with dynamic ripple effects on employee availability.
5. **Real-Time Operational Analytics**: Provide executive dashboards summarizing headcount, punctuality rates, and department rosters.

---

## 2. Repository Architecture & Course Review Milestones

The repository is structured to mirror the iterative milestones of the academic course project:

```
.
├── README.md                          # Master Project Documentation (This File)
├── presentation1/                     # Review 1: Project Conception & Scope
│   ├── README.md                      # Detailed Review 1 Documentation
│   └── DBMS Presentation.pptx         # 13-Slide Overview Deck
├── presentation2/                     # Review 2: Conceptual & Logical Design
│   ├── README.md                      # Detailed ER & Normalization Documentation
│   └── ER.png                         # High-Resolution Entity-Relationship Diagram
└── Presentation 3/                    # Review 3: Implementation & Demonstration
    ├── readme.md                      # Detailed Review 3 Documentation
    └── source code/                   # Full-Stack Application Codebase
        ├── prisma/                    # Prisma ORM Schema & Automated Seeders
        ├── public/                    # Static Assets & Icons
        ├── src/                       # Next.js Frontend & API Route Handlers
        ├── package.json               # Dependencies & NPM Scripts
        └── README.md                  # Developer & API Technical Reference
```

| Phase | Directory | Description & Artifacts |
| :--- | :--- | :--- |
| **Review 1** | [presentation1/](file:///Users/maydhaanshnanda/Projects/DBMS/presentation1) | Problem definition, organizational bottlenecks, stakeholder analysis, and system scope definition. |
| **Review 2** | [presentation2/](file:///Users/maydhaanshnanda/Projects/DBMS/presentation2) | Entity-Relationship (ER) model, cardinality ratios, Relational Schema design, and Normalization analysis (1NF to 3NF). |
| **Review 3** | [Presentation 3/](file:///Users/maydhaanshnanda/Projects/DBMS/Presentation%203) | Live Next.js web application, Prisma ORM integration, MySQL database schema, seed scripts, and RESTful API endpoints. |

---

## 3. Relational Schema & Entity-Relationship (ER) Model

```mermaid
erDiagram
    EMPLOYEE ||--o{ ATTENDANCE : "logs"
    EMPLOYEE ||--o{ LEAVE : "applies_for"
    EMPLOYEE ||--o{ EMPLOYEE_SHIFT : "assigned_to"
    SHIFT ||--o{ EMPLOYEE_SHIFT : "schedules"
    EMPLOYEE ||--o| USER_ADMIN : "associated_with"

    EMPLOYEE {
        int Employee_ID PK
        varchar Name
        varchar Email UK
        varchar Phone
        varchar Department
        varchar Designation
    }

    ATTENDANCE {
        int Attendance_ID PK
        int Employee_ID FK
        date Date
        time Check_In
        time Check_Out
        varchar Status
    }

    SHIFT {
        int Shift_ID PK
        varchar Shift_Name
        time Start_Time
        time End_Time
    }

    EMPLOYEE_SHIFT {
        int Employee_ID PK,FK
        int Shift_ID PK,FK
        date Assigned_Date PK
    }

    LEAVE {
        int Leave_ID PK
        int Employee_ID FK
        varchar Leave_Type
        date Start_Date
        date End_Date
        varchar Reason
        varchar Status
    }

    USER_ADMIN {
        int User_ID PK
        int Employee_ID FK,UK
        varchar Username UK
        varchar Role
    }
```

### Relational Table Definitions (MySQL)
1. **`EMPLOYEE`**: `(Employee_ID [PK], Name, Email [UK], Phone, Department, Designation)`
2. **`SHIFT`**: `(Shift_ID [PK], Shift_Name, Start_Time, End_Time)`
3. **`EMPLOYEE_SHIFT`**: `(Employee_ID [PK, FK], Shift_ID [PK, FK], Assigned_Date [PK])`
4. **`ATTENDANCE`**: `(Attendance_ID [PK], Employee_ID [FK], Date, Check_In, Check_Out, Status)` — `UNIQUE (Employee_ID, Date)`
5. **`LEAVE`**: `(Leave_ID [PK], Employee_ID [FK], Leave_Type, Start_Date, End_Date, Reason, Status)`
6. **`USER_ADMIN`**: `(User_ID [PK], Employee_ID [FK, UK], Username [UK], Role)`

---

## 4. Full-Stack Technology Stack

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Relational Database** | **MySQL 8.x (InnoDB)** | Industrial-standard ACID-compliant database with foreign key support. |
| **ORM Framework** | **Prisma 6.19** | Type-safe queries, declarative schema contracts, and migrations. |
| **Backend Architecture**| **Next.js API Routes** | Serverless REST handlers executing transactional database operations. |
| **Frontend Framework** | **Next.js & React 19** | Single Page Application with dynamic client state and instant UI feedback. |
| **Design System** | **Vanilla CSS** | Modern design with custom tokens, responsive data tables, modals, and toasts. |

---

## 5. Quick-Start Guide (Running the Project Locally)

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/) running locally on port `3306`

### 2. Clone and Enter Source Code
```bash
git clone https://github.com/MaydhaanshNanda/DBMS-Course-Project.git
cd "DBMS-Course-Project/Presentation 3/source code"
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Database Credentials
Create or update `.env`:
```env
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/EmployeeManagementDB"
```

### 5. Generate Prisma Client & Seed Real Data
```bash
npx prisma generate
node prisma/seed.js
```

### 6. Start the Development Server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser to interact with the live system.

---

## 6. Functional Capabilities

- **Workforce Analytics**: Live count of personnel, active shifts, pending leaves, and attendance punctuality breakdown.
- **Employee Management (CRUD)**: Insert new personnel records, inspect historical profiles, filter by department, and delete with cascade safety.
- **Attendance Logging**: Real-time punch-in/out records with automated validation preventing duplicate entries.
- **Shift Scheduling**: Assign employees to operational shifts (`Morning`, `Standard Day`, `Evening`, `Night`).
- **Leave Requests & Processing**: Form submissions with instantaneous admin approval/rejection decision buttons.
- **Role-Based Administration**: User administration table maintaining system credentials and access roles.
- **Prisma Visual Studio**: Run `npx prisma studio` to inspect tables through Prisma's GUI.