import React, { useState, useMemo } from 'react';
import { Plus, UserPlus, Search, Filter, Database } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import EmployeeTable from '../components/employees/EmployeeTable';
import EmployeeForm from '../components/employees/EmployeeForm';
import EmployeeDetails from '../components/employees/EmployeeDetails';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import { useEMS } from '../context/EMSContext';

export const Employees = () => {
  const { employees, addEmployee, deleteEmployee } = useEMS();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // Selected Record State
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Department Filter Options
  const departmentOptions = [
    { value: '', label: 'All Departments' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Marketing', label: 'Marketing' }
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'Active', label: 'Active' },
    { value: 'On Leave', label: 'On Leave' },
    { value: 'Terminated', label: 'Terminated' }
  ];

  // Client-side / Service filtering logic
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        searchTerm === '' ||
        emp.employee_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.designation.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDept = departmentFilter === '' || emp.department === departmentFilter;
      const matchesStatus = statusFilter === '' || emp.status === statusFilter;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [employees, searchTerm, departmentFilter, statusFilter]);

  // Handlers
  const handleOpenAdd = () => setIsAddModalOpen(true);

  const handleView = (emp) => {
    setSelectedEmployee(emp);
    setIsDetailsOpen(true);
  };

  const handleDeleteClick = (emp) => {
    setSelectedEmployee(emp);
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedEmployee) {
      deleteEmployee(selectedEmployee.employee_id);
      setIsDeleteConfirmOpen(false);
      setSelectedEmployee(null);
    }
  };

  const handleAddSubmit = (newEmpData) => {
    addEmployee(newEmpData);
  };

  return (
    <DashboardLayout
      title="Employees Management"
      description="View, insert, and delete workforce records in the EMPLOYEE database table"
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* DBMS Operation Highlight Banner */}
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
              Demonstrating DBMS Operations: <strong style={{ color: 'var(--text-primary)' }}>SELECT</strong> (Viewing), <strong style={{ color: '#16a34a' }}>INSERT</strong> (Adding), and <strong style={{ color: '#dc2626' }}>DELETE</strong> (Removing).
            </span>
          </div>

          <Button variant="primary" icon={UserPlus} onClick={handleOpenAdd}>
            + Add Employee
          </Button>
        </div>

        {/* Filter Controls Bar */}
        <div className="card" style={{ padding: '1rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', flex: 1, minWidth: '280px' }}>
            <div style={{ minWidth: '200px', flex: 1 }}>
              <Select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                options={departmentOptions}
                placeholder={null}
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

          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: '500' }}>
            Showing {filteredEmployees.length} of {employees.length} records
          </div>
        </div>

        {/* Main Employee Table */}
        <EmployeeTable
          employees={filteredEmployees}
          onView={handleView}
          onDelete={handleDeleteClick}
        />
      </div>

      {/* Add Employee Modal (DBMS INSERT) */}
      <EmployeeForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSubmit}
        nextEmployeeId={`EMP-${100 + employees.length + 1}`}
      />

      {/* View Details Drawer/Modal (DBMS SELECT VIEW) */}
      <EmployeeDetails
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        employee={selectedEmployee}
      />

      {/* Delete Confirmation Dialog (DBMS DELETE) */}
      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Employee Record?"
        message={`Are you sure you want to delete employee "${selectedEmployee?.name}" (${selectedEmployee?.employee_id})? This will delete their record from the EMPLOYEE database table.`}
        confirmText="Delete Record"
        confirmVariant="danger"
      />
    </DashboardLayout>
  );
};

export default Employees;
