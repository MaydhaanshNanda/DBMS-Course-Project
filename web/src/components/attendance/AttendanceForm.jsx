'use client';

import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Select from '../ui/Select';
import Input from '../ui/Input';
import Button from '../ui/Button';

export const AttendanceForm = ({ isOpen, onClose, onSubmit, employees }) => {
  const [formData, setFormData] = useState({
    employee_id: employees[0]?.employee_id || '',
    date: new Date().toISOString().split('T')[0],
    check_in: '09:00 AM',
    check_out: '05:30 PM',
    status: 'Present',
    notes: 'Regular check-in'
  });

  const empOptions = employees.map((e) => ({
    value: e.employee_id,
    label: `${e.name} (${e.employee_id})`
  }));

  const statuses = ['Present', 'Late', 'Absent', 'Half Day'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.employee_id) return;
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="+ Mark / Add Attendance Record"
      maxWidth="500px"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Attendance
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Input
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />

          <Select
            label="Attendance Status"
            name="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            options={statuses}
            required
          />

          <Input
            label="Check In Time"
            name="check_in"
            value={formData.check_in}
            onChange={(e) => setFormData({ ...formData, check_in: e.target.value })}
            placeholder="09:00 AM"
          />

          <Input
            label="Check Out Time"
            name="check_out"
            value={formData.check_out}
            onChange={(e) => setFormData({ ...formData, check_out: e.target.value })}
            placeholder="05:30 PM"
          />
        </div>

        <Input
          label="Remarks / Notes"
          name="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="e.g. Approved remote work / punctual"
        />
      </form>
    </Modal>
  );
};

export default AttendanceForm;
