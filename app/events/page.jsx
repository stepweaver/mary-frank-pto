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
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showEventModal, setShowEventModal] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())

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

  const handleEventClick = (event) => {
    setSelectedEvent(event)
    setShowEventModal(true)
  }

  const closeEventModal = () => {
    setShowEventModal(false)
    setSelectedEvent(null)
  }

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    )
  }

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    )
  }

  const goToCurrentMonth = () => {
    setCurrentDate(new Date())
  }

  const openGoogleCalendar = (event) => {
    const startDate = new Date(event.date)
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // 1 hour later

    const formatDateForGoogle = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatDateForGoogle(startDate)}/${formatDateForGoogle(endDate)}&details=${encodeURIComponent(event.description || '')}&location=${encodeURIComponent(event.location)}`

    const newWindow = window.open(googleCalendarUrl, '_blank')
    if (newWindow) {
      newWindow.focus()
    } else {
      copyToClipboard(googleCalendarUrl)
    }
  }

  const openOutlookCalendar = (event) => {
    const startDate = new Date(event.date)
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // 1 hour later

    const formatDateForOutlook = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }

    const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.title)}&startdt=${formatDateForOutlook(startDate)}&enddt=${formatDateForOutlook(endDate)}&body=${encodeURIComponent(event.description || '')}&location=${encodeURIComponent(event.location)}`

    const newWindow = window.open(outlookUrl, '_blank')
    if (newWindow) {
      newWindow.focus()
    } else {
      copyToClipboard(outlookUrl)
    }
  }

  const downloadICSFile = (event) => {
    const startDate = new Date(event.date)
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // 1 hour later

    const formatDateForICS = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Mary Frank PTO//Event Calendar//EN',
      'BEGIN:VEVENT',
      `UID:${event.id}@maryfrankpto.org`,
      `DTSTAMP:${formatDateForICS(new Date())}`,
      `DTSTART:${formatDateForICS(startDate)}`,
      `DTEND:${formatDateForICS(endDate)}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description || ''}`,
      `LOCATION:${event.location}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const copyToClipboard = (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          // Optional: Show a success message
          console.log('Copied to clipboard')
        })
        .catch((err) => {
          console.error('Failed to copy: ', err)
          fallbackCopyTextToClipboard(text)
        })
    } else {
      fallbackCopyTextToClipboard(text)
    }
  }

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      console.log('Copied to clipboard')
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err)
    }
    document.body.removeChild(textArea)
  }

  const copyEventDetails = (event) => {
    const eventDetails = `${event.title}\nDate: ${formatDate(event.date)}\nTime: ${event.time}\nLocation: ${event.location}${event.description ? `\n\n${event.description}` : ''}`
    copyToClipboard(eventDetails)
  }

  // Transform Google Calendar events to match the original structure
  const transformedEvents = events.map((event) => ({
    id: event.id,
    title: event.title,
    date: event.start,
    end: event.end, // Add end date for multi-day events
    time: event.end
      ? `${formatTime(event.start)} - ${formatTime(event.end)}`
      : formatTime(event.start),
    location: event.location || 'TBD',
    type: getEventType(event),
    description: event.description || '',
    icon: getEventTypeInfo(getEventType(event)).icon,
    featured: false, // You can add logic to determine featured events
  }))

  console.log('Raw events:', events)
  console.log('Transformed events:', transformedEvents)

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
                  <div className="flex items-center justify-between">
                    <button
                      onClick={goToPreviousMonth}
                      className="p-2 text-primary-600 hover:bg-primary-100 rounded-lg transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <h2 className="text-3xl font-bold text-text-primary text-center">
                      {currentDate.toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </h2>
                    <button
                      onClick={goToNextMonth}
                      className="p-2 text-primary-600 hover:bg-primary-100 rounded-lg transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="text-center mt-2">
                    <button
                      onClick={goToCurrentMonth}
                      className="text-sm text-primary-600 hover:text-primary-800 underline cursor-pointer"
                    >
                      Today
                    </button>
                  </div>
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
                      const month = currentDate.getMonth()
                      const year = currentDate.getFullYear()
                      const daysInMonth = new Date(year, month + 1, 0).getDate()
                      const firstDayOfMonth = new Date(year, month, 1).getDay()
                      const calendarGrid = []

                      console.log('Calendar generation:', {
                        month,
                        year,
                        currentDate: currentDate.toISOString(),
                      })

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
                        const dayEvents = allEvents.filter((event) => {
                          const eventStartDate = new Date(event.date)
                          const eventEndDate = event.end
                            ? new Date(event.end)
                            : eventStartDate

                          // Check if the current day falls within the event's date range
                          const currentDayDate = new Date(year, month, day)

                          if (day === 1) {
                            console.log('Day 1 filtering:', {
                              day,
                              month,
                              year,
                              currentDayDate: currentDayDate.toISOString(),
                              allEventsCount: allEvents.length,
                              eventStartDate: eventStartDate.toISOString(),
                              eventEndDate: eventEndDate.toISOString(),
                              eventTitle: event.title,
                            })
                          }

                          // More robust date comparison - compare dates without time
                          const currentDayStart = new Date(
                            year,
                            month,
                            day,
                            0,
                            0,
                            0
                          )
                          const currentDayEnd = new Date(
                            year,
                            month,
                            day,
                            23,
                            59,
                            59
                          )

                          return (
                            eventStartDate <= currentDayEnd &&
                            eventEndDate >= currentDayStart
                          )
                        })

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
                              </div>

                              {/* Events Container */}
                              <div className="flex-1 space-y-2 overflow-y-auto">
                                {dayEvents.map((event, index) => (
                                  <div
                                    key={`event-${index}`}
                                    className="bg-primary-50 border border-primary-200 rounded-lg p-2 text-xs hover:bg-primary-100 transition-colors cursor-pointer"
                                    onClick={() => handleEventClick(event)}
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
                  <div className="flex items-center justify-between">
                    <button
                      onClick={goToPreviousMonth}
                      className="p-2 text-primary-600 hover:bg-primary-100 rounded-lg transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <h3 className="text-lg font-semibold text-primary-900 text-center">
                      {currentDate.toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </h3>
                    <button
                      onClick={goToNextMonth}
                      className="p-2 text-primary-600 hover:bg-primary-100 rounded-lg transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="text-center mt-2">
                    <button
                      onClick={goToCurrentMonth}
                      className="text-sm text-primary-600 hover:text-primary-800 underline cursor-pointer"
                    >
                      Today
                    </button>
                  </div>
                </div>

                {/* Mobile Calendar Days List */}
                <div className="divide-y divide-gray-200">
                  {(() => {
                    const month = currentDate.getMonth()
                    const year = currentDate.getFullYear()
                    const daysInMonth = new Date(year, month + 1, 0).getDate()
                    const mobileCalendar = []

                    console.log('Mobile calendar generation:', {
                      month,
                      year,
                      currentDate: currentDate.toISOString(),
                    })

                    for (let day = 1; day <= daysInMonth; day++) {
                      const date = new Date(year, month, day)
                      const isToday =
                        date.toDateString() === new Date().toDateString()
                      const dayEvents = allEvents.filter((event) => {
                        const eventStartDate = new Date(event.date)
                        const eventEndDate = event.end
                          ? new Date(event.end)
                          : eventStartDate

                        // Check if the current day falls within the event's date range
                        const currentDayDate = new Date(year, month, day)

                        if (day === 1) {
                          console.log('Mobile Day 1 filtering:', {
                            day,
                            month,
                            year,
                            currentDayDate: currentDayDate.toISOString(),
                            allEventsCount: allEvents.length,
                            eventStartDate: eventStartDate.toISOString(),
                            eventEndDate: eventEndDate.toISOString(),
                            eventTitle: event.title,
                          })
                        }

                        // More robust date comparison - compare dates without time
                        const currentDayStart = new Date(
                          year,
                          month,
                          day,
                          0,
                          0,
                          0
                        )
                        const currentDayEnd = new Date(
                          year,
                          month,
                          day,
                          23,
                          59,
                          59
                        )

                        return (
                          eventStartDate <= currentDayEnd &&
                          eventEndDate >= currentDayStart
                        )
                      })
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
                                    <button
                                      onClick={() => handleEventClick(event)}
                                      className="text-xs bg-primary-600 text-white px-3 py-1 rounded hover:bg-primary-700 transition-colors cursor-pointer"
                                    >
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

      {/* Event Details Modal */}
      {showEventModal && selectedEvent && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center p-4 z-50"
          onClick={closeEventModal}
        >
          <div
            className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedEvent.title}
                </h3>
                <button
                  onClick={closeEventModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <CalendarIcon className="w-5 h-5" />
                  <span>{formatDate(selectedEvent.date)}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <ClockIcon className="w-5 h-5" />
                  <span>{selectedEvent.time}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPinIcon className="w-5 h-5" />
                  <span>{selectedEvent.location}</span>
                </div>

                {selectedEvent.description && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Description
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {selectedEvent.description}
                    </p>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4 rounded-full ${getEventTypeInfo(selectedEvent.type).color}`}
                  ></div>
                  <span className="text-sm text-gray-600">
                    {getEventTypeInfo(selectedEvent.type).label}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => openGoogleCalendar(selectedEvent)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm cursor-pointer"
                  >
                    Add to Google Calendar
                  </button>
                  <button
                    onClick={() => openOutlookCalendar(selectedEvent)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer"
                  >
                    Add to Outlook Calendar
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => downloadICSFile(selectedEvent)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm cursor-pointer"
                  >
                    Download ICS
                  </button>
                  <button
                    onClick={() => copyEventDetails(selectedEvent)}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm cursor-pointer"
                  >
                    Copy Details
                  </button>
                </div>
                <button
                  onClick={closeEventModal}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
