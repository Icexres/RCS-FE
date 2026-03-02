import React from 'react'
import AdminAuth from '../../../components/AdminAuth'
import Header from '../../../components/Header'
import AdminSidebar from '../../../components/AdminSidebar'
const AdminDashboard = () => {
  return (<>
    <Header />
    <div className="flex">
      <AdminSidebar />
      <div className="p-4">WELCOME TO DASHBOARD</div>
    </div>
  </>)
}

export default AdminDashboard
