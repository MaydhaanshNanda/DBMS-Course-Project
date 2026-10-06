'use client';

import React from 'react';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Mail, Phone, Calendar, DollarSign, Building2, Briefcase, Clock, ShieldCheck } from 'lucide-react';
import { useEMS } from '../../context/EMSContext';

export const EmployeeDetails = ({ isOpen, onClose, employee }) => {
  const { employeeShifts, shifts, attendance } = useEMS();

  if (!employee) return null;

  // Find assigned shift
  const empShiftAssign = employeeShifts.find((es) => es.employee_id === employee.employee_id);
  const shiftInfo = shifts.find((s) => s.shift_id === empShiftAssign?.shift_id);

  // Find attendance history count
  const attRecords = attendance.filter((a) => a.employee_id === employee.employee_id);
  const presentCount = attRecords.filter((a) => a.status === 'Present' || a.status === 'Late').length;

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Employee Record Details (DBMS VIEW)"
      maxWidth="580px"
      footer={
        <Button variant="secondary" onClick={onClose}>
          Close Details
        </Button>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Profile Card Header */}
        <div
          style={{
            padding: '1.25rem',
            borderRadius: '12px',
            backgroundColor: '#f8fafc',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              fontWeight: '700'
            }}
          >
            {employee.first_name ? employee.first_name[0] : employee.name[0]}
            {employee.last_name ? employee.last_name[0] : ''}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                {employee.name}
              </h3>
              <Badge variant={getStatusVariant(employee.status)}>{employee.status}</Badge>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
              {employee.designation} &bull; {employee.department}
            </p>
            <p style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--primary)', marginTop: '0.2rem' }}>
              Database Primary Key: {employee.employee_id}
            </p>
          </div>
        </div>

        {/* Database Field Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="card" style={{ padding: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
              <Mail size={14} />
              <span>Email Address</span>
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              {employee.email}
            </div>
          </div>

          <div className="card" style={{ padding: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
              <Phone size={14} />
              <span>Phone Number</span>
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              {employee.phone}
            </div>
          </div>

          <div className="card" style={{ padding: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
              <Building2 size={14} />
              <span>Department</span>
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              {employee.department}
            </div>
          </div>

          <div className="card" style={{ padding: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
              <Briefcase size={14} />
              <span>Designation</span>
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              {employee.designation}
            </div>
          </div>

          <div className="card" style={{ padding: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
              <DollarSign size={14} />
              <span>Annual Salary</span>
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#16a34a' }}>
              ${Number(employee.salary).toLocaleString()} / yr
            </div>
          </div>

          <div className="card" style={{ padding: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
              <Calendar size={14} />
              <span>Join Date</span>
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              {employee.join_date}
            </div>
          </div>
        </div>

        {/* Related Database Relations (FK Relationships) */}
        <div
          style={{
            padding: '1rem',
            borderRadius: '10px',
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe'
          }}
        >
          <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1e40af', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldCheck size={16} /> Relational Table References
          </h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: '#1e3a8a' }}>
            <div>
              <strong>Assigned Shift:</strong> {shiftInfo ? `${shiftInfo.shift_name} (${shiftInfo.start_time} - ${shiftInfo.end_time})` : 'Standard Day Shift'}
            </div>
            <div>
              <strong>Attendance Days Recorded:</strong> {presentCount} days
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EmployeeDetails;
