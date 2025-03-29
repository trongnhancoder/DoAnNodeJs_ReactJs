import React from 'react';

const StatusBadge = ({ status }) => {
  let colorClass, icon;
  
  switch(status) {
    case 'Đã xác nhận':
      colorClass = 'bg-green-100 text-green-800 border-green-200';
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
      break;
    case 'Đang chờ':
      colorClass = 'bg-yellow-100 text-yellow-800 border-yellow-200';
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      break;
    case 'Đã hủy':
      colorClass = 'bg-red-100 text-red-800 border-red-200';
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
      break;
    case 'Hoàn thành':
      colorClass = 'bg-blue-100 text-blue-800 border-blue-200';
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-800 border-gray-200';
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
  
  return (
    <span className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
      {icon}
      {status}
    </span>
  );
};

export default StatusBadge;