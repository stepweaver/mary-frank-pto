'use client'

import { useState, useEffect } from 'react'
import Container from '@/components/layout/Container'
import FundraiserCard from '@/components/FundraiserCard'
import { HeartIcon } from '@heroicons/react/24/outline'

export default function Fundraising() {
  const [fundraisingData, setFundraisingData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchFundraisingData()
  }, [])

  const fetchFundraisingData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/fundraising')
      if (!response.ok) {
        throw new Error('Failed to fetch fundraising data')
      }
      const data = await response.json()
      setFundraisingData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Container className="py-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading fundraising information...</p>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-800">
              Error loading fundraising data: {error}
            </p>
            <button
              onClick={fetchFundraisingData}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </Container>
    )
  }

  if (!fundraisingData) {
    return (
      <Container className="py-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">No fundraising data available.</p>
        </div>
      </Container>
    )
  }

  const { fundraisers } = fundraisingData

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 via-white to-primary-100 py-20 relative">
        {/* Background Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
          <img
            src="/logo-with-glow.png"
            alt="Mary Frank PTO Logo"
            className="w-[400px] h-[400px] object-contain"
          />
        </div>

        <Container>
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className="mb-8">
              <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                Support Our School
              </h1>
              <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
                Join us in making a difference in our students' education. Click
                on any fundraiser below to view details.
              </p>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-16">
        <div className="max-w-6xl mx-auto">
          {/* Fundraisers List */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
              <HeartIcon className="w-8 h-8 text-primary-600 mr-3" />
              Current Fundraisers
            </h2>

            {fundraisers.length === 0 ? (
              <div className="text-center py-12">
                <HeartIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No active fundraisers
                </h3>
                <p className="text-gray-500">
                  Check back soon for new fundraising opportunities.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {fundraisers.map((fundraiser) => (
                  <FundraiserCard key={fundraiser.id} fundraiser={fundraiser} />
                ))}
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-primary-50 to-primary-100 border-2 border-primary-200 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Your support directly impacts our students' learning experience.
              Click on any fundraiser above to learn more and get involved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                <HeartIcon className="w-5 h-5 mr-2" />
                View Fundraisers
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
