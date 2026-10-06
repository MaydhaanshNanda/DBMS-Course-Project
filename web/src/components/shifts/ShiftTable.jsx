import React from 'react';
import Badge from '../ui/Badge';

export const ShiftTable = ({ employeeShifts, employees, shifts }) => {
  const getEmpName = (empId) => {
    const emp = employees.find((e) => e.employee_id === empId);
    return emp ? emp.name : empId;
  };

  const getEmpDept = (empId) => {
    const emp = employees.find((e) => e.employee_id === empId);
    return emp ? emp.department : 'General';
  };

  const getShiftName = (shiftId) => {
    const s = shifts.find((sh) => sh.shift_id === shiftId);
    return s ? `${s.shift_name} (${s.start_time} - ${s.end_time})` : shiftId;
  };

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Assignment ID</th>
            <th>Employee</th>
            <th>Assigned Shift</th>
            <th>Effective Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {employeeShifts.map((es) => (
            <tr key={es.assignment_id}>
              <td style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>{es.assignment_id}</td>
              <td>
                <div style={{ fontWeight: '600' }}>{getEmpName(es.employee_id)}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  ID: {es.employee_id} &bull; {getEmpDept(es.employee_id)}
                </div>
              </td>
              <td style={{ fontWeight: '600', color: 'var(--primary)' }}>{getShiftName(es.shift_id)}</td>
              <td>{es.effective_date}</td>
              <td>
                <Badge variant={es.status === 'Assigned' ? 'success' : 'neutral'}>{es.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShiftTable;
