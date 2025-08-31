'use client'

import { useState, useEffect } from 'react'
import Container from '@/components/layout/Container'
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  HeartIcon,
  AcademicCapIcon,
  TrophyIcon,
  StarIcon,
  FireIcon,
  GiftIcon,
  CameraIcon,
  ShoppingBagIcon,
  MusicalNoteIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline'

// Event type definitions with icons and colors
const eventTypes = [
  {
    type: 'meeting',
    label: 'PTO Meeting',
    color: 'bg-primary-600',
    icon: UserGroupIcon,
  },
  {
    type: 'fundraiser',
    label: 'Fundraiser',
    color: 'bg-primary-500',
    icon: ShoppingBagIcon,
  },
  {
    type: 'social',
    label: 'Social Event',
    color: 'bg-primary-400',
    icon: MusicalNoteIcon,
  },
  {
    type: 'school',
    label: 'School Event',
    color: 'bg-primary-700',
    icon: AcademicCapIcon,
  },
  {
    type: 'appreciation',
    label: 'Appreciation',
    color: 'bg-primary-300',
    icon: HeartIcon,
  },
  {
    type: 'fitness',
    label: 'Fitness',
    color: 'bg-primary-800',
    icon: TrophyIcon,
  },
]

// Helper function to determine event type based on title/description
const getEventType = (event) => {
  const title = event.title?.toLowerCase() || ''
  const description = event.description?.toLowerCase() || ''

  if (title.includes('meeting') || description.includes('meeting'))
    return 'meeting'
  if (
    title.includes('fundraiser') ||
    title.includes('sale') ||
    title.includes('fair')
  )
    return 'fundraiser'
  if (title.includes('appreciation') || title.includes('thank'))
    return 'appreciation'
  if (
    title.includes('social') ||
    title.includes('fun') ||
    title.includes('night')
  )
    return 'social'
  if (title.includes('volunteer') || description.includes('volunteer'))
    return 'school'
  if (title.includes('fitness') || title.includes('sport')) return 'fitness'

  return 'meeting' // default
}

// Get event type info with fallback
const getEventTypeInfo = (type) => {
  return eventTypes.find((t) => t.type === type) || eventTypes[0]
}

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

// Format time for display
const formatTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/events?maxResults=50')
      const data = await response.json()

      if (data.success) {
        setEvents(data.data.events)
      } else {
        setError(data.error || 'Failed to fetch events')
      }
    } catch (err) {
      console.error('Error fetching events:', err)
      setError('Failed to fetch events. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  // Transform Google Calendar events to match the original structure
  const transformedEvents = events.map((event) => ({
    id: event.id,
    title: event.title,
    date: event.start,
    time: event.end
      ? `${formatTime(event.start)} - ${formatTime(event.end)}`
      : formatTime(event.start),
    location: event.location || 'TBD',
    type: getEventType(event),
    description: event.description || '',
    icon: getEventTypeInfo(getEventType(event)).icon,
    featured: false, // You can add logic to determine featured events
  }))

  // Filter featured events (you can customize this logic)
  const featuredEvents = transformedEvents.filter((event) => event.featured)
  const allEvents = transformedEvents

  return (
    <div className="min-h-screen">
      <Container className="py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-text-primary mb-6">
              PTO Events & Calendar
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Stay updated on all PTO meetings, fundraisers, and school events.
              Join us in building a stronger school community!
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <p className="mt-2 text-text-secondary">Loading events...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-red-800">{error}</p>
                <button
                  onClick={fetchEvents}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Featured Events */}
          {!loading && !error && featuredEvents.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
                Featured Events
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-surface border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 ${getEventTypeInfo(event.type).color} rounded-lg flex items-center justify-center`}
                      >
                        <event.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm text-text-muted">
                        {formatDate(event.date)}
                      </span>
                    </div>

                    <h3 className="font-bold text-text-primary text-lg mb-2">
                      {event.title}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-text-secondary text-sm">
                        <ClockIcon className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-text-secondary text-sm">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <p className="text-text-secondary text-sm mb-4">
                      {event.description}
                    </p>

                    <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                      Learn More
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Calendar Grid View */}
          {!loading && !error && (
            <div className="mb-16">
              {/* Desktop Calendar Grid - Hidden on mobile */}
              <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
                {/* Background Logo */}
                <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
                  <img
                    src="/logo-with-glow.png"
                    alt="Mary Frank PTO Logo"
                    className="w-[600px] h-[600px] object-contain"
                  />
                </div>

                {/* Calendar Header */}
                <div className="bg-primary-50 px-6 py-4 border-b border-gray-200 relative z-10">
                  <h2 className="text-3xl font-bold text-text-primary text-center">
                    {new Date().toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </h2>
                </div>

                {/* Calendar Grid */}
                <div className="p-4 relative z-10">
                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-0 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                      (day) => (
                        <div
                          key={day}
                          className="text-sm font-semibold text-gray-600 text-center py-2 border-b border-gray-200"
                        >
                          {day}
                        </div>
                      )
                    )}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-0">
                    {(() => {
                      const month = new Date().getMonth()
                      const year = new Date().getFullYear()
                      const daysInMonth = new Date(year, month + 1, 0).getDate()
                      const firstDayOfMonth = new Date(year, month, 1).getDay()
                      const calendarGrid = []

                      // Add empty cells for days before the first day of the month
                      for (let i = 0; i < firstDayOfMonth; i++) {
                        calendarGrid.push(
                          <div
                            key={`empty-${i}`}
                            className="min-h-[200px] border-r border-b border-gray-200 bg-gray-50"
                          ></div>
                        )
                      }

                      // Add days of the month
                      for (let day = 1; day <= daysInMonth; day++) {
                        const date = new Date(year, month, day)
                        const isToday =
                          date.toDateString() === new Date().toDateString()
                        const dayEvents = allEvents.filter(
                          (event) => new Date(event.date).getDate() === day
                        )

                        calendarGrid.push(
                          <div
                            key={`day-${day}`}
                            className="min-h-[200px] border-r border-b border-gray-200 p-2"
                          >
                            <div className="flex flex-col h-full">
                              {/* Day Header */}
                              <div className="flex justify-between items-center mb-2">
                                <span
                                  className={`text-sm font-medium ${
                                    isToday
                                      ? 'bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center'
                                      : 'text-gray-900'
                                  }`}
                                >
                                  {day}
                                </span>
                                {dayEvents.length > 0 && (
                                  <span className="text-xs text-primary-600 font-medium">
                                    {dayEvents.length} event
                                    {dayEvents.length !== 1 ? 's' : ''}
                                  </span>
                                )}
                              </div>

                              {/* Events Container */}
                              <div className="flex-1 space-y-2 overflow-y-auto">
                                {dayEvents.map((event, index) => (
                                  <div
                                    key={`event-${index}`}
                                    className="bg-primary-50 border border-primary-200 rounded-lg p-2 text-xs hover:bg-primary-100 transition-colors cursor-pointer"
                                  >
                                    <div className="font-medium text-primary-900 mb-1 line-clamp-2">
                                      {event.title}
                                    </div>
                                    <div className="text-primary-700 space-y-1">
                                      <div className="flex items-center space-x-1">
                                        <ClockIcon className="w-3 h-3 flex-shrink-0" />
                                        <span className="truncate">
                                          {event.time}
                                        </span>
                                      </div>
                                      <div className="flex items-center space-x-1">
                                        <MapPinIcon className="w-3 h-3 flex-shrink-0" />
                                        <span className="truncate">
                                          {event.location}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )
                      }

                      return calendarGrid
                    })()}
                  </div>
                </div>
              </div>

              {/* Mobile Calendar List - Visible only on mobile */}
              <div className="md:hidden bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
                {/* Background Logo for Mobile */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                  <img
                    src="/logo-with-glow.png"
                    alt="Mary Frank PTO Logo"
                    className="w-80 h-80 object-contain"
                  />
                </div>

                {/* Calendar Header */}
                <div className="bg-primary-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-primary-900 text-center">
                    {new Date().toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </h3>
                </div>

                {/* Mobile Calendar Days List */}
                <div className="divide-y divide-gray-200">
                  {(() => {
                    const month = new Date().getMonth()
                    const year = new Date().getFullYear()
                    const daysInMonth = new Date(year, month + 1, 0).getDate()
                    const mobileCalendar = []

                    for (let day = 1; day <= daysInMonth; day++) {
                      const date = new Date(year, month, day)
                      const isToday =
                        date.toDateString() === new Date().toDateString()
                      const dayEvents = allEvents.filter(
                        (event) => new Date(event.date).getDate() === day
                      )
                      const dayName = new Date(
                        year,
                        month,
                        day
                      ).toLocaleDateString('en-US', { weekday: 'short' })

                      if (dayEvents.length > 0) {
                        mobileCalendar.push(
                          <div key={`mobile-day-${day}`} className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <span
                                  className={`text-lg font-bold ${
                                    isToday
                                      ? 'bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center'
                                      : 'text-gray-900'
                                  }`}
                                >
                                  {day}
                                </span>
                                <span className="text-sm text-gray-600 font-medium">
                                  {dayName}
                                </span>
                              </div>
                              <span className="text-sm text-primary-600 font-medium">
                                {dayEvents.length} event
                                {dayEvents.length !== 1 ? 's' : ''}
                              </span>
                            </div>
                            <div className="space-y-3">
                              {dayEvents.map((event, index) => (
                                <div
                                  key={`mobile-event-${index}`}
                                  className="bg-primary-50 border border-primary-200 rounded-lg p-4"
                                >
                                  <h4 className="font-semibold text-primary-900 text-base mb-2">
                                    {event.title}
                                  </h4>
                                  {event.description && (
                                    <p className="text-sm text-primary-700 mb-3 line-clamp-2">
                                      {event.description}
                                    </p>
                                  )}
                                  <div className="flex items-center space-x-4 text-xs text-primary-700 mb-3">
                                    <span className="flex items-center space-x-1">
                                      <ClockIcon className="w-3 h-3" />
                                      <span>{event.time}</span>
                                    </span>
                                    <span className="flex items-center space-x-1">
                                      <MapPinIcon className="w-3 h-3" />
                                      <span>{event.location}</span>
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <div
                                        className={`w-3 h-3 rounded-full ${getEventTypeInfo(event.type).color}`}
                                      ></div>
                                      <span className="text-xs text-primary-600 font-medium">
                                        {getEventTypeInfo(event.type).label}
                                      </span>
                                    </div>
                                    <button className="text-xs bg-primary-600 text-white px-3 py-1 rounded hover:bg-primary-700 transition-colors">
                                      Details
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      }
                    }

                    // If no events this month, show a message
                    if (mobileCalendar.length === 0) {
                      return (
                        <div className="p-8 text-center text-gray-500">
                          <CalendarIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                          <p>No events scheduled for this month</p>
                        </div>
                      )
                    }

                    return mobileCalendar
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8 border border-primary-200 text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Get Involved!
            </h2>
            <p className="text-lg text-text-secondary mb-6 max-w-2xl mx-auto">
              Want to help organize events or have ideas for new activities?
              Join our events committee and make a difference in our school
              community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/volunteer"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                Volunteer for Events
              </a>
              <a
                href="/about"
                className="inline-flex items-center px-6 py-3 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
              >
                Learn About PTO
              </a>
            </div>
          </div>

          {/* Event Submission */}
          <div className="mt-16 bg-surface border border-border rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Have an Event Idea?
            </h2>
            <p className="text-text-secondary mb-6">
              Know of a great event or fundraiser that would benefit our school?
              We'd love to hear from you!
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors">
              <HeartIcon className="w-5 h-5 mr-2" />
              Suggest an Event
            </button>
          </div>
        </div>
      </Container>
    </div>
  )
}
