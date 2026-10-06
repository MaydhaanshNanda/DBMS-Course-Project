import React from 'react';
import { Eye, Trash2 } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export const EmployeeTable = ({ employees, onView, onDelete }) => {
  const getStatusVariant = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'On Leave':
        return 'warning';
      case 'Terminated':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  if (!employees || employees.length === 0) {
    return (
      <div className="card table-empty">
        <p style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
          No employee records found.
        </p>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          Try clearing search filters or click "+ Add Employee" to insert a new record.
        </p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name & Contact</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Join Date</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>DBMS Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.employee_id}>
              <td style={{ fontWeight: '700', color: 'var(--primary)' }}>{emp.employee_id}</td>
              <td>
                <div style={{ fontWeight: '600' }}>{emp.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{emp.email}</div>
              </td>
              <td style={{ fontWeight: '500' }}>{emp.department}</td>
              <td>{emp.designation}</td>
              <td style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{emp.join_date}</td>
              <td>
                <Badge variant={getStatusVariant(emp.status)}>{emp.status}</Badge>
              </td>
              <td style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.35rem' }}>
                  <Button
                    variant="icon"
                    size="sm"
                    onClick={() => onView(emp)}
                    title="View Details (DBMS SELECT)"
                  >
                    <Eye size={16} />
                  </Button>
                  <Button
                    variant="icon"
                    size="sm"
                    onClick={() => onDelete(emp)}
                    title="Delete Record (DBMS DELETE)"
                    style={{ color: '#ef4444' }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
