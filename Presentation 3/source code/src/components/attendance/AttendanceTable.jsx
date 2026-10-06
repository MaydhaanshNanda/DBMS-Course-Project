import React from 'react';
import Badge from '../ui/Badge';

export const AttendanceTable = ({ attendanceRecords, employees }) => {
  const getEmpName = (empId) => {
    const emp = employees.find((e) => e.employee_id === empId);
    return emp ? emp.name : empId;
  };

  const getEmpDept = (empId) => {
    const emp = employees.find((e) => e.employee_id === empId);
    return emp ? emp.department : 'General';
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Present':
        return 'success';
      case 'Late':
        return 'warning';
      case 'On Leave':
        return 'info';
      case 'Absent':
        return 'danger';
      case 'Half Day':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  if (!attendanceRecords || attendanceRecords.length === 0) {
    return (
      <div className="card table-empty">
        <p style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
          No attendance records found.
        </p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Attendance ID</th>
            <th>Employee Name</th>
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
            <th>Notes / Remarks</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((att) => (
            <tr key={att.attendance_id}>
              <td style={{ fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
                {att.attendance_id}
              </td>
              <td>
                <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{getEmpName(att.employee_id)}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  ID: {att.employee_id} &bull; {getEmpDept(att.employee_id)}
                </div>
              </td>
              <td style={{ fontWeight: '500' }}>{att.date}</td>
              <td style={{ color: att.check_in === '--' ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                {att.check_in}
              </td>
              <td style={{ color: att.check_out === '--' ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                {att.check_out}
              </td>
              <td>
                <Badge variant={getStatusVariant(att.status)}>{att.status}</Badge>
              </td>
              <td style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                {att.notes || '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
