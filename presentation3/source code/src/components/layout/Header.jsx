'use client';

import React, { useState, useEffect } from 'react';
import { Menu, Search, Database, Sun, Moon } from 'lucide-react';

export const Header = ({ title, description, onToggleMobile, searchTerm, onSearchChange }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('ems-theme');
    if (saved) {
      setIsDark(saved === 'dark');
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ems-theme', next);
  };

  return (
    <header
      style={{
        height: '70px',
        backgroundColor: 'var(--header-bg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        flexShrink: 0,
        boxShadow: 'var(--shadow-xs)',
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
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
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
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            fontSize: '0.785rem',
            fontWeight: '600',
            color: 'var(--text-secondary)',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--success-dot)',
              boxShadow: '0 0 10px rgba(16, 185, 129, 0.65)'
            }}
          />
          <Database size={13} style={{ color: 'var(--primary)' }} />
          <span>System Online</span>
        </div>

        {/* Theme Mode Toggle */}
        <button
          onClick={toggleTheme}
          type="button"
          title={isDark ? "Switch to Light Theme (Porcelain)" : "Switch to Dark Theme (Executive Obsidian)"}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '9999px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-xs)',
            transition: 'all 150ms ease'
          }}
        >
          {isDark ? (
            <Sun size={17} style={{ color: '#fbbf24' }} />
          ) : (
            <Moon size={17} style={{ color: '#f97316' }} />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
