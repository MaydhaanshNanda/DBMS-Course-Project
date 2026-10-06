'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useEMS } from '../../context/EMSContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useEMS();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let toastClass = 'toast-success';

        if (toast.type === 'danger') {
          Icon = AlertCircle;
          toastClass = 'toast-danger';
        } else if (toast.type === 'info') {
          Icon = Info;
          toastClass = 'toast-info';
        }

        return (
          <div key={toast.id} className={`toast ${toastClass}`}>
            <Icon size={18} style={{ flexShrink: 0 }} />
            <div style={{ flex: 1 }}>{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
