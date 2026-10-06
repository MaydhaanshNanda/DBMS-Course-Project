'use client';

import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Select from '../ui/Select';
import Button from '../ui/Button';

export const AssignShiftModal = ({ isOpen, onClose, onAssign, employees, shifts }) => {
  const [employeeId, setEmployeeId] = useState(employees[0]?.employee_id || '');
  const [shiftId, setShiftId] = useState(shifts[0]?.shift_id || '');

  const empOptions = employees.map((e) => ({
    value: e.employee_id,
    label: `${e.name} (${e.employee_id} - ${e.department})`
  }));

  const shiftOptions = shifts.map((s) => ({
    value: s.shift_id,
    label: `${s.shift_name} (${s.start_time} - ${s.end_time})`
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employeeId || !shiftId) return;
    onAssign(employeeId, shiftId);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Employee Shift (EMPLOYEE_SHIFT)"
      maxWidth="500px"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Assign Shift
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <Select
          label="Select Employee"
          name="employee_id"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          options={empOptions}
          required
        />

        <Select
          label="Target Shift"
          name="shift_id"
          value={shiftId}
          onChange={(e) => setShiftId(e.target.value)}
          options={shiftOptions}
          required
        />
      </form>
    </Modal>
  );
};

export default AssignShiftModal;
