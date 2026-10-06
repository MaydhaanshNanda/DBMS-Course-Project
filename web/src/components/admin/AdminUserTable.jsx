import React from 'react';
import Badge from '../ui/Badge';

export const AdminUserTable = ({ adminUsers }) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username & Email</th>
            <th>System Role</th>
            <th>Status</th>
            <th>Last Login</th>
          </tr>
        </thead>
        <tbody>
          {adminUsers.map((user) => (
            <tr key={user.user_id}>
              <td style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>{user.user_id}</td>
              <td>
                <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{user.username}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</div>
              </td>
              <td>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    padding: '0.2rem 0.6rem',
                    backgroundColor: '#eff6ff',
                    color: '#1d4ed8',
                    borderRadius: '4px',
                    border: '1px solid #bfdbfe'
                  }}
                >
                  {user.role}
                </span>
              </td>
              <td>
                <Badge variant={user.status === 'Active' ? 'success' : 'neutral'}>{user.status}</Badge>
              </td>
              <td style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{user.last_login}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserTable;
