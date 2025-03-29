import React from 'react';

const StatusBadge = ({ status }) => {
  let colorClass, icon;
  
  switch(status) {
    case 'Đã xác nhận':
      colorClass = 'bg-green-100 text-green-800';
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
      break;
    case 'Đang chờ':
      colorClass = 'bg-yellow-100 text-yellow-800';
      icon = null;
      break;
    case 'Đã hủy':
      colorClass = 'bg-red-100 text-red-800';
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
      break;
    case 'Hoàn thành':
      colorClass = 'bg-blue-100 text-blue-800';
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-800';
      icon = null;
  }
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      {icon && icon}
      {status}
    </span>
  );
};

export default StatusBadge;