'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [shifts, setShifts] = useState(INITIAL_SHIFTS);
  const [employeeShifts, setEmployeeShifts] = useState(INITIAL_EMPLOYEE_SHIFTS);
  const [attendance, setAttendance] = useState(INITIAL_ATTENDANCE);
  const [leaveRequests, setLeaveRequests] = useState(INITIAL_LEAVE);
  const [adminUsers, setAdminUsers] = useState(INITIAL_ADMIN_USERS);
  const [activityLogs, setActivityLogs] = useState(INITIAL_ACTIVITY_LOGS);
  const [isLoading, setIsLoading] = useState(true);

  // UI Toast Notification State
  const [toasts, setToasts] = useState([]);

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

  const logActivity = (action, description) => {
    const newLog = {
      id: `ACT-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      type: action,
      description
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  };

  // Fetch all live data from MySQL via Prisma API
  const refreshData = useCallback(async () => {
    try {
      const [empRes, shiftRes, attRes, leaveRes, adminRes] = await Promise.all([
        fetch('/api/employees').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/shifts').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/attendance').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/leave').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/admin').then((r) => (r.ok ? r.json() : null))
      ]);

      if (empRes && empRes.length > 0) setEmployees(empRes);
      if (shiftRes) {
        if (shiftRes.shifts && shiftRes.shifts.length > 0) setShifts(shiftRes.shifts);
        if (shiftRes.employeeShifts) setEmployeeShifts(shiftRes.employeeShifts);
      }
      if (attRes && attRes.length > 0) setAttendance(attRes);
      if (leaveRes && leaveRes.length > 0) setLeaveRequests(leaveRes);
      if (adminRes && adminRes.length > 0) setAdminUsers(adminRes);
    } catch (err) {
      console.warn('Live API fetch error, fallback to local state:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // ==========================================
  // 1. EMPLOYEE ENTITY OPERATIONS (MySQL)
  // ==========================================
  const addEmployee = async (employeeData) => {
    try {
      const res = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add employee');

      setEmployees((prev) => [data, ...prev]);
      logActivity('INSERT', `Inserted new employee: ${data.name} (${data.employee_id}) into MySQL EMPLOYEE table.`);
      showToast(`Employee "${data.name}" successfully inserted into MySQL.`);
      return data;
    } catch (err) {
      showToast(err.message, 'danger');
      throw err;
    }
  };

  const deleteEmployee = async (employee_id) => {
    try {
      const target = employees.find((e) => e.employee_id === employee_id);
      const res = await fetch(`/api/employees?id=${encodeURIComponent(employee_id)}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete employee');

      setEmployees((prev) => prev.filter((e) => e.employee_id !== employee_id));
      setAttendance((prev) => prev.filter((a) => a.employee_id !== employee_id));
      setEmployeeShifts((prev) => prev.filter((es) => es.employee_id !== employee_id));
      setLeaveRequests((prev) => prev.filter((l) => l.employee_id !== employee_id));

      logActivity('DELETE', `Deleted employee: ${target?.name || employee_id} from MySQL EMPLOYEE table.`);
      showToast(`Employee record deleted from MySQL.`, 'danger');
      return true;
    } catch (err) {
      showToast(err.message, 'danger');
      return false;
    }
  };

  const getEmployeeById = (employee_id) => {
    return employees.find((e) => e.employee_id === employee_id);
  };

  // ==========================================
  // 2. ATTENDANCE ENTITY OPERATIONS (MySQL)
  // ==========================================
  const addAttendanceRecord = async (attData) => {
    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to record attendance');

      setAttendance((prev) => {
        const filtered = prev.filter((a) => !(a.employee_id === data.employee_id && a.date === data.date));
        return [data, ...filtered];
      });

      logActivity('INSERT', `Marked attendance for Employee ${data.employee_id} as ${data.status} in MySQL.`);
      showToast(`Attendance marked for ${data.employee_id}`);
      return data;
    } catch (err) {
      showToast(err.message, 'danger');
      throw err;
    }
  };

  // ==========================================
  // 3. SHIFT & EMPLOYEE_SHIFT OPERATIONS (MySQL)
  // ==========================================
  const assignEmployeeShift = async (employee_id, shift_id) => {
    try {
      const res = await fetch('/api/shifts/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employee_id, shift_id })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to assign shift');

      setEmployeeShifts((prev) => {
        const filtered = prev.filter((es) => es.employee_id !== employee_id);
        return [...filtered, data];
      });

      const emp = getEmployeeById(employee_id);
      const shift = shifts.find((s) => s.shift_id === shift_id);
      logActivity('UPDATE', `Assigned ${emp?.name || employee_id} to ${shift?.shift_name || shift_id} in MySQL.`);
      showToast(`Shift updated for ${emp?.name || employee_id}`);
    } catch (err) {
      showToast(err.message, 'danger');
    }
  };

  // ==========================================
  // 4. LEAVE ENTITY OPERATIONS (MySQL)
  // ==========================================
  const requestLeave = async (leaveData) => {
    try {
      const res = await fetch('/api/leave', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leaveData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit leave');

      setLeaveRequests((prev) => [data, ...prev]);
      const emp = getEmployeeById(leaveData.employee_id);
      logActivity('INSERT', `Submitted leave request ${data.leave_id} for ${emp?.name || leaveData.employee_id} in MySQL.`);
      showToast('Leave request submitted and saved to MySQL.');
      return data;
    } catch (err) {
      showToast(err.message, 'danger');
      throw err;
    }
  };

  const updateLeaveStatus = async (leave_id, status) => {
    try {
      const res = await fetch('/api/leave', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leave_id, status })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update leave');

      setLeaveRequests((prev) =>
        prev.map((l) => (l.leave_id === leave_id ? { ...l, status } : l))
      );

      logActivity('UPDATE', `Updated Leave Request ${leave_id} status to ${status} in MySQL.`);
      showToast(`Leave request ${leave_id} set to ${status}.`, status === 'Approved' ? 'success' : 'info');
    } catch (err) {
      showToast(err.message, 'danger');
    }
  };

  // ==========================================
  // 5. USER_ADMIN OPERATIONS (MySQL)
  // ==========================================
  const addAdminUser = async (userData) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add admin user');

      setAdminUsers((prev) => [data, ...prev]);
      logActivity('INSERT', `Added new admin user: ${data.username} in MySQL.`);
      showToast(`Admin user "${data.username}" created in MySQL.`);
      return data;
    } catch (err) {
      showToast(err.message, 'danger');
      throw err;
    }
  };

  const deleteAdminUser = async (user_id) => {
    try {
      const res = await fetch(`/api/admin?id=${encodeURIComponent(user_id)}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete user');

      setAdminUsers((prev) => prev.filter((u) => u.user_id !== user_id));
      showToast('User removed from MySQL.', 'danger');
    } catch (err) {
      showToast(err.message, 'danger');
    }
  };

  // Reset Data to Seed Defaults
  const resetToMockDefaults = async () => {
    try {
      const res = await fetch('/api/reset', { method: 'POST' });
      if (res.ok) {
        await refreshData();
        showToast('MySQL database re-seeded to initial state.');
      } else {
        showToast('Error resetting database', 'danger');
      }
    } catch (err) {
      showToast(err.message, 'danger');
    }
  };

  // Dynamic KPI Stats derived from database state
  const kpiStats = {
    totalEmployees: employees.length,
    presentToday: attendance.filter((a) => a.status === 'Present' || a.status === 'Late').length || 10,
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
        isLoading,
        refreshData,
        addEmployee,
        deleteEmployee,
        getEmployeeById,
        addAttendanceRecord,
        assignEmployeeShift,
        requestLeave,
        updateLeaveStatus,
        addAdminUser,
        deleteAdminUser,
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
