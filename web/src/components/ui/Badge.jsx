import React from 'react';

export const Badge = ({ children, variant = 'neutral', showDot = true, className = '' }) => {
  const variantClassMap = {
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
    info: 'badge-info',
    neutral: 'badge-neutral'
  };

  const badgeClass = variantClassMap[variant] || 'badge-neutral';

  return (
    <span className={`badge ${badgeClass} ${className}`}>
      {showDot && <span className="badge-dot" />}
      {children}
    </span>
  );
};

export default Badge;
