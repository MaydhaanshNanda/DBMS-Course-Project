import React from 'react';
import { PlusCircle, Trash2, Edit3, Activity } from 'lucide-react';

export const ActivityFeed = ({ logs }) => {
  const getActionIcon = (action) => {
    switch (action) {
      case 'INSERT':
        return <PlusCircle size={16} style={{ color: '#16a34a' }} />;
      case 'DELETE':
        return <Trash2 size={16} style={{ color: '#dc2626' }} />;
      case 'UPDATE':
        return <Edit3 size={16} style={{ color: '#2563eb' }} />;
      default:
        return <Activity size={16} style={{ color: '#64748b' }} />;
    }
  };

  const getActionBadge = (action) => {
    switch (action) {
      case 'INSERT':
        return <span className="badge badge-success">INSERT</span>;
      case 'DELETE':
        return <span className="badge badge-danger">DELETE</span>;
      case 'UPDATE':
        return <span className="badge badge-info">UPDATE</span>;
      default:
        return <span className="badge badge-neutral">LOG</span>;
    }
  };

  return (
    <div className="card">
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
          Recent Activity & DBMS Logs
        </h3>
        <p style={{ fontSize: '0.785rem', color: 'var(--text-secondary)' }}>
          Real-time record insertions, deletions & mutations
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '340px', overflowY: 'auto' }}>
        {logs.slice(0, 8).map((log) => (
          <div
            key={log.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              paddingBottom: '0.85rem',
              borderBottom: '1px solid var(--border-subtle)'
            }}
          >
            <div
              style={{
                padding: '0.4rem',
                borderRadius: '6px',
                backgroundColor: '#f8fafc',
                border: '1px solid var(--border-color)',
                marginTop: '0.1rem'
              }}
            >
              {getActionIcon(log.action)}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                {getActionBadge(log.action)}
                <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{log.timestamp}</span>
              </div>
              <p
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--text-primary)',
                  lineHeight: '1.4',
                  wordBreak: 'break-word'
                }}
              >
                {log.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
