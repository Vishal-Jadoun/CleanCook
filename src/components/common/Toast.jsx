import React from 'react';
import './Toast.css';

/**
 * Toast Notification Component (Modules 61-66)
 * Gives visual feedback on actions like add, delete, export.
 */
const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  const iconMap = {
    success: '✓',
    error: '✕',
    info: 'ℹ'
  };

  return (
    <div className={`toast-notification toast-${type}`}>
      <span className="toast-icon">{iconMap[type] || '✓'}</span>
      <span className="toast-message">{message}</span>
      {onClose && (
        <button className="toast-close" onClick={onClose} aria-label="Dismiss">
          &times;
        </button>
      )}
    </div>
  );
};

export default Toast;
