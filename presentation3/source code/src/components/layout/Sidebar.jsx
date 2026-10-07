'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Clock,
  CalendarRange,
  FileText,
  ShieldCheck,
  Database,
  Building2,
  X
} from 'lucide-react';

export const Sidebar = ({ isMobileOpen, onCloseMobile }) => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Employees', path: '/employees', icon: Users },
    { name: 'Attendance', path: '/attendance', icon: Clock },
    { name: 'Shifts', path: '/shifts', icon: CalendarRange },
    { name: 'Leave Management', path: '/leave', icon: FileText },
    { name: 'Admin / Users', path: '/admin', icon: ShieldCheck }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            zIndex: 900
          }}
        />
      )}

      <aside className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Brand Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--sidebar-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 12px var(--primary-glow)'
              }}
            >
              <Building2 size={20} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.05rem', fontWeight: '700', letterSpacing: '-0.02em', color: '#ffffff' }}>
                EMS Portal
              </h1>
              <p style={{ fontSize: '0.725rem', color: '#94a3b8' }}>DBMS Course Project</p>
            </div>
          </div>

          {isMobileOpen && (
            <button
              onClick={onCloseMobile}
              style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Database Status Tag */}
        <div style={{ padding: '0.85rem 1.25rem 0.5rem 1.25rem' }}>
          <div
            style={{
              padding: '0.45rem 0.75rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--sidebar-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.75rem',
              color: '#cbd5e1'
            }}
          >
            <Database size={14} style={{ color: '#60a5fa' }} />
            <span style={{ fontWeight: '500' }}>Local MySQL / Prisma</span>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--success-dot)',
                boxShadow: '0 0 6px rgba(16, 185, 129, 0.7)',
                marginLeft: 'auto'
              }}
            />
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ flex: 1, padding: '0.75rem 1rem', overflowY: 'auto' }}>
          <p
            style={{
              fontSize: '0.7rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#64748b',
              padding: '0.5rem 0.75rem'
            }}
          >
            Navigation
          </p>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={() => isMobileOpen && onCloseMobile()}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: isActive ? '600' : '400',
                      color: isActive ? '#ffffff' : '#94a3b8',
                      backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                      boxShadow: isActive ? '0 2px 8px var(--primary-glow)' : 'none',
                      transition: 'all 150ms ease-in-out'
                    }}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div
          style={{
            padding: '1.25rem',
            borderTop: '1px solid var(--sidebar-border)'
          }}
        >
          {/* User Profile Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                fontSize: '0.85rem',
                boxShadow: '0 2px 6px var(--primary-glow)'
              }}
            >
              AD
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: '600',
                  color: '#f8fafc',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                Admin Evaluator
              </p>
              <p
                style={{
                  fontSize: '0.725rem',
                  color: '#64748b',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                DBMS Presentation
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
