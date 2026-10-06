'use client';

import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

export const EmployeeForm = ({ isOpen, onClose, onSubmit, nextEmployeeId }) => {
  const [formData, setFormData] = useState({
    employee_id: nextEmployeeId || 'EMP-113',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    department: 'Engineering',
    designation: 'Software Engineer',
    salary: '85000',
    join_date: new Date().toISOString().split('T')[0],
    status: 'Active'
  });

  const [errors, setErrors] = useState({});

  const departments = [
    'Engineering',
    'Human Resources',
    'Finance',
    'Operations',
    'Marketing',
    'Legal & Compliance'
  ];

  const statuses = ['Active', 'On Leave', 'Terminated'];

  const validate = () => {
    const newErrors = {};

    if (!formData.employee_id.trim()) {
      newErrors.employee_id = 'Employee ID is required';
    }

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
    }

    if (!formData.salary || Number(formData.salary) <= 0) {
      newErrors.salary = 'Enter a valid salary amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      onSubmit(formData);
      // Reset form
      setFormData({
        employee_id: `EMP-${Math.floor(100 + Math.random() * 900)}`,
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        department: 'Engineering',
        designation: 'Software Engineer',
        salary: '85000',
        join_date: new Date().toISOString().split('T')[0],
        status: 'Active'
      });
      onClose();
    } catch (err) {
      setErrors((prev) => ({ ...prev, employee_id: err.message }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="+ Add New Employee (DBMS INSERT)"
      maxWidth="620px"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Insert Employee Record
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Input
            label="Employee ID (Primary Key)"
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            placeholder="e.g. EMP-113"
            error={errors.employee_id}
            required
            hint="Unique database identifier"
          />

          <Select
            label="Employment Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={statuses}
            required
          />

          <Input
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="e.g. Eleanor"
            error={errors.first_name}
            required
          />

          <Input
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="e.g. Vance"
            error={errors.last_name}
            required
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. eleanor.vance@university.edu"
            error={errors.email}
            required
          />

          <Input
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +1 (555) 123-9876"
            error={errors.phone}
            required
          />

          <Select
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            options={departments}
            required
          />

          <Input
            label="Designation / Role"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="e.g. Software Systems Specialist"
            error={errors.designation}
            required
          />

          <Input
            label="Annual Salary ($)"
            name="salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
            placeholder="75000"
            error={errors.salary}
            required
          />

          <Input
            label="Join Date"
            name="join_date"
            type="date"
            value={formData.join_date}
            onChange={handleChange}
            required
          />
        </div>
      </form>
    </Modal>
  );
};

export default EmployeeForm;
