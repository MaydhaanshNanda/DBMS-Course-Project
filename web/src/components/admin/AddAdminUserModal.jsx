'use client';

import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

export const AddAdminUserModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'HR Manager'
  });

  const [error, setError] = useState('');

  const roles = ['Super Admin', 'HR Manager', 'System Auditor', 'Read-Only View'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.email.trim()) {
      setError('Username and email are required');
      return;
    }
    onSubmit(formData);
    setFormData({ username: '', email: '', role: 'HR Manager' });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="+ Add Admin User (USER_ADMIN Entity)"
      maxWidth="480px"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create User Record
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Username"
          name="username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder="e.g. hr_evaluator_01"
          required
        />

        <Input
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="e.g. hr.evaluator@university.edu"
          required
        />

        <Select
          label="System Role"
          name="role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          options={roles}
          required
        />

        {error && <div className="form-error" style={{ marginTop: '0.5rem' }}>{error}</div>}
      </form>
    </Modal>
  );
};

export default AddAdminUserModal;
