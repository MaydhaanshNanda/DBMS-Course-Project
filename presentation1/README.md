# Review 1: Project Conception & Problem Definition

**Project Title:** EMPLOYEE ATTENDANCE, SHIFT, LEAVE MANAGEMENT SYSTEM  
**Student Name:** Maydhaansh Nanda  
**Roll Number:** 25WU0102155  
**Course:** Database Management Systems (DBMS)  

---

## 1. Overview
This directory contains the deliverables and documentation for **Review 1** of the DBMS Course Project. The objective of this phase is to identify operational inefficiencies in legacy workforce administration, define the problem statement, articulate system scope, and establish the functional requirements for an enterprise-grade database management system.

Included Artifact:
- `DBMS Presentation.pptx`: Comprehensive 13-slide PowerPoint presentation deck detailing the project foundation, problem statement, scope, system users, and initial architectural roadmap.

---

## 2. Problem Statement
In traditional organizations and small-to-medium enterprises, workforce management frequently relies on fragmented spreadsheets, paper logs, or disconnected software tools. This results in significant organizational bottlenecks:

1. **Fragmented Employee Records**: Disparate storage of basic employee information, job roles, department mappings, and contact credentials leads to data discrepancies and synchronization lag.
2. **Manual Attendance Tracking**: Manual entry or disconnected biometric outputs introduce high error rates, duplicate time stamps, and vulnerability to unauthorized adjustments.
3. **Shift Coordination Conflicts**: Managing multi-shift rotations (morning, day, evening, night) without centralized referential constraints creates scheduling collisions and unmonitored under-staffing.
4. **Inefficient Leave Processing**: Physical paper applications and email-based leave requests lead to lost records, uncoordinated approvals, and delayed visibility for payroll.
5. **Slow Historical Data Retrieval**: Aggregating attendance metrics or leave histories for audits requires tedious manual parsing across disconnected records.

---

## 3. Scope & Core Objectives

### System Scope
The database architecture provides structured, centralized data persistence covering:
- **Employee Master Records**: Full demographic, contact, departmental, and compensation metadata.
- **Shift Definitions & Rotations**: Standardized operational schedules with start and end time boundaries.
- **Shift Assignments**: Explicit relational mapping between personnel and active shift slots.
- **Attendance Records**: Daily check-in/check-out logs with automated status classification (Present, Late, Absent, On Leave).
- **Leave Applications & Approvals**: Formal leave requests with category classifications, date ranges, justifications, and administrative review states.
- **System Administration & Access**: Secure user role assignments and audit tracking.

### Core Objectives
1. **Centralize Data Assets**: Unify all workforce-related entities into a standardized relational schema.
2. **Enforce Referential Integrity**: Maintain strict foreign key constraints preventing orphaned records (e.g., leave requests without an existing employee).
3. **Automate Schedule & Attendance Tracking**: Provide real-time status evaluations and prevent overlapping attendance entries.
4. **Streamline Request Workflows**: Enable transparent status progression (Pending $\rightarrow$ Approved / Rejected) with relational updates.
5. **Facilitate Rapid Querying & Analytics**: Provide structured schema indexing for instantaneous reporting on attendance rates, department rosters, and shift allocations.

---

## 4. User Personas & Access Roles

| Role | Key Permissions & Responsibilities |
| :--- | :--- |
| **System Administrator** | Full DDL/DML access; manages database tables, adds new users, configures operational shifts, and reviews audit logs. |
| **HR / Operations Manager** | Manages employee onboarding/offboarding, reviews attendance trends, assigns shifts, and approves/rejects leave requests. |
| **Employee** | Reads individual shift schedules, records attendance check-ins, submits leave applications, and tracks approval status. |

---

## 5. Functional Requirements Summary
- **Employee Module**: Create, read, update, and soft/hard delete employee records (`EMPLOYEE`).
- **Shift Module**: Configure operational shifts with time ranges; assign employees to specific shifts on effective dates (`SHIFT`, `EMPLOYEE_SHIFT`).
- **Attendance Module**: Daily logging with unique composite constraints (`Employee_ID`, `Date`) to prevent double-marking (`ATTENDANCE`).
- **Leave Module**: Submit categorized leave requests (`Casual Leave`, `Sick Leave`, `Emergency Leave`, etc.) with date range checks (`LEAVE`).
- **Administrative Module**: Map system users to employees with distinct authorization roles (`USER_ADMIN`).
