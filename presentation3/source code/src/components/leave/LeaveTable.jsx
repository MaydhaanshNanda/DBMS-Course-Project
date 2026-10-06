import React from 'react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { CheckCircle, XCircle } from 'lucide-react';

export const LeaveTable = ({ leaveRequests, employees, onUpdateStatus }) => {
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
      case 'Approved':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Rejected':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  if (!leaveRequests || leaveRequests.length === 0) {
    return (
      <div className="card table-empty">
        <p style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
          No leave requests recorded.
        </p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Leave ID</th>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>Duration</th>
            <th>Reason</th>
            <th>Applied On</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((l) => (
            <tr key={l.leave_id}>
              <td style={{ fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
                {l.leave_id}
              </td>
              <td>
                <div style={{ fontWeight: '600' }}>{getEmpName(l.employee_id)}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  ID: {l.employee_id} &bull; {getEmpDept(l.employee_id)}
                </div>
              </td>
              <td style={{ fontWeight: '500' }}>{l.leave_type}</td>
              <td style={{ fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                {l.start_date} <span style={{ color: 'var(--text-muted)' }}>to</span> {l.end_date}
              </td>
              <td style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', maxWidth: '220px' }}>
                {l.reason}
              </td>
              <td style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{l.applied_on}</td>
              <td>
                <Badge variant={getStatusVariant(l.status)}>{l.status}</Badge>
              </td>
              <td style={{ textAlign: 'right' }}>
                {l.status === 'Pending' ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.35rem' }}>
                    <Button
                      variant="sm"
                      onClick={() => onUpdateStatus(l.leave_id, 'Approved')}
                      style={{ backgroundColor: '#16a34a', color: '#ffffff', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                      title="Approve Request"
                    >
                      <CheckCircle size={14} /> Approve
                    </Button>
                    <Button
                      variant="sm"
                      onClick={() => onUpdateStatus(l.leave_id, 'Rejected')}
                      style={{ backgroundColor: '#dc2626', color: '#ffffff', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                      title="Reject Request"
                    >
                      <XCircle size={14} /> Reject
                    </Button>
                  </div>
                ) : (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Decided</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveTable;
