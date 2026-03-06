'use client'
import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import Header from '../../components/Header'
import UserSidebar from '../../components/UserSidebar';

const UserDashboard = () => {
  const { user } = useAuth(); // to get user data stored in react context
  const [profile, setProfile] = useState({
    name: user?.data?.username || 'User',
    email: user?.data?.email || 'user@test.com',
    role: user?.data?.role || 'test-user',
  })
  const [restaurants, setRestaurants] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-100">
        <UserSidebar />
        <div className="flex-1 p-6 text-black">
          <h1 className="text-3xl font-bold mb-6">User Profile</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.role}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDashboard