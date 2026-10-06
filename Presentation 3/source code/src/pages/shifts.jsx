import React, { useState } from 'react';
import { CalendarRange, UserCheck, Plus, Database } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import ShiftCard from '../components/shifts/ShiftCard';
import ShiftTable from '../components/shifts/ShiftTable';
import AssignShiftModal from '../components/shifts/AssignShiftModal';
import Button from '../components/ui/Button';
import { useEMS } from '../context/EMSContext';

export const Shifts = () => {
  const { shifts, employeeShifts, employees, assignEmployeeShift } = useEMS();
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const handleAssignShift = (empId, shiftId) => {
    assignEmployeeShift(empId, shiftId);
  };

  return (
    <DashboardLayout
      title="Shift Roster & Scheduling"
      description="Manage shift definitions and employee shift assignments (SHIFT & EMPLOYEE_SHIFT tables)"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
              Logical Tables: <strong style={{ color: 'var(--text-primary)' }}>SHIFT</strong> and junction table <strong style={{ color: 'var(--text-primary)' }}>EMPLOYEE_SHIFT</strong>.
            </span>
          </div>

          <Button variant="primary" icon={Plus} onClick={() => setIsAssignModalOpen(true)}>
            Assign Shift to Employee
          </Button>
        </div>

        {/* Shift Definition Cards */}
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
            Operational Shift Definitions ({shifts.length})
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {shifts.map((shift) => {
              const assignedEmpIds = employeeShifts
                .filter((es) => es.shift_id === shift.shift_id)
                .map((es) => es.employee_id);
              const assignedEmps = employees.filter((e) => assignedEmpIds.includes(e.employee_id));

              return <ShiftCard key={shift.shift_id} shift={shift} assignedEmployees={assignedEmps} />;
            })}
          </div>
        </div>

        {/* EMPLOYEE_SHIFT Junction Table View */}
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
            Shift Assignment Junction Records (EMPLOYEE_SHIFT)
          </h3>
          <ShiftTable employeeShifts={employeeShifts} employees={employees} shifts={shifts} />
        </div>
      </div>

      <AssignShiftModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        onAssign={handleAssignShift}
        employees={employees}
        shifts={shifts}
      />
    </DashboardLayout>
  );
};

export default Shifts;
