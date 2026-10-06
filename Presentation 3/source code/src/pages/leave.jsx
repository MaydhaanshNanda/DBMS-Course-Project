import React, { useState, useMemo } from 'react';
import { FileText, Plus, Database } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import LeaveTable from '../components/leave/LeaveTable';
import RequestLeaveModal from '../components/leave/RequestLeaveModal';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import { useEMS } from '../context/EMSContext';

export const Leave = () => {
  const { leaveRequests, employees, requestLeave, updateLeaveStatus } = useEMS();
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const statusOptions = [
    { value: '', label: 'All Leave Statuses' },
    { value: 'Pending', label: 'Pending Approval' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Rejected', label: 'Rejected' }
  ];

  const filteredLeaves = useMemo(() => {
    return leaveRequests.filter((l) => {
      const emp = employees.find((e) => e.employee_id === l.employee_id);
      const empName = emp ? emp.name.toLowerCase() : '';

      const matchesSearch =
        searchTerm === '' ||
        l.leave_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.employee_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        empName.includes(searchTerm.toLowerCase()) ||
        l.leave_type.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === '' || l.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leaveRequests, employees, searchTerm, statusFilter]);

  const handleCreateLeave = (leaveData) => {
    requestLeave(leaveData);
  };

  const handleUpdateStatus = (leaveId, status) => {
    updateLeaveStatus(leaveId, status);
  };

  return (
    <DashboardLayout
      title="Leave Management"
      description="Track employee leave applications, approvals, and absences in the LEAVE database table"
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
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
              Connected to <strong style={{ color: 'var(--text-primary)' }}>LEAVE</strong> table entity.
            </span>
          </div>

          <Button variant="primary" icon={Plus} onClick={() => setIsRequestModalOpen(true)}>
            + Submit Leave Request
          </Button>
        </div>

        {/* Filter Bar */}
        <div className="card" style={{ padding: '1rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ minWidth: '200px' }}>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={statusOptions}
              placeholder={null}
            />
          </div>

          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Showing {filteredLeaves.length} of {leaveRequests.length} leave requests
          </div>
        </div>

        <LeaveTable
          leaveRequests={filteredLeaves}
          employees={employees}
          onUpdateStatus={handleUpdateStatus}
        />
      </div>

      <RequestLeaveModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onSubmit={handleCreateLeave}
        employees={employees}
      />
    </DashboardLayout>
  );
};

export default Leave;
