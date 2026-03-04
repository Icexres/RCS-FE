'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../../../components/Header'
import AdminSidebar from '../../../components/AdminSidebar'

const AdminRestaurants = () => {
  const [restaurants, setRestaurants] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [newRestaurant, setNewRestaurant] = useState({
    r_name: '',
    r_desc: '',
    r_location: '',
    phone:'',
  })

  const API_URL = 'http://localhost:7000/api/restaurant'

  // Fetch restaurants on component mount
  useEffect(() => {
    fetchRestaurants()
  }, [])

  const fetchRestaurants = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/all`)
      const data = response.data
      setRestaurants(data.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching restaurants:', err)
      
      if (err.response?.status === 404) {
        // Endpoint doesn't exist yet
        setError('Restaurant endpoint not found. Please check your backend.')
      } else if (err.response?.status === 500) {
        setError('Server error. Please check your backend is running correctly.')
      } else {
        setError(`Failed to load restaurants: ${err.response?.data?.message || err.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setNewRestaurant({
      ...newRestaurant,
      [e.target.name]: e.target.value
    })
  }

  const handleAddRestaurant = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post(`${API_URL}/create`, newRestaurant)
      
      // Add new restaurant to list
      const newData = response.data.data || response.data
      setRestaurants([...restaurants, newData])
      
      // Reset form
      setNewRestaurant({ r_name: '', r_desc: '', r_location: '', phone: '' })
      setShowAddForm(false)
      
      alert('Restaurant added successfully!')
    } catch (err) {
      console.error('Error adding restaurant:', err)
      setError(err.response?.data?.message || 'Failed to add restaurant. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteRestaurant = async (id) => {
    if (!confirm('Are you sure you want to delete this restaurant?')) return

    try {
      await axios.delete(`${API_URL}/delete/${id}`)

      // Remove from list
      setRestaurants(restaurants.filter(restaurant => restaurant.id !== id))
      
      alert('Restaurant deleted successfully!')
    } catch (err) {
      console.error('Error deleting restaurant:', err)
      setError(err.response?.data?.message || 'Failed to delete restaurant')
    }
  }

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <div className="max-w-3xl text-black mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Manage Restaurants</h1>
              <button onClick={() => setShowAddForm(!showAddForm)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                {showAddForm ? 'Cancel' : '+ Add Restaurant'}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative">
                <button 
                  onClick={() => setError(null)}
                  className="absolute top-2 right-2 text-red-700"
                >
                  ✕
                </button>
                {error}
              </div>
            )}

            {/* Add Restaurant Form */}
            {showAddForm && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Add New Restaurant</h2>
                <form onSubmit={handleAddRestaurant} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="r_name"
                    value={newRestaurant.r_name}
                    onChange={handleInputChange}
                    placeholder="Restaurant Name"
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    name="r_location"
                    value={newRestaurant.r_location}
                    onChange={handleInputChange}
                    placeholder="Location"
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input type="text" name="phone" value={newRestaurant.phone} onChange={handleInputChange} placeholder="phone"
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"required />
                  
                  <textarea
                    name="r_desc"
                    value={newRestaurant.r_desc}
                    onChange={handleInputChange}
                    cols={3}
                    placeholder="Description"
                    className="col-span-1 md:col-span-3 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition md:col-span-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Adding...' : 'Add Restaurant'}
                  </button>
                </form>
              </div>
            )}

            {/* Loading State */}
            {loading && restaurants.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Loading restaurants...
              </div>
            )}

            {/* Restaurants List */}
            {!loading && Array.isArray(restaurants) && restaurants.length > 0 && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-black border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-200">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-200">Description</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-200">Location</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-200">Phone</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {restaurants.map((restaurant, index) => (
                      <tr key={restaurant.id || index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{restaurant.r_name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{restaurant.r_desc}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{restaurant.r_location}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{restaurant.phone}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDeleteRestaurant(restaurant.id)}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!loading && restaurants.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No restaurants found. Add your first restaurant!
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminRestaurants