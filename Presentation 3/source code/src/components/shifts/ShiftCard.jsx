import React from 'react';
import { Clock, Users, Calendar } from 'lucide-react';
import Badge from '../ui/Badge';

export const ShiftCard = ({ shift, assignedEmployees }) => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <Badge variant="info">{shift.shift_id}</Badge>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Users size={14} />
          <span>{assignedEmployees.length} Assigned</span>
        </div>
      </div>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
        {shift.shift_name}
      </h3>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: '600',
          color: 'var(--primary)',
          marginBottom: '0.75rem'
        }}
      >
        <Clock size={16} />
        <span>
          {shift.start_time} — {shift.end_time}
        </span>
      </div>

      <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: '1.4', flex: 1, marginBottom: '1rem' }}>
        {shift.description}
      </p>

      {/* Assigned Employees Avatars/Tags */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
        <p style={{ fontSize: '0.725rem', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          Assigned Personnel ({assignedEmployees.length})
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {assignedEmployees.length > 0 ? (
            assignedEmployees.slice(0, 5).map((emp) => (
              <span
                key={emp.employee_id}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.2rem 0.5rem',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '4px',
                  color: 'var(--text-primary)',
                  fontWeight: '500'
                }}
              >
                {emp.name}
              </span>
            ))
          ) : (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', italic: 'true' }}>
              No employees assigned
            </span>
          )}
          {assignedEmployees.length > 5 && (
            <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', backgroundColor: '#e2e8f0', borderRadius: '4px', color: 'var(--text-secondary)', fontWeight: '600' }}>
              +{assignedEmployees.length - 5} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShiftCard;
