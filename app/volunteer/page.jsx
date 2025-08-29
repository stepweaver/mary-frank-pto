'use client'

import { useState, useEffect } from 'react'
import Container from '@/components/layout/Container'
import {
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

export default function Volunteer() {
  const [opportunities, setOpportunities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVolunteerOpportunities()
  }, [])

  const fetchVolunteerOpportunities = async () => {
    try {
      const response = await fetch('/api/contentful/volunteer')
      const data = await response.json()
      if (data.success) {
        setOpportunities(data.data)
      }
    } catch (error) {
      console.error('Error fetching volunteer opportunities:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatVolunteerDate = (dateString) => {
    if (!dateString) return 'Flexible'
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow'
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })
    }
  }

  const handleVolunteerClick = (opportunity) => {
    // TODO: Open modal with signup form
    console.log('Volunteer opportunity clicked:', opportunity)
  }

  return (
    <Container className="py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Volunteer Opportunities
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find opportunities to help and make a difference in our school. Your
            time and skills are valuable to our community.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <p className="text-gray-600 mt-4">Loading opportunities...</p>
          </div>
        ) : opportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {opportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => handleVolunteerClick(opportunity)}
              >
                <div className="p-4">
                  <div className="mb-2">
                    <h3 className="text-base font-semibold text-gray-900 leading-tight">
                      {opportunity.title}
                    </h3>
                  </div>

                  {opportunity.description && (
                    <div className="text-gray-600 text-sm mb-3 leading-relaxed">
                      {opportunity.description}
                    </div>
                  )}

                  <div className="space-y-2">
                    {opportunity.date && (
                      <div className="flex items-center text-gray-700 text-sm">
                        <ClockIcon className="h-4 w-4 mr-2 text-green-500" />
                        <span>{formatVolunteerDate(opportunity.date)}</span>
                        {opportunity.time && (
                          <span className="ml-2 text-gray-500">
                            • {opportunity.time}
                          </span>
                        )}
                      </div>
                    )}

                    {opportunity.location && (
                      <div className="flex items-center text-gray-700 text-sm">
                        <MapPinIcon className="h-4 w-4 mr-2 text-green-500" />
                        <span>{opportunity.location}</span>
                      </div>
                    )}

                    <div className="flex items-center text-gray-700 text-sm">
                      <UserGroupIcon className="h-4 w-4 mr-2 text-green-500" />
                      <span className="font-medium">
                        {opportunity.spots} spots available
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                      Sign Up Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
              <UserGroupIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Opportunities Available
              </h3>
              <p className="text-gray-500">
                Check back soon for new volunteer opportunities. We appreciate
                your interest in helping our school community!
              </p>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}
