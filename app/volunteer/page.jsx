'use client'

import { useState, useEffect } from 'react'
import Container from '@/components/layout/Container'
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  StarIcon,
  AcademicCapIcon,
  HeartIcon,
  UsersIcon,
  TrophyIcon,
  HandRaisedIcon,
  EnvelopeIcon,
  PhoneIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'

export default function Volunteer() {
  const [volunteerOpportunities, setVolunteerOpportunities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchVolunteerOpportunities()
  }, [])

  const fetchVolunteerOpportunities = async () => {
    try {
      console.log('Starting to fetch volunteer opportunities...')
      setLoading(true)
      const response = await fetch('/api/contentful/volunteer')
      console.log('Response received:', response)
      const data = await response.json()
      console.log('Data parsed:', data)

      if (data.success) {
        setVolunteerOpportunities(data.data)
      } else {
        setError('Failed to fetch volunteer opportunities')
      }
    } catch (err) {
      console.error('Error fetching volunteer opportunities:', err)
      setError('Failed to load volunteer opportunities')
    } finally {
      console.log('Setting loading to false')
      setLoading(false)
    }
  }

  const getCategoryFromTitle = (title) => {
    const lowerTitle = title.toLowerCase()
    if (
      lowerTitle.includes('bake sale') ||
      lowerTitle.includes('festival') ||
      lowerTitle.includes('event')
    ) {
      return 'events'
    } else if (lowerTitle.includes('art') || lowerTitle.includes('creative')) {
      return 'classroom'
    } else if (
      lowerTitle.includes('library') ||
      lowerTitle.includes('reading')
    ) {
      return 'classroom'
    } else if (lowerTitle.includes('math') || lowerTitle.includes('tutoring')) {
      return 'classroom'
    } else if (lowerTitle.includes('office') || lowerTitle.includes('admin')) {
      return 'administrative'
    } else if (lowerTitle.includes('tech') || lowerTitle.includes('computer')) {
      return 'technical'
    } else if (
      lowerTitle.includes('yearbook') ||
      lowerTitle.includes('photography')
    ) {
      return 'special'
    } else if (
      lowerTitle.includes('hospitality') ||
      lowerTitle.includes('welcome')
    ) {
      return 'community'
    }
    return 'events'
  }

  const getIconForCategory = (category) => {
    const iconMap = {
      events: CalendarIcon,
      classroom: AcademicCapIcon,
      administrative: PhoneIcon,
      technical: UsersIcon,
      special: StarIcon,
      community: UsersIcon,
    }
    return iconMap[category] || CalendarIcon
  }

  const getCategoryLabel = (category) => {
    const labelMap = {
      events: 'PTO Events',
      classroom: 'Classroom Support',
      administrative: 'Office Support',
      technical: 'Technology',
      special: 'Special Projects',
      community: 'Community Building',
    }
    return labelMap[category] || 'General'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Container className="py-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
            <p className="text-gray-600 mt-4 text-lg">
              Loading amazing volunteer opportunities...
            </p>
          </div>
        </Container>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Container className="py-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md mx-auto">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-red-600 mb-4 text-lg">{error}</p>
              <button
                onClick={fetchVolunteerOpportunities}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Logo Background */}
      <div className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100 overflow-hidden">
        {/* Background Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
          <img
            src="/logo-with-glow.png"
            alt="Mary Frank PTO Logo"
            className="w-[400px] h-[400px] object-contain"
          />
        </div>

        <Container className="relative z-10 py-20">
          <div className="max-w-7xl mx-auto text-center">
            {/* Hero Content */}
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Make a Difference
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
                Join our community of dedicated volunteers and help create
                amazing experiences for Mary Frank Elementary students,
                teachers, and families.
              </p>
            </div>

            {/* Impact Stats */}
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-primary-600 mb-1">
                  {volunteerOpportunities.reduce(
                    (sum, opp) => sum + (opp.spots || 0),
                    0
                  )}
                </div>
                <div className="text-gray-600 font-medium text-sm">
                  Volunteer Spots Available
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-primary-600 mb-1">
                  {volunteerOpportunities.length}
                </div>
                <div className="text-gray-600 font-medium text-sm">
                  Active Opportunities
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-primary-600 mb-1">
                  489
                </div>
                <div className="text-gray-600 font-medium text-sm">
                  Students Impacted
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <div className="max-w-7xl mx-auto">
          {/* Volunteer Opportunities */}
          {volunteerOpportunities.length > 0 ? (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Volunteer Opportunities
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {volunteerOpportunities.map((opportunity) => {
                  const category = getCategoryFromTitle(opportunity.title)
                  const IconComponent = getIconForCategory(category)
                  return (
                    <div
                      key={opportunity.id}
                      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white bg-primary-600">
                            {getCategoryLabel(category)}
                          </span>
                          <div className="mt-2 text-sm text-gray-500">
                            {opportunity.spots} spot
                            {opportunity.spots !== 1 ? 's' : ''} available
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {opportunity.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {opportunity.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-3 text-gray-600 text-sm">
                          <MapPinIcon className="w-4 h-4 text-primary-500" />
                          <span>{opportunity.location}</span>
                        </div>
                        {opportunity.date && (
                          <div className="flex items-center space-x-3 text-gray-600 text-sm">
                            <CalendarIcon className="w-4 h-4 text-primary-500" />
                            <span>
                              {new Date(opportunity.date).toLocaleDateString(
                                'en-US',
                                {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                }
                              )}
                            </span>
                          </div>
                        )}
                        {opportunity.time && (
                          <div className="flex items-center space-x-3 text-gray-600 text-sm">
                            <ClockIcon className="w-4 h-4 text-primary-500" />
                            <span>{opportunity.time}</span>
                          </div>
                        )}
                      </div>

                      {opportunity.googleFormUrl && (
                        <a
                          href={opportunity.googleFormUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-all duration-200 text-center font-semibold shadow-md hover:shadow-lg"
                        >
                          Sign Up Now
                        </a>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="mb-12 text-center">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-8 max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  No Opportunities Found
                </h3>
                <p className="text-gray-600 mb-4">
                  No volunteer opportunities are currently available. Check back
                  soon!
                </p>
              </div>
            </div>
          )}

          {/* Benefits Section */}
          <div className="bg-primary-50 rounded-2xl p-8 mb-12 border border-primary-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Why Volunteer?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <HeartIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-base">
                  Make an Impact
                </h3>
                <p className="text-gray-600 text-sm">
                  Directly help students succeed and teachers thrive
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <UsersIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-base">
                  Build Community
                </h3>
                <p className="text-gray-600 text-sm">
                  Connect with other parents and school staff
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <TrophyIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-base">
                  Gain Experience
                </h3>
                <p className="text-gray-600 text-sm">
                  Develop new skills and leadership abilities
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <StarIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-base">
                  Get Recognition
                </h3>
                <p className="text-gray-600 text-sm">
                  Be celebrated for your contributions
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-white rounded-2xl p-8 mb-12 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Join our amazing team of volunteers and help make Mary Frank
              Elementary the best it can be for our students and community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-200 shadow-md hover:shadow-lg">
                <HandRaisedIcon className="w-5 h-5 mr-2" />
                Become a Volunteer
              </button>
              <a
                href="/events"
                className="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
              >
                View Upcoming Events
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Questions About Volunteering?
            </h2>
            <p className="text-gray-600 mb-6">
              Our volunteer coordinator is here to help you find the perfect
              opportunity and answer any questions you might have.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:volunteer@maryfrankpto.org"
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg text-sm"
              >
                <EnvelopeIcon className="w-4 h-4 mr-2" />
                Email Us
              </a>
              <a
                href="tel:+15742720340"
                className="inline-flex items-center px-4 py-2 border border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors text-sm"
              >
                <PhoneIcon className="w-4 h-4 mr-2" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
