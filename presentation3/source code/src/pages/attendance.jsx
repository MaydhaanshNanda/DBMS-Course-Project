import React, { useState, useMemo } from 'react';
import { Clock, Plus, Filter, Database } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import AttendanceTable from '../components/attendance/AttendanceTable';
import AttendanceForm from '../components/attendance/AttendanceForm';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import Input from '../components/ui/Input';
import { useEMS } from '../context/EMSContext';

export const Attendance = () => {
  const { attendance, employees, addAttendanceRecord } = useEMS();

  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'Present', label: 'Present' },
    { value: 'Late', label: 'Late' },
    { value: 'On Leave', label: 'On Leave' },
    { value: 'Absent', label: 'Absent' },
    { value: 'Half Day', label: 'Half Day' }
  ];

  const filteredAttendance = useMemo(() => {
    return attendance.filter((att) => {
      const emp = employees.find((e) => e.employee_id === att.employee_id);
      const empName = emp ? emp.name.toLowerCase() : '';

      const matchesSearch =
        searchTerm === '' ||
        att.employee_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        empName.includes(searchTerm.toLowerCase());

      const matchesDate = dateFilter === '' || att.date === dateFilter;
      const matchesStatus = statusFilter === '' || att.status === statusFilter;

      return matchesSearch && matchesDate && matchesStatus;
    });
  }, [attendance, employees, searchTerm, dateFilter, statusFilter]);

  const handleAddSubmit = (attData) => {
    addAttendanceRecord(attData);
  };

  return (
    <DashboardLayout
      title="Attendance Management"
      description="Track daily check-ins, tardiness, and absences in the ATTENDANCE database table"
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Header bar */}
        <div
          style={{
            padding: '0.85rem 1.25rem',
            backgroundColor: 'var(--bg-card)',
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
              Connected to <strong style={{ color: 'var(--text-primary)' }}>ATTENDANCE</strong> table entity.
            </span>
          </div>

          <Button variant="primary" icon={Plus} onClick={() => setIsAddModalOpen(true)}>
            + Mark Attendance
          </Button>
        </div>

        {/* Filters Bar */}
        <div className="card" style={{ padding: '1rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', flex: 1, minWidth: '280px' }}>
            <div style={{ minWidth: '180px' }}>
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                placeholder="Filter by Date"
              />
            </div>

            <div style={{ minWidth: '160px' }}>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={statusOptions}
                placeholder={null}
              />
            </div>
          </div>

          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Showing {filteredAttendance.length} records
          </div>
        </div>

        <AttendanceTable attendanceRecords={filteredAttendance} employees={employees} />
      </div>

      <AttendanceForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSubmit}
        employees={employees}
      />
    </DashboardLayout>
  );
};

export default Attendance;
