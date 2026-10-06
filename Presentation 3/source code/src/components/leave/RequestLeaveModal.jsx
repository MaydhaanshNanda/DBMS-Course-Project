'use client';

import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Select from '../ui/Select';
import Input from '../ui/Input';
import Button from '../ui/Button';

export const RequestLeaveModal = ({ isOpen, onClose, onSubmit, employees }) => {
  const [formData, setFormData] = useState({
    employee_id: employees[0]?.employee_id || '',
    leave_type: 'Annual Leave',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0],
    reason: ''
  });

  const [error, setError] = useState('');

  const empOptions = employees.map((e) => ({
    value: e.employee_id,
    label: `${e.name} (${e.employee_id})`
  }));

  const leaveTypes = ['Annual Leave', 'Sick Leave', 'Casual Leave', 'Maternity/Paternity', 'Unpaid Leave'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.reason.trim()) {
      setError('Please provide a reason for the leave request.');
      return;
    }
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="+ Submit Leave Request (LEAVE Entity)"
      maxWidth="520px"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit Leave Request
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <Select
          label="Employee"
          name="employee_id"
          value={formData.employee_id}
          onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
          options={empOptions}
          required
        />

        <Select
          label="Leave Type"
          name="leave_type"
          value={formData.leave_type}
          onChange={(e) => setFormData({ ...formData, leave_type: e.target.value })}
          options={leaveTypes}
          required
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Input
            label="Start Date"
            name="start_date"
            type="date"
            value={formData.start_date}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            required
          />

          <Input
            label="End Date"
            name="end_date"
            type="date"
            value={formData.end_date}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
            required
          />
        </div>

        <Input
          label="Reason for Leave"
          name="reason"
          value={formData.reason}
          onChange={(e) => {
            setFormData({ ...formData, reason: e.target.value });
            if (error) setError('');
          }}
          placeholder="e.g. Doctor appointment, family commitment..."
          error={error}
          required
        />
      </form>
    </Modal>
  );
};

export default RequestLeaveModal;
