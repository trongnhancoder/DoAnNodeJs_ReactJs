import React, { useState } from 'react';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import OrderHeader from '../../components/admin/orders/OrderHeader';
import OrderStats from '../../components/admin/orders/OrderStats';
import OrderFilter from '../../components/admin/orders/OrderFilter';
import OrderTable from '../../components/admin/orders/OrderTable';

const OrdersPage = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  
  // Dữ liệu mẫu cho đơn hàng
  const orders = [
    {
      id: '#ORD001',
      customer: 'Nguyễn Văn A',
      date: '2024-03-28',
      time: '19:30',
      total: '450,000',
      status: 'pending',
      items: [
        { name: 'Phở bò', quantity: 2, price: '150,000' },
        { name: 'Nước ngọt', quantity: 2, price: '75,000' }
      ]
    },
    // Thêm dữ liệu mẫu khác...
  ];

  const handleView = (orderId) => {
    console.log('View order:', orderId);
  };

  const handleEdit = (orderId) => {
    console.log('Edit order:', orderId);
  };

  const handleDelete = (orderId) => {
    console.log('Delete order:', orderId);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
        <OrderHeader onToggleFilter={() => setIsFilterVisible(!isFilterVisible)} />
        <OrderStats />
        <OrderFilter isVisible={isFilterVisible} />
        <OrderTable
          orders={orders}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </AdminLayout>
  );
};

export default OrdersPage; 