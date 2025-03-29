import React from 'react';
import { Link } from 'react-router-dom';

const EmptyBookingState = () => {
  return (
    <div className="mt-8 text-center py-12 bg-white shadow overflow-hidden rounded-lg">
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-gray-900">Chưa có lịch sử đặt chỗ</h3>
      <p className="mt-1 text-sm text-gray-500">
        Bạn chưa có lịch sử đặt chỗ nào. Hãy đặt tiệc hoặc phòng ngay bây giờ.
      </p>
      <div className="mt-6 flex justify-center space-x-4">
        <Link
          to="/reservation"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Đặt tiệc
        </Link>
      
      </div>
    </div>
  );
};

export default EmptyBookingState;