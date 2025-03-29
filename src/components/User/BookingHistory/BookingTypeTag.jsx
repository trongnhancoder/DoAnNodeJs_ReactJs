import React from 'react';

const BookingTypeTag = ({ type }) => {
  let display, colorClass;
  
  switch(type) {
    case 'PARTY':
      display = 'Tiệc';
      colorClass = 'bg-purple-100 text-purple-800';
      break;
    case 'ROOM':
      display = 'Phòng';
      colorClass = 'bg-indigo-100 text-indigo-800';
      break;
    default:
      display = 'Khác';
      colorClass = 'bg-gray-100 text-gray-800';
  }
  
  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}>
      {display}
    </span>
  );
};

export default BookingTypeTag;