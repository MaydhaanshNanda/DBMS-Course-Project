import React, { useState } from 'react';
import { Users, UserCheck, Calendar, Clock, Database, Layers } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatCard from '../components/dashboard/StatCard';
import RecentEmployees from '../components/dashboard/RecentEmployees';
import AttendanceChart from '../components/dashboard/AttendanceChart';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import EmployeeDetails from '../components/employees/EmployeeDetails';
import { useEMS } from '../context/EMSContext';

export const Dashboard = () => {
  const { employees, attendance, kpiStats, activityLogs } = useEMS();
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewDetails = (emp) => {
    setSelectedEmp(emp);
    setIsDetailsOpen(true);
  };

  return (
    <DashboardLayout
      title="Dashboard"
      description="Enterprise workforce analytics and logical database state overview"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* DBMS Context Info Bar */}
        <div
          style={{
            padding: '1rem 1.25rem',
            backgroundColor: 'var(--bg-card)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Database size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '0.925rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                Relational Database Entity Simulation Mode
              </h3>
              <p style={{ fontSize: '0.785rem', color: 'var(--text-secondary)' }}>
                Frontend architecture prepared for Supabase PostgreSQL integration (6 Tables: EMPLOYEE, ATTENDANCE, SHIFT, EMPLOYEE_SHIFT, LEAVE, USER_ADMIN)
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-info" style={{ fontSize: '0.785rem' }}>
              <Layers size={13} /> Ready for Supabase API
            </span>
          </div>
        </div>

        {/* Dynamic KPI Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem'
          }}
        >
          <StatCard
            title="Total Employees"
            value={kpiStats.totalEmployees}
            subtext="Active records in EMPLOYEE table"
            icon={Users}
            color="blue"
          />
          <StatCard
            title="Present Today"
            value={kpiStats.presentToday}
            subtext="Marked in ATTENDANCE table"
            icon={UserCheck}
            color="green"
          />
          <StatCard
            title="On Leave"
            value={kpiStats.onLeave}
            subtext="Approved in LEAVE table"
            icon={Calendar}
            color="amber"
          />
          <StatCard
            title="Active Shifts"
            value={kpiStats.activeShifts}
            subtext="Configured in SHIFT table"
            icon={Clock}
            color="orange"
          />
        </div>

        {/* Dashboard Content Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '1.5rem'
          }}
        >
          <div style={{ gridColumn: 'span 2 / span 2', minWidth: 0 }} className="dashboard-main-col">
            <RecentEmployees employees={employees} onViewDetails={handleViewDetails} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <AttendanceChart attendanceRecords={attendance} totalEmployees={kpiStats.totalEmployees} />
            <ActivityFeed logs={activityLogs} />
          </div>
        </div>
      </div>

      <EmployeeDetails
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        employee={selectedEmp}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
