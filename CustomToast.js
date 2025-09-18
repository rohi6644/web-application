import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Notification Functions
const notifySuccess = (message) => {
  toast.success(message, { autoClose: 2000 });
};

const notifyError = (message) => {
  toast.error(message, { autoClose: 2000 });
};

// Custom Styles
const toastContainerStyle = {
  zIndex: 1055,
};

const toastStyle = {
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  padding: '12px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  whiteSpace: 'nowrap', // Ensure text is on a single line
  overflow: 'hidden', // Prevent text overflow
  textOverflow: 'ellipsis', // Add ellipsis if the text is too long
};

const successStyle = {
  backgroundColor: '#d4edda',
  color: '#155724',
  borderLeft: '4px solid #28a745',
};

const errorStyle = {
  backgroundColor: '#f8d7da',
  color: '#721c24',
  borderLeft: '4px solid #dc3545',
};

const closeButtonStyle = {
  color: '#dc3545',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  transition: 'transform 0.3s ease, color 0.3s ease',
  fontSize: '18px',
  marginLeft: '10px', // Space between message and the X button
  order: '2', // Make sure the close button is on the right
};

// Custom Toast Component
const CustomToast = () => {
  return (
    <ToastContainer
      toastStyle={{
        ...toastStyle,
        // Add dynamic styles based on toast type (handled internally by react-toastify)
      }}
      closeButton={({ closeToast }) => (
        <button
          style={closeButtonStyle}
          onMouseEnter={(e) => {
            e.target.style.color = '#721c24';
            e.target.style.transform = 'scale(1.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#dc3545';
            e.target.style.transform = 'scale(1)';
          }}
          onClick={closeToast}
        >
          ✖
        </button>
      )}
      style={toastContainerStyle}
    />
  );
};

export { CustomToast, notifySuccess, notifyError };