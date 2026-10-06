import React from 'react';

export const StatCard = ({ title, value, subtext, icon: Icon, color = 'blue', trend }) => {
  const colorMap = {
    blue: { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe' },
    green: { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
    amber: { bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
    purple: { bg: '#faf5ff', color: '#9333ea', border: '#e9d5ff' },
    rose: { bg: '#fff1f2', color: '#e11d48', border: '#fecdd3' }
  };

  const theme = colorMap[color] || colorMap.blue;

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
          {title}
        </span>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: theme.bg,
            color: theme.color,
            border: `1px solid ${theme.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {Icon && <Icon size={20} />}
        </div>
      </div>

      <div style={{ marginTop: '0.75rem' }}>
        <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          {value}
        </div>
        {subtext && (
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
