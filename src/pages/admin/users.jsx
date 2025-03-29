import React from 'react';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import UserList from '../../components/admin/users/UserList';
import UserFilter from '../../components/admin/users/UserFilter';

const UsersPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Quản lý người dùng</h1>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
            <span className="material-icons mr-2">add</span>
            Thêm người dùng
          </button>
        </div>
        
        <UserFilter />
        <UserList />
      </div>
    </AdminLayout>
  );
};

export default UsersPage; 