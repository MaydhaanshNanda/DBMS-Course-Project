'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ToastContainer from '../ui/Toast';

export const DashboardLayout = ({ children, title, description, searchTerm, onSearchChange }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar isMobileOpen={isMobileOpen} onCloseMobile={() => setIsMobileOpen(false)} />

      <div className="main-wrapper">
        <Header
          title={title}
          description={description}
          onToggleMobile={() => setIsMobileOpen(!isMobileOpen)}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
        />

        <main className="content-area">{children}</main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default DashboardLayout;
