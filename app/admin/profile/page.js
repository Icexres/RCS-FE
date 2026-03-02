import React from 'react'
import AdminAuth from '../../../components/AdminAuth'
import Header from '../../../components/Header'
import AdminSidebar from '../../../components/AdminSidebar'

const AdminProfile = () => {
  return (
    <>
        <Header />
        <div className="flex">
            <AdminSidebar />
            <div className="p-4">WELCOME TO PROFILE</div>
        </div>
    </>
  )
}

export default AdminProfile
