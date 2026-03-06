'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../../components/Header'
import UserSidebar from '../../components/UserSidebar'

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
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

  return (
    <>
      <Header />

      <div className="flex min-h-screen bg-gray-50">
        <UserSidebar />

        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Restaurants</h1>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6 relative">
                <button
                  onClick={() => setError(null)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
                {error}
              </div>
            )}

            {/* Loading State */}
            {loading && restaurants.length === 0 && (
              <div className="text-center py-16">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-600 border-r-transparent"></div>
                <p className="mt-4 text-gray-600">Loading restaurants...</p>
              </div>
            )}

            {/* Restaurants Grid */}
            {!loading && Array.isArray(restaurants) && restaurants.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant, index) => (
                  <div
                    key={restaurant.id || index}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col justify-between"
                  >
                    {/* Restaurant Header */}
                    <div className="bg-linear-to-r from-emerald-500 to-emerald-600 h-32 flex items-center justify-center">
                      {/* Add static images here */}
                    </div>

                    {/* Restaurant Info */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{restaurant.r_name}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{restaurant.r_desc}</p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-start text-sm">
                            <span className="text-gray-500 mr-2">📍</span>
                            <span className="text-gray-700">{restaurant.r_location}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="text-gray-500 mr-2">📞</span>
                            <span className="text-gray-700">{restaurant.phone}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-4 border-t border-gray-100 mt-auto">
                        <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                          View Restaurant
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                          Like
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && restaurants.length === 0 && !error && (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No restaurants found</h3>
                <p className="text-gray-500">Check back later for new restaurants!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default RestaurantList