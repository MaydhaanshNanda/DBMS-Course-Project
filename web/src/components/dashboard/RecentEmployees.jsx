'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Eye } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export const RecentEmployees = ({ employees, onViewDetails }) => {
  const recentList = employees.slice(0, 5);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'On Leave':
        return 'warning';
      case 'Terminated':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div
        style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            Recent Employees
          </h3>
          <p style={{ fontSize: '0.785rem', color: 'var(--text-secondary)' }}>
            Latest added records in database
          </p>
        </div>

        <Link
          href="/employees"
          style={{
            fontSize: '0.8125rem',
            fontWeight: '600',
            color: 'var(--primary)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <span>View All</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentList.map((emp) => (
              <tr key={emp.employee_id}>
                <td style={{ fontWeight: '600', color: 'var(--primary)' }}>{emp.employee_id}</td>
                <td>
                  <div style={{ fontWeight: '600' }}>{emp.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{emp.email}</div>
                </td>
                <td>{emp.department}</td>
                <td>{emp.designation}</td>
                <td>
                  <Badge variant={getStatusVariant(emp.status)}>{emp.status}</Badge>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <Button
                    variant="icon"
                    size="sm"
                    onClick={() => onViewDetails(emp)}
                    title="View Details"
                  >
                    <Eye size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentEmployees;
