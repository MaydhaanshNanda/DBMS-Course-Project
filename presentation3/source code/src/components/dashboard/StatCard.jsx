import React from 'react';

export const StatCard = ({ title, value, subtext, icon: Icon, color = 'blue', trend }) => {
  const colorMap = {
    blue: { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe' },
    green: { bg: '#ecfdf5', color: '#059669', border: '#a7f3d0' },
    amber: { bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
    orange: { bg: 'rgba(249, 115, 22, 0.14)', color: '#f97316', border: 'rgba(249, 115, 22, 0.3)' },
    purple: { bg: 'rgba(249, 115, 22, 0.14)', color: '#f97316', border: 'rgba(249, 115, 22, 0.3)' },
    rose: { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' }
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
