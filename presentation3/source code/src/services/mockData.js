/**
 * Centralized Initial Mock Data for the 6 DBMS Logical Entities:
 * 1. EMPLOYEE
 * 2. ATTENDANCE
 * 3. SHIFT
 * 4. EMPLOYEE_SHIFT
 * 5. LEAVE
 * 6. USER_ADMIN
 * 
 * Foreign keys and relationships are strictly maintained:
 * e.g., EMP-101 in ATTENDANCE, EMPLOYEE_SHIFT, and LEAVE maps directly to EMP-101 in EMPLOYEE.
 */

export const INITIAL_EMPLOYEES = [
  {
    employee_id: 'EMP-101',
    first_name: 'Alexander',
    last_name: 'Wright',
    name: 'Alexander Wright',
    email: 'alexander.wright@university.edu',
    phone: '+1 (555) 234-5678',
    department: 'Engineering',
    designation: 'Senior Software Engineer',
    status: 'Active',
    join_date: '2022-03-15',
    salary: 95000
  },
  {
    employee_id: 'EMP-102',
    first_name: 'Sophia',
    last_name: 'Chen',
    name: 'Sophia Chen',
    email: 'sophia.chen@university.edu',
    phone: '+1 (555) 345-6789',
    department: 'Human Resources',
    designation: 'HR Lead Specialist',
    status: 'Active',
    join_date: '2021-08-01',
    salary: 82000
  },
  {
    employee_id: 'EMP-103',
    first_name: 'Marcus',
    last_name: 'Vance',
    name: 'Marcus Vance',
    email: 'marcus.vance@university.edu',
    phone: '+1 (555) 456-7890',
    department: 'Finance',
    designation: 'Financial Analyst',
    status: 'Active',
    join_date: '2023-01-10',
    salary: 76000
  },
  {
    employee_id: 'EMP-104',
    first_name: 'Elena',
    last_name: 'Rostova',
    name: 'Elena Rostova',
    email: 'elena.rostova@university.edu',
    phone: '+1 (555) 567-8901',
    department: 'Operations',
    designation: 'Operations Director',
    status: 'Active',
    join_date: '2020-05-20',
    salary: 115000
  },
  {
    employee_id: 'EMP-105',
    first_name: 'David',
    last_name: 'Miller',
    name: 'David Miller',
    email: 'david.miller@university.edu',
    phone: '+1 (555) 678-9012',
    department: 'Marketing',
    designation: 'Digital Marketing Strategist',
    status: 'On Leave',
    join_date: '2023-04-12',
    salary: 71000
  },
  {
    employee_id: 'EMP-106',
    first_name: 'Aisha',
    last_name: 'Patel',
    name: 'Aisha Patel',
    email: 'aisha.patel@university.edu',
    phone: '+1 (555) 789-0123',
    department: 'Engineering',
    designation: 'Database Architect',
    status: 'Active',
    join_date: '2021-11-05',
    salary: 108000
  },
  {
    employee_id: 'EMP-107',
    first_name: 'Lucas',
    last_name: 'Gomez',
    name: 'Lucas Gomez',
    email: 'lucas.gomez@university.edu',
    phone: '+1 (555) 890-1234',
    department: 'Operations',
    designation: 'Logistics Supervisor',
    status: 'Active',
    join_date: '2022-09-01',
    salary: 68000
  },
  {
    employee_id: 'EMP-108',
    first_name: 'Rachel',
    last_name: 'Kim',
    name: 'Rachel Kim',
    email: 'rachel.kim@university.edu',
    phone: '+1 (555) 901-2345',
    department: 'Engineering',
    designation: 'Frontend Developer',
    status: 'Active',
    join_date: '2023-06-18',
    salary: 84000
  },
  {
    employee_id: 'EMP-109',
    first_name: 'James',
    last_name: 'Taylor',
    name: 'James Taylor',
    email: 'james.taylor@university.edu',
    phone: '+1 (555) 012-3456',
    department: 'Finance',
    designation: 'Senior Accountant',
    status: 'Active',
    join_date: '2019-10-14',
    salary: 89000
  },
  {
    employee_id: 'EMP-110',
    first_name: 'Olivia',
    last_name: 'Martinez',
    name: 'Olivia Martinez',
    email: 'olivia.martinez@university.edu',
    phone: '+1 (555) 123-4567',
    department: 'Human Resources',
    designation: 'Talent Acquisition Partner',
    status: 'On Leave',
    join_date: '2024-01-08',
    salary: 69000
  },
  {
    employee_id: 'EMP-111',
    first_name: 'Benjamin',
    last_name: 'Scott',
    name: 'Benjamin Scott',
    email: 'benjamin.scott@university.edu',
    phone: '+1 (555) 234-9988',
    department: 'Engineering',
    designation: 'DevOps Lead',
    status: 'Active',
    join_date: '2022-02-01',
    salary: 102000
  },
  {
    employee_id: 'EMP-112',
    first_name: 'Victoria',
    last_name: 'Harper',
    name: 'Victoria Harper',
    email: 'victoria.harper@university.edu',
    phone: '+1 (555) 345-8877',
    department: 'Marketing',
    designation: 'Content & PR Manager',
    status: 'Active',
    join_date: '2023-08-22',
    salary: 74000
  }
];

export const INITIAL_SHIFTS = [
  {
    shift_id: 'SH-01',
    shift_name: 'Morning Shift',
    start_time: '07:00 AM',
    end_time: '03:30 PM',
    description: 'Early operational window for facility setup and morning client support.',
    max_capacity: 15
  },
  {
    shift_id: 'SH-02',
    shift_name: 'Standard Day Shift',
    start_time: '09:00 AM',
    end_time: '05:30 PM',
    description: 'Core business hours for all general office personnel and meetings.',
    max_capacity: 30
  },
  {
    shift_id: 'SH-03',
    shift_name: 'Evening Shift',
    start_time: '03:00 PM',
    end_time: '11:30 PM',
    description: 'Late operational shift for extended support and server maintenance.',
    max_capacity: 10
  },
  {
    shift_id: 'SH-04',
    shift_name: 'Night Shift',
    start_time: '11:00 PM',
    end_time: '07:30 AM',
    description: 'Overnight monitoring, security operations, and system batch jobs.',
    max_capacity: 5
  }
];

export const INITIAL_EMPLOYEE_SHIFTS = [
  { assignment_id: 'ES-01', employee_id: 'EMP-101', shift_id: 'SH-02', effective_date: '2026-01-01', status: 'Assigned' },
  { assignment_id: 'ES-02', employee_id: 'EMP-102', shift_id: 'SH-02', effective_date: '2026-01-01', status: 'Assigned' },
  { assignment_id: 'ES-03', employee_id: 'EMP-103', shift_id: 'SH-01', effective_date: '2026-01-01', status: 'Assigned' },
  { assignment_id: 'ES-04', employee_id: 'EMP-104', shift_id: 'SH-02', effective_date: '2026-01-01', status: 'Assigned' },
  { assignment_id: 'ES-05', employee_id: 'EMP-105', shift_id: 'SH-01', effective_date: '2026-01-01', status: 'Assigned' },
  { assignment_id: 'ES-06', employee_id: 'EMP-106', shift_id: 'SH-03', effective_date: '2026-01-01', status: 'Assigned' },
  { assignment_id: 'ES-07', employee_id: 'EMP-107', shift_id: 'SH-01', effective_date: '2026-01-01', status: 'Assigned' },
  { assignment_id: 'ES-08', employee_id: 'EMP-108', shift_id: 'SH-02', effective_date: '2026-01-01', status: 'Assigned' },
  { assignment_id: 'ES-09', employee_id: 'EMP-109', shift_id: 'SH-02', effective_date: '2026-01-01', status: 'Assigned' },
  { assignment_id: 'ES-10', employee_id: 'EMP-110', shift_id: 'SH-02', effective_date: '2026-01-01', status: 'Assigned' },
  { assignment_id: 'ES-11', employee_id: 'EMP-111', shift_id: 'SH-04', effective_date: '2026-01-01', status: 'Assigned' },
  { assignment_id: 'ES-12', employee_id: 'EMP-112', shift_id: 'SH-02', effective_date: '2026-01-01', status: 'Assigned' }
];

export const INITIAL_ATTENDANCE = [
  { attendance_id: 'ATT-201', employee_id: 'EMP-101', date: '2026-10-06', check_in: '08:52 AM', check_out: '05:35 PM', status: 'Present', notes: 'Punctual arrival' },
  { attendance_id: 'ATT-202', employee_id: 'EMP-102', date: '2026-10-06', check_in: '09:05 AM', check_out: '05:30 PM', status: 'Present', notes: 'Standard check-in' },
  { attendance_id: 'ATT-203', employee_id: 'EMP-103', date: '2026-10-06', check_in: '06:55 AM', check_out: '03:30 PM', status: 'Present', notes: 'Early morning shift' },
  { attendance_id: 'ATT-204', employee_id: 'EMP-104', date: '2026-10-06', check_in: '08:45 AM', check_out: '05:40 PM', status: 'Present', notes: 'Executive meeting' },
  { attendance_id: 'ATT-205', employee_id: 'EMP-105', date: '2026-10-06', check_in: '--', check_out: '--', status: 'On Leave', notes: 'Approved Annual Leave' },
  { attendance_id: 'ATT-206', employee_id: 'EMP-106', date: '2026-10-06', check_in: '09:35 AM', check_out: '05:30 PM', status: 'Late', notes: 'Traffic delay' },
  { attendance_id: 'ATT-207', employee_id: 'EMP-107', date: '2026-10-06', check_in: '07:00 AM', check_out: '03:30 PM', status: 'Present', notes: 'Shift completed' },
  { attendance_id: 'ATT-208', employee_id: 'EMP-108', date: '2026-10-06', check_in: '08:58 AM', check_out: '05:30 PM', status: 'Present', notes: 'Punctual' },
  { attendance_id: 'ATT-209', employee_id: 'EMP-109', date: '2026-10-06', check_in: '09:00 AM', check_out: '05:30 PM', status: 'Present', notes: 'Punctual' },
  { attendance_id: 'ATT-210', employee_id: 'EMP-110', date: '2026-10-06', check_in: '--', check_out: '--', status: 'On Leave', notes: 'Medical leave' },
  { attendance_id: 'ATT-211', employee_id: 'EMP-111', date: '2026-10-06', check_in: '10:50 PM', check_out: '07:30 AM', status: 'Present', notes: 'Night shift duty' },
  { attendance_id: 'ATT-212', employee_id: 'EMP-112', date: '2026-10-06', check_in: '--', check_out: '--', status: 'Absent', notes: 'Unexcused absence' }
];

export const INITIAL_LEAVE = [
  {
    leave_id: 'LV-301',
    employee_id: 'EMP-105',
    leave_type: 'Annual Leave',
    start_date: '2026-10-05',
    end_date: '2026-10-10',
    reason: 'Family vacation and personal leave.',
    status: 'Approved',
    applied_on: '2026-09-28'
  },
  {
    leave_id: 'LV-302',
    employee_id: 'EMP-110',
    leave_type: 'Sick Leave',
    start_date: '2026-10-06',
    end_date: '2026-10-07',
    reason: 'Fever and doctor appointment.',
    status: 'Approved',
    applied_on: '2026-10-05'
  },
  {
    leave_id: 'LV-303',
    employee_id: 'EMP-103',
    leave_type: 'Casual Leave',
    start_date: '2026-10-15',
    end_date: '2026-10-16',
    reason: 'Attending university alumni conference.',
    status: 'Pending',
    applied_on: '2026-10-04'
  },
  {
    leave_id: 'LV-304',
    employee_id: 'EMP-108',
    leave_type: 'Unpaid Leave',
    start_date: '2026-10-20',
    end_date: '2026-10-22',
    reason: 'Personal travel commitments.',
    status: 'Pending',
    applied_on: '2026-10-06'
  },
  {
    leave_id: 'LV-305',
    employee_id: 'EMP-102',
    leave_type: 'Casual Leave',
    start_date: '2026-09-12',
    end_date: '2026-09-13',
    reason: 'Household relocation.',
    status: 'Rejected',
    applied_on: '2026-09-10'
  }
];

export const INITIAL_ADMIN_USERS = [
  {
    user_id: 'USR-01',
    username: 'admin_master',
    email: 'admin.ems@university.edu',
    role: 'Super Admin',
    status: 'Active',
    last_login: '2026-10-06 17:42'
  },
  {
    user_id: 'USR-02',
    username: 'hr_lead',
    email: 'hr.director@university.edu',
    role: 'HR Manager',
    status: 'Active',
    last_login: '2026-10-06 14:15'
  },
  {
    user_id: 'USR-03',
    username: 'dbms_evaluator',
    email: 'evaluator@university.edu',
    role: 'System Auditor',
    status: 'Active',
    last_login: '2026-10-05 09:30'
  },
  {
    user_id: 'USR-04',
    username: 'guest_observer',
    email: 'guest@university.edu',
    role: 'Read-Only View',
    status: 'Inactive',
    last_login: '2026-09-20 11:00'
  }
];

export const INITIAL_ACTIVITY_LOGS = [
  {
    id: 'ACT-1',
    timestamp: '2026-10-06 17:30',
    action: 'INSERT',
    description: 'System initialized mock dataset for 6 logical DBMS tables.',
    user: 'System Admin'
  },
  {
    id: 'ACT-2',
    timestamp: '2026-10-06 16:15',
    action: 'UPDATE',
    description: 'Approved Sick Leave request LV-302 for Olivia Martinez (EMP-110).',
    user: 'HR Lead'
  },
  {
    id: 'ACT-3',
    timestamp: '2026-10-06 09:05',
    action: 'INSERT',
    description: 'Recorded today\'s attendance entry for 12 employees.',
    user: 'Attendance System'
  }
];
