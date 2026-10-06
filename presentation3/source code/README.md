# Full-Stack Source Code Documentation

**Project Title:** EMPLOYEE ATTENDANCE, SHIFT, LEAVE MANAGEMENT SYSTEM  
**Student Name:** Maydhaansh Nanda  
**Roll Number:** 25WU0102155  
**Course:** Database Management Systems (DBMS)  

---

## 1. Introduction
This directory contains the production-ready source code for the **Employee Attendance, Shift, and Leave Management System**. It features a modern **Next.js** application integrated with **Prisma ORM** connecting to a local relational **MySQL** database (`EmployeeManagementDB`).

---

## 2. Technical Stack & Versions

- **Framework**: Next.js 16.3 (Pages Router)
- **Frontend Library**: React 19.2 / React-DOM 19.2
- **ORM**: Prisma 6.19 (`@prisma/client` & `prisma`)
- **Database**: MySQL 8.x (InnoDB Engine, Port 3306)
- **Icons**: Lucide React
- **Runtime**: Node.js v20+ / Bun

---

## 3. Directory Layout

```
source code/
├── .env                     # Database connection string
├── .env.local               # Local development environment override
├── next.config.mjs          # Next.js configuration and route redirects
├── package.json             # NPM package definitions and scripts
├── prisma/
│   ├── current_data.json    # Snapshot of the 6 normalized database tables
│   ├── schema.prisma        # Prisma data models mapped to MySQL tables
│   └── seed.js              # Database seed script for initial records
├── public/                  # SVG icons and static assets
└── src/
    ├── components/
    │   ├── admin/           # Admin user modals and table
    │   ├── attendance/      # Attendance marking modal and table
    │   ├── dashboard/       # Metric cards, charts, activity feeds
    │   ├── employees/       # Employee creation modal, details, table
    │   ├── layout/          # DashboardLayout, Header, responsive Sidebar
    │   ├── leave/           # Leave application modal and table
    │   ├── shifts/          # Shift assignment modal, shift cards, table
    │   └── ui/              # Buttons, inputs, modals, toasts, badges
    ├── context/
    │   └── EMSContext.jsx   # Live React Context synchronizing state with APIs
    ├── index.css            # Unified CSS design system
    ├── lib/
    │   └── prisma.js        # Global Prisma Client singleton instance
    └── pages/
        ├── api/             # RESTful API Endpoints
        │   ├── admin/       # GET, POST, DELETE /api/admin
        │   ├── attendance/  # GET, POST, DELETE /api/attendance
        │   ├── employees/   # GET, POST, DELETE /api/employees
        │   ├── leave/       # GET, POST, PATCH, DELETE /api/leave
        │   ├── shifts/      # GET, POST, DELETE /api/shifts & /api/shifts/assign
        │   ├── reset.js     # POST /api/reset (re-seeds database)
        │   └── stats.js     # GET /api/stats (KPI metrics)
        ├── _app.jsx         # Next.js App Shell wrapping EMSProvider and CSS
        ├── admin.jsx        # Admin User Management view
        ├── attendance.jsx   # Attendance Roster view
        ├── dashboard.jsx    # Central Overview Analytics view
        ├── employees.jsx    # Employee Directory & CRUD view
        ├── index.jsx        # Root route (renders dashboard)
        ├── leave.jsx        # Leave Application & Approval view
        └── shifts.jsx       # Operational Shift Roster view
```

---

## 4. RESTful API Specification

### Employees (`/api/employees`)
| Method | Endpoint | Description | Request Body / Query Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/employees` | Retrieves all employee records | None |
| `POST` | `/api/employees` | Inserts a new employee record | `{ name, email, phone, department, designation, salary }` |
| `DELETE` | `/api/employees?id={id}` | Deletes employee and cascades dependencies | `id`: Employee ID |

### Attendance (`/api/attendance`)
| Method | Endpoint | Description | Request Body / Query Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/attendance` | Retrieves all daily attendance logs | None |
| `POST` | `/api/attendance` | Inserts or upserts attendance record | `{ employee_id, date, status, check_in, check_out }` |
| `DELETE` | `/api/attendance?id={id}` | Deletes attendance entry | `id`: Attendance ID |

### Shifts (`/api/shifts`)
| Method | Endpoint | Description | Request Body / Query Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/shifts` | Retrieves shift templates & active assignments | None |
| `POST` | `/api/shifts` | Creates a new operational shift | `{ shift_name, start_time, end_time }` |
| `POST` | `/api/shifts/assign`| Assigns an employee to a shift | `{ employee_id, shift_id, effective_date }` |
| `DELETE` | `/api/shifts?id={id}` | Deletes shift record | `id`: Shift ID |

### Leave Management (`/api/leave`)
| Method | Endpoint | Description | Request Body / Query Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/leave` | Retrieves all leave applications | None |
| `POST` | `/api/leave` | Submits a new leave request | `{ employee_id, leave_type, start_date, end_date, reason }` |
| `PATCH`| `/api/leave` | Updates status (`Approved` / `Rejected`) | `{ leave_id, status }` |
| `DELETE`| `/api/leave?id={id}`| Deletes leave record | `id`: Leave ID |

### Administration (`/api/admin`)
| Method | Endpoint | Description | Request Body / Query Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin` | Retrieves all admin user accounts | None |
| `POST` | `/api/admin` | Creates a new admin user | `{ username, role, employee_id }` |
| `DELETE`| `/api/admin?id={id}`| Deletes admin user account | `id`: User ID |

### System Reset & Metrics
- **`GET /api/stats`**: Returns calculated counts (`totalEmployees`, `activeShifts`, `pendingLeaves`, `attendanceRate`).
- **`POST /api/reset`**: Automatically runs `prisma/seed.js` to restore baseline demo records.

---

## 5. Development & Build Commands

```bash
# 1. Install dependencies
npm install

# 2. Introspect database schema
npx prisma db pull

# 3. Generate Prisma client types
npx prisma generate

# 4. Seed the MySQL database
node prisma/seed.js

# 5. Run local development server
npm run dev

# 6. Build optimized production bundle
npm run build

# 7. Start production server
npm start
```

---

## 6. Verification & Testing

To test the live backend APIs directly from the command line:

```bash
# Query employees
curl http://localhost:3000/api/employees

# Query system KPI stats
curl http://localhost:3000/api/stats

# Insert employee
curl -X POST http://localhost:3000/api/employees \
  -H "Content-Type: application/json" \
  -d '{"name":"Alex Rivers","email":"alex.rivers@university.edu","department":"IT","designation":"Cloud Engineer"}'
```
