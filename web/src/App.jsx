import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EMSProvider } from './context/EMSContext';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import Shifts from './pages/Shifts';
import Leave from './pages/Leave';
import Admin from './pages/Admin';

export function App() {
  return (
    <EMSProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/shifts" element={<Shifts />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </EMSProvider>
  );
}

export default App;
