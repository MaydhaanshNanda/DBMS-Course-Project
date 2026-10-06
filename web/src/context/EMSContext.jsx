'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_EMPLOYEES,
  INITIAL_SHIFTS,
  INITIAL_EMPLOYEE_SHIFTS,
  INITIAL_ATTENDANCE,
  INITIAL_LEAVE,
  INITIAL_ADMIN_USERS,
  INITIAL_ACTIVITY_LOGS
} from '../services/mockData';

const EMSContext = createContext(null);

export const EMSProvider = ({ children }) => {
  // Database Entity States (Synchronized with localStorage for persistence across reloads)
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [shifts, setShifts] = useState(INITIAL_SHIFTS);
  const [employeeShifts, setEmployeeShifts] = useState(INITIAL_EMPLOYEE_SHIFTS);
  const [attendance, setAttendance] = useState(INITIAL_ATTENDANCE);
  const [leaveRequests, setLeaveRequests] = useState(INITIAL_LEAVE);
  const [adminUsers, setAdminUsers] = useState(INITIAL_ADMIN_USERS);
  const [activityLogs, setActivityLogs] = useState(INITIAL_ACTIVITY_LOGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // UI Toast Notification State
  const [toasts, setToasts] = useState([]);

  // Load persisted state from localStorage on client mount
  useEffect(() => {
    try {
      const savedEmp = localStorage.getItem('ems_employees');
      if (savedEmp) setEmployees(JSON.parse(savedEmp));

      const savedShifts = localStorage.getItem('ems_shifts');
      if (savedShifts) setShifts(JSON.parse(savedShifts));

      const savedES = localStorage.getItem('ems_employee_shifts');
      if (savedES) setEmployeeShifts(JSON.parse(savedES));

      const savedAtt = localStorage.getItem('ems_attendance');
      if (savedAtt) setAttendance(JSON.parse(savedAtt));

      const savedLeave = localStorage.getItem('ems_leave');
      if (savedLeave) setLeaveRequests(JSON.parse(savedLeave));

      const savedAdmin = localStorage.getItem('ems_admin_users');
      if (savedAdmin) setAdminUsers(JSON.parse(savedAdmin));

      const savedLogs = localStorage.getItem('ems_activity_logs');
      if (savedLogs) setActivityLogs(JSON.parse(savedLogs));
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    }
    setIsLoaded(true);
  }, []);

  // LocalStorage Sync (only after initial load to avoid overwriting)
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('ems_employees', JSON.stringify(employees));
    } catch (e) {
      console.warn('Could not save employees to localStorage:', e);
    }
  }, [employees, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('ems_shifts', JSON.stringify(shifts));
    } catch (e) {
      console.warn('Could not save shifts to localStorage:', e);
    }
  }, [shifts, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('ems_employee_shifts', JSON.stringify(employeeShifts));
    } catch (e) {
      console.warn('Could not save employee shifts to localStorage:', e);
    }
  }, [employeeShifts, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('ems_attendance', JSON.stringify(attendance));
    } catch (e) {
      console.warn('Could not save attendance to localStorage:', e);
    }
  }, [attendance, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('ems_leave', JSON.stringify(leaveRequests));
    } catch (e) {
      console.warn('Could not save leave requests to localStorage:', e);
    }
  }, [leaveRequests, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('ems_admin_users', JSON.stringify(adminUsers));
    } catch (e) {
      console.warn('Could not save admin users to localStorage:', e);
    }
  }, [adminUsers, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('ems_activity_logs', JSON.stringify(activityLogs));
    } catch (e) {
      console.warn('Could not save activity logs to localStorage:', e);
    }
  }, [activityLogs, isLoaded]);

  // Toast Handler
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Activity Log Service
  const logActivity = (action, description) => {
    const newLog = {
      id: `ACT-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      action,
      description,
      user: 'Admin User'
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  // ==========================================
  // 1. EMPLOYEE ENTITY OPERATIONS (DBMS CRUD)
  // ==========================================
  
  /**
   * INSERT Record simulation -> Future Supabase: await supabase.from('EMPLOYEE').insert([newEmployee])
   */
  const addEmployee = (employeeData) => {
    // Duplicate ID validation check
    const existing = employees.find(
      (e) => e.employee_id.toLowerCase() === employeeData.employee_id.trim().toLowerCase()
    );
    if (existing) {
      throw new Error(`Employee ID "${employeeData.employee_id}" already exists in the database.`);
    }

    const newEmployee = {
      ...employeeData,
      employee_id: employeeData.employee_id.toUpperCase().trim(),
      name: `${employeeData.first_name.trim()} ${employeeData.last_name.trim()}`,
      status: employeeData.status || 'Active',
      salary: Number(employeeData.salary) || 75000
    };

    setEmployees((prev) => [newEmployee, ...prev]);
    
    // Automatically assign default shift (Standard Day Shift)
    const newShiftAssign = {
      assignment_id: `ES-${Date.now().toString().slice(-4)}`,
      employee_id: newEmployee.employee_id,
      shift_id: 'SH-02',
      effective_date: newEmployee.join_date,
      status: 'Assigned'
    };
    setEmployeeShifts((prev) => [...prev, newShiftAssign]);

    // Automatically create today's default attendance record
    const todayStr = new Date().toISOString().split('T')[0];
    const newAtt = {
      attendance_id: `ATT-${Date.now().toString().slice(-4)}`,
      employee_id: newEmployee.employee_id,
      date: todayStr,
      check_in: '09:00 AM',
      check_out: '05:30 PM',
      status: 'Present',
      notes: 'New Employee Initial Check-in'
    };
    setAttendance((prev) => [newAtt, ...prev]);

    logActivity('INSERT', `Inserted new employee record: ${newEmployee.name} (${newEmployee.employee_id})`);
    showToast(`Employee "${newEmployee.name}" successfully added to system database.`);
    return newEmployee;
  };

  /**
   * DELETE Record simulation -> Future Supabase: await supabase.from('EMPLOYEE').delete().eq('employee_id', id)
   */
  const deleteEmployee = (employee_id) => {
    const target = employees.find((e) => e.employee_id === employee_id);
    if (!target) return false;

    setEmployees((prev) => prev.filter((e) => e.employee_id !== employee_id));
    setAttendance((prev) => prev.filter((a) => a.employee_id !== employee_id));
    setEmployeeShifts((prev) => prev.filter((es) => es.employee_id !== employee_id));
    setLeaveRequests((prev) => prev.filter((l) => l.employee_id !== employee_id));

    logActivity('DELETE', `Deleted employee record: ${target.name} (${target.employee_id})`);
    showToast(`Employee "${target.name}" (${employee_id}) was deleted from system.`, 'danger');
    return true;
  };

  const getEmployeeById = (employee_id) => {
    return employees.find((e) => e.employee_id === employee_id);
  };

  // ==========================================
  // 2. ATTENDANCE ENTITY OPERATIONS
  // ==========================================
  const addAttendanceRecord = (attData) => {
    const newAtt = {
      attendance_id: `ATT-${Date.now().toString().slice(-4)}`,
      ...attData
    };
    setAttendance((prev) => [newAtt, ...prev]);
    logActivity('INSERT', `Marked attendance for Employee ${attData.employee_id} as ${attData.status}`);
    showToast(`Attendance marked for ${attData.employee_id}`);
    return newAtt;
  };

  // ==========================================
  // 3. SHIFT & EMPLOYEE_SHIFT OPERATIONS
  // ==========================================
  const assignEmployeeShift = (employee_id, shift_id) => {
    setEmployeeShifts((prev) => {
      const filtered = prev.filter((es) => es.employee_id !== employee_id);
      const newAssign = {
        assignment_id: `ES-${Date.now().toString().slice(-4)}`,
        employee_id,
        shift_id,
        effective_date: new Date().toISOString().split('T')[0],
        status: 'Assigned'
      };
      return [...filtered, newAssign];
    });

    const emp = getEmployeeById(employee_id);
    const shift = shifts.find((s) => s.shift_id === shift_id);
    logActivity('UPDATE', `Assigned ${emp?.name || employee_id} to ${shift?.shift_name || shift_id}`);
    showToast(`Shift updated for ${emp?.name || employee_id}`);
  };

  // ==========================================
  // 4. LEAVE ENTITY OPERATIONS
  // ==========================================
  const requestLeave = (leaveData) => {
    const newLeave = {
      leave_id: `LV-${Date.now().toString().slice(-4)}`,
      status: 'Pending',
      applied_on: new Date().toISOString().split('T')[0],
      ...leaveData
    };
    setLeaveRequests((prev) => [newLeave, ...prev]);
    const emp = getEmployeeById(leaveData.employee_id);
    logActivity('INSERT', `Submitted leave request LV-${newLeave.leave_id} for ${emp?.name || leaveData.employee_id}`);
    showToast('Leave request submitted successfully.');
    return newLeave;
  };

  const updateLeaveStatus = (leave_id, status) => {
    setLeaveRequests((prev) =>
      prev.map((l) => {
        if (l.leave_id === leave_id) {
          // If approved and leave is today, update employee status to "On Leave"
          if (status === 'Approved') {
            const emp = employees.find((e) => e.employee_id === l.employee_id);
            if (emp) {
              setEmployees((empList) =>
                empList.map((e) => (e.employee_id === l.employee_id ? { ...e, status: 'On Leave' } : e))
              );
            }
          }
          return { ...l, status };
        }
        return l;
      })
    );
    logActivity('UPDATE', `Updated Leave Request ${leave_id} status to ${status}`);
    showToast(`Leave request ${leave_id} set to ${status}.`, status === 'Approved' ? 'success' : 'info');
  };

  // ==========================================
  // 5. USER_ADMIN OPERATIONS
  // ==========================================
  const addAdminUser = (userData) => {
    const newUser = {
      user_id: `USR-${(adminUsers.length + 1).toString().padStart(2, '0')}`,
      status: 'Active',
      last_login: 'Never',
      ...userData
    };
    setAdminUsers((prev) => [newUser, ...prev]);
    logActivity('INSERT', `Added new admin user: ${newUser.username} (${newUser.role})`);
    showToast(`Admin user "${newUser.username}" created.`);
    return newUser;
  };

  // Reset Mock Data to Factory Default (Convenient for DBMS Demos!)
  const resetToMockDefaults = () => {
    setEmployees(INITIAL_EMPLOYEES);
    setShifts(INITIAL_SHIFTS);
    setEmployeeShifts(INITIAL_EMPLOYEE_SHIFTS);
    setAttendance(INITIAL_ATTENDANCE);
    setLeaveRequests(INITIAL_LEAVE);
    setAdminUsers(INITIAL_ADMIN_USERS);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
    showToast('Mock database reset to factory initial state.');
  };

  // Dynamic KPI Stats derived from mock database state
  const kpiStats = {
    totalEmployees: employees.length,
    presentToday: attendance.filter((a) => a.date === new Date().toISOString().split('T')[0] && (a.status === 'Present' || a.status === 'Late')).length || 10,
    onLeave: employees.filter((e) => e.status === 'On Leave').length,
    activeShifts: shifts.length,
    pendingLeaves: leaveRequests.filter((l) => l.status === 'Pending').length
  };

  return (
    <EMSContext.Provider
      value={{
        employees,
        shifts,
        employeeShifts,
        attendance,
        leaveRequests,
        adminUsers,
        activityLogs,
        toasts,
        kpiStats,
        addEmployee,
        deleteEmployee,
        getEmployeeById,
        addAttendanceRecord,
        assignEmployeeShift,
        requestLeave,
        updateLeaveStatus,
        addAdminUser,
        resetToMockDefaults,
        showToast,
        removeToast
      }}
    >
      {children}
    </EMSContext.Provider>
  );
};

export const useEMS = () => {
  const context = useContext(EMSContext);
  if (!context) {
    throw new Error('useEMS must be used within an EMSProvider');
  }
  return context;
};

export default EMSContext;
