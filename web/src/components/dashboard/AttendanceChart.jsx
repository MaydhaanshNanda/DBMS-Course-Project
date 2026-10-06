import React from 'react';
import { UserCheck, Clock, Calendar, UserX } from 'lucide-react';

export const AttendanceChart = ({ attendanceRecords, totalEmployees }) => {
  const presentCount = attendanceRecords.filter((a) => a.status === 'Present').length;
  const lateCount = attendanceRecords.filter((a) => a.status === 'Late').length;
  const leaveCount = attendanceRecords.filter((a) => a.status === 'On Leave').length;
  const absentCount = attendanceRecords.filter((a) => a.status === 'Absent').length;

  const totalTracked = presentCount + lateCount + leaveCount + absentCount || 1;

  const presentPct = Math.round((presentCount / totalTracked) * 100);
  const latePct = Math.round((lateCount / totalTracked) * 100);
  const leavePct = Math.round((leaveCount / totalTracked) * 100);
  const absentPct = Math.round((absentCount / totalTracked) * 100);

  return (
    <div className="card">
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
          Attendance Overview
        </h3>
        <p style={{ fontSize: '0.785rem', color: 'var(--text-secondary)' }}>
          Today's workforce status breakdown
        </p>
      </div>

      {/* Progress Bar Breakdown */}
      <div
        style={{
          height: '14px',
          width: '100%',
          backgroundColor: '#e2e8f0',
          borderRadius: '9999px',
          display: 'flex',
          overflow: 'hidden',
          marginBottom: '1.25rem'
        }}
      >
        <div style={{ width: `${presentPct}%`, backgroundColor: '#10b981' }} title={`Present: ${presentPct}%`} />
        <div style={{ width: `${latePct}%`, backgroundColor: '#f59e0b' }} title={`Late: ${latePct}%`} />
        <div style={{ width: `${leavePct}%`, backgroundColor: '#3b82f6' }} title={`On Leave: ${leavePct}%`} />
        <div style={{ width: `${absentPct}%`, backgroundColor: '#ef4444' }} title={`Absent: ${absentPct}%`} />
      </div>

      {/* Breakdown Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem'
          }}
        >
          <UserCheck size={18} style={{ color: '#16a34a' }} />
          <div>
            <div style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: '500' }}>Present</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#14532d' }}>{presentCount}</div>
          </div>
        </div>

        <div
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            backgroundColor: '#fffbeb',
            border: '1px solid #fde68a',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem'
          }}
        >
          <Clock size={18} style={{ color: '#d97706' }} />
          <div>
            <div style={{ fontSize: '0.75rem', color: '#b45309', fontWeight: '500' }}>Late Arrival</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#78350f' }}>{lateCount}</div>
          </div>
        </div>

        <div
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem'
          }}
        >
          <Calendar size={18} style={{ color: '#2563eb' }} />
          <div>
            <div style={{ fontSize: '0.75rem', color: '#1d4ed8', fontWeight: '500' }}>On Leave</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e40af' }}>{leaveCount}</div>
          </div>
        </div>

        <div
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem'
          }}
        >
          <UserX size={18} style={{ color: '#dc2626' }} />
          <div>
            <div style={{ fontSize: '0.75rem', color: '#b91c1c', fontWeight: '500' }}>Absent</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#7f1d1d' }}>{absentCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;
