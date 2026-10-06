'use client';

import React from 'react';
import { Menu, Search, Database } from 'lucide-react';

export const Header = ({ title, description, onToggleMobile, searchTerm, onSearchChange }) => {
  return (
    <header
      style={{
        height: '70px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        flexShrink: 0,
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
        zIndex: 10
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onToggleMobile}
          className="btn-icon mobile-menu-btn"
          aria-label="Open navigation menu"
          type="button"
        >
          <Menu size={22} />
        </button>

        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            {title}
          </h2>
          {description && (
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
              {description}
            </p>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Global/Page Search input if provided */}
        {onSearchChange !== undefined && (
          <div style={{ position: 'relative', width: '240px' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94a3b8'
              }}
            />
            <input
              type="text"
              placeholder="Quick search..."
              value={searchTerm || ''}
              onChange={(e) => onSearchChange(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: '2.25rem',
                fontSize: '0.8125rem',
                height: '36px'
              }}
            />
          </div>
        )}

        {/* Database Status Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#f8fafc',
            border: '1px solid var(--border-color)',
            padding: '0.35rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.785rem',
            fontWeight: '500',
            color: 'var(--text-secondary)'
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)'
            }}
          />
          <Database size={13} style={{ color: '#0284c7' }} />
          <span>System Online</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
