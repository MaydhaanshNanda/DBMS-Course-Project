import React, { useState } from 'react';
import { ShieldCheck, UserPlus, Database } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import AdminUserTable from '../components/admin/AdminUserTable';
import AddAdminUserModal from '../components/admin/AddAdminUserModal';
import Button from '../components/ui/Button';
import { useEMS } from '../context/EMSContext';

export const Admin = () => {
  const { adminUsers, addAdminUser } = useEMS();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleCreateUser = (userData) => {
    addAdminUser(userData);
  };

  return (
    <DashboardLayout
      title="Admin & System Users"
      description="Administrative user privileges and access control records (USER_ADMIN table)"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Banner */}
        <div
          style={{
            padding: '0.85rem 1.25rem',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <Database size={16} style={{ color: 'var(--primary)' }} />
            <span>
              Connected to <strong style={{ color: 'var(--text-primary)' }}>USER_ADMIN</strong> database table entity.
            </span>
          </div>

          <Button variant="primary" icon={UserPlus} onClick={() => setIsAddModalOpen(true)}>
            + Add System Admin User
          </Button>
        </div>

        <AdminUserTable adminUsers={adminUsers} />
      </div>

      <AddAdminUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateUser}
      />
    </DashboardLayout>
  );
};

export default Admin;
