'use client'

import { useState, useEffect } from 'react'
import Container from '@/components/layout/Container'
import Modal from '@/components/ui/Modal'
import VolunteerSignupForm from '@/components/VolunteerSignupForm'
import {
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

export default function Volunteer() {
  const [opportunities, setOpportunities] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOpportunity, setSelectedOpportunity] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

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
    setSelectedOpportunity(opportunity)
    setIsModalOpen(true)
  }

  const handleSignupSubmit = async (formData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/volunteer/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          opportunityId: selectedOpportunity.id,
          opportunityTitle: selectedOpportunity.title,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          message: formData.notes,
          opportunityDate: selectedOpportunity.date,
          opportunityTime: selectedOpportunity.time,
          opportunityLocation: selectedOpportunity.location,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Close modal and show success message
        setIsModalOpen(false)
        setSelectedOpportunity(null)
        setShowSuccess(true)
        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000)
      } else {
        throw new Error(result.message || 'Signup failed')
      }
    } catch (error) {
      console.error('Error submitting signup:', error)
      alert('There was an error submitting your signup. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedOpportunity(null)
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

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Thank you for signing up! We'll be in touch soon.
                </p>
              </div>
            </div>
          </div>
        )}

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

      {/* Volunteer Signup Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Sign Up to Volunteer"
      >
        {selectedOpportunity && (
          <VolunteerSignupForm
            opportunity={selectedOpportunity}
            onSubmit={handleSignupSubmit}
            onCancel={handleCloseModal}
            isSubmitting={isSubmitting}
          />
        )}
      </Modal>
    </Container>
  )
}
