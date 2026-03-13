'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../../components/Header'
import UserSidebar from '../../components/UserSidebar'
import { useAuth } from '@/context/AuthContext'

const Homepage = () => {
  const [likedRestaurants, setLikedRestaurants] = useState([])
  const [favouriteRestaurants, setFavouriteRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { user } = useAuth()
  const userId = user?.data?.id || user?.id

  const API_URL = 'http://localhost:7000/api/restaurant'
  const LIKE_API_URL = 'http://localhost:7000/api/like'
  const FAV_API_URL = 'http://localhost:7000/api/favourite'

  useEffect(() => {
    if (userId) {
      fetchHomepageData()
    }
  }, [userId])

  const fetchHomepageData = async () => {
    try {
      setLoading(true)

      const restaurantsResponse = await axios.get(`${API_URL}/all`)
      const allRestaurants = restaurantsResponse.data.data || []

      await fetchUserLikes(allRestaurants)
      await fetchUserFavourites(allRestaurants)

      setError(null)
    } catch (err) {
      console.error('Error fetching homepage data:', err)
      setError('Failed to load your restaurant activity. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const fetchUserLikes = async (allRestaurants) => {
    try {
      const response = await axios.get(`${LIKE_API_URL}/user/${userId}`)
      const likedIds = response.data.data?.map(item =>
        item.restaurant_id || item.restaurantId || item.id
      ) || []

      const liked = allRestaurants.filter(restaurant =>
        likedIds.includes(restaurant.id)
      )

      setLikedRestaurants(liked)
    } catch (err) {
      console.error('Error fetching likes:', err)
    }
  }

  const fetchUserFavourites = async (allRestaurants) => {
    try {
      const response = await axios.get(`${FAV_API_URL}/user/${userId}`)
      const favouriteIds = response.data.data?.map(item =>
        item.restaurant_id || item.restaurantId || item.id
      ) || []

      const favourited = allRestaurants.filter(restaurant =>
        favouriteIds.includes(restaurant.id)
      )

      setFavouriteRestaurants(favourited)
    } catch (err) {
      console.error('Error fetching favourites:', err)
    }
  }

  return (
  <>
    <Header />
    <div className="flex min-h-screen bg-gray-50">
      <UserSidebar />

      <main className="flex-1 p-6 md:p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="rounded-3xl bg-linear-to-r from-emerald-600 via-emerald-500 to-teal-500 px-8 py-10 text-white shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-100">HOME</p>
            <h1 className="mt-3 text-4xl font-bold">Your restaurant activity</h1>
            <p className="mt-3 max-w-2xl text-sm text-emerald-50 md:text-base">
              Browse the restaurants you liked and marked as favourites, all in one place.
            </p>
          </section>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-emerald-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading your saved restaurants...</p>
            </div>
          ) : (
            <div className="space-y-10">
              <section className="space-y-4">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Favourite Restaurants</h2>
                    <p className="text-sm text-gray-500">
                      Quick access to the places you saved for later.
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm border border-gray-100">
                    {favouriteRestaurants.length} saved
                  </span>
                </div>

                {favouriteRestaurants.length > 0 ? (
                  <div className="flex gap-5 overflow-x-auto pb-3 snap-x snap-mandatory">
                    {favouriteRestaurants.map((restaurant) => (
                      <article
                        key={`favourite-${restaurant.id}`}
                        className="min-w-70 max-w-70 snap-start overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col"
                      >
                        <div className="flex h-32 bg-linear-to-r from-rose-500 to-orange-400" />

                        <div className="flex min-h-55 flex-col grow p-5">
                          <div className="mb-4 space-y-2">
                            <h3 className="text-xl font-bold text-gray-900">{restaurant.r_name}</h3>
                            <p className="line-clamp-3 text-sm text-gray-600">{restaurant.r_desc}</p>
                          </div>

                          <div className="space-y-2 text-sm text-gray-600">
                            <p>
                              <span className="mr-2">📍</span>
                              {restaurant.r_location}
                            </p>
                            <p>
                              <span className="mr-2">📞</span>
                              {restaurant.phone}
                            </p>
                          </div>

                          <div className="mt-auto pt-5">
                            <a
                              href={`/RestaurantView/${restaurant.id}`}
                              className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                            >
                              View Details
                            </a>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-gray-200 bg-white/70 px-6 py-10 text-center text-gray-500">
                    You have not added any favourites yet.
                  </div>
                )}
              </section>

              <section className="space-y-4">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Liked Restaurants</h2>
                    <p className="text-sm text-gray-500">
                      Places you reacted to and may want to revisit.
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm border border-gray-100">
                    {likedRestaurants.length} saved
                  </span>
                </div>

                {likedRestaurants.length > 0 ? (
                  <div className="flex gap-5 overflow-x-auto pb-3 snap-x snap-mandatory">
                    {likedRestaurants.map((restaurant) => (
                      <article
                        key={`liked-${restaurant.id}`}
                        className="min-w-70 max-w-70 snap-start overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col"
                      >
                        <div className="flex h-32 items-center justify-center bg-linear-to-r from-sky-500 to-cyan-400" />

                        <div className="flex min-h-55 flex-col grow p-5">
                          <div className="mb-4 space-y-2">
                            <h3 className="text-xl font-bold text-gray-900">{restaurant.r_name}</h3>
                            <p className="line-clamp-3 text-sm text-gray-600">{restaurant.r_desc}</p>
                          </div>

                          <div className="space-y-2 text-sm text-gray-600">
                            <p>
                              <span className="mr-2">📍</span>
                              {restaurant.r_location}
                            </p>
                            <p>
                              <span className="mr-2">📞</span>
                              {restaurant.phone}
                            </p>
                          </div>

                          <div className="mt-auto pt-5">
                            <a
                              href={`/RestaurantView/${restaurant.id}`}
                              className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                            >
                              View Details
                            </a>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-gray-200 bg-white/70 px-6 py-10 text-center text-gray-500">
                    You have not liked any restaurants yet.
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  </>
)
}

export default Homepage