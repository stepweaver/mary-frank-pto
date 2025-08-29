'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  NewspaperIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline'

const heroPanels = [
  {
    id: 'pto-branding',
    title: 'Mary Frank PTO',
    description: 'Connecting families, students, and staff for student success',
    bgColor: 'bg-slate-800',
    bgImage: '/slides/teacher-parent-chat.png',
    content: (
      <div className="space-y-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
          Mary Frank PTO
        </h1>
        <p className="text-white text-lg mb-4 max-w-2xl">
          We support our teachers, enhance student learning, and build strong
          partnerships.
        </p>
        <a
          href="/about"
          className="inline-flex items-center border-2 border-white bg-transparent text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-800 transition-all duration-300"
        >
          LEARN MORE
        </a>
      </div>
    ),
  },
  {
    id: 'events',
    title: 'Events',
    description:
      'Stay updated on all PTO meetings, fundraisers, and school events',
    bgColor: 'bg-teal-500',
    bgImage: '/slides/community-meeting.png',
    content: (
      <div className="space-y-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
          This Week Events
        </h1>
        <p className="text-white text-lg mb-4 max-w-2xl">
          Dont miss what is happening at Mary Frank this week.
        </p>
        <a
          href="/events"
          className="inline-flex items-center border-2 border-white bg-transparent text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-all duration-300"
        >
          VIEW CALENDAR
        </a>
      </div>
    ),
  },
  {
    id: 'volunteer',
    title: 'Volunteer',
    description:
      'Find opportunities to help and make a difference in our school',
    bgColor: 'bg-emerald-500',
    bgImage: '/slides/school-bus-arrival.png',
    content: (
      <div className="space-y-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
          Volunteer Opportunities
        </h1>
        <p className="text-white text-lg mb-4 max-w-2xl">
          Your help is needed right now. Join our community of volunteers.
        </p>
        <a
          href="/volunteer"
          className="inline-flex items-center border-2 border-white bg-transparent text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300"
        >
          GET INVOLVED
        </a>
      </div>
    ),
  },
  {
    id: 'news',
    title: 'News & Updates',
    description: 'Stay informed about PTO activities and school news',
    bgColor: 'bg-green-500',
    bgImage: '/slides/school-playground.png',
    content: (
      <div className="space-y-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
          Latest News
        </h1>
        <p className="text-white text-lg mb-4 max-w-2xl">
          Stay connected with our community and learn about the latest
          achievements.
        </p>
        <a
          href="/news"
          className="inline-flex items-center border-2 border-white bg-transparent text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300"
        >
          READ MORE
        </a>
      </div>
    ),
  },
]

export default function Hero() {
  const [expandedPanel, setExpandedPanel] = useState('pto-branding')
  const [events, setEvents] = useState([])
  const [volunteerOpportunities, setVolunteerOpportunities] = useState([])
  const [newsArticles, setNewsArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [volunteerLoading, setVolunteerLoading] = useState(false)
  const [newsLoading, setNewsLoading] = useState(false)

  useEffect(() => {
    if (expandedPanel === 'events') {
      fetchEvents()
    }
    if (expandedPanel === 'volunteer') {
      fetchVolunteerOpportunities()
    }
    if (expandedPanel === 'news') {
      fetchNewsArticles()
    }
  }, [expandedPanel])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/events?maxResults=3')
      const data = await response.json()
      if (data.success) {
        setEvents(data.data.events)
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchVolunteerOpportunities = async () => {
    setVolunteerLoading(true)
    try {
      const response = await fetch('/api/contentful/volunteer')
      const data = await response.json()
      if (data.success) {
        setVolunteerOpportunities(data.data)
      }
    } catch (error) {
      console.error('Error fetching volunteer opportunities:', error)
    } finally {
      setVolunteerLoading(false)
    }
  }

  const fetchNewsArticles = async () => {
    setNewsLoading(true)
    try {
      const response = await fetch('/api/contentful/news')
      const data = await response.json()
      if (data.success) {
        setNewsArticles(data.data)
      }
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setNewsLoading(false)
    }
  }

  const handlePanelClick = (panelId) => {
    if (expandedPanel !== panelId) {
      setExpandedPanel(panelId)
    }
  }

  const formatEventTime = (startTime) => {
    const time = new Date(startTime)
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  const formatEventDate = (startTime) => {
    const date = new Date(startTime)
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

  const formatEventDateTime = (event) => {
    const startDate = new Date(event.start)
    const endDate = event.end ? new Date(event.end) : null
    const isMultiDay =
      endDate && startDate.toDateString() !== endDate.toDateString()

    if (isMultiDay) {
      return (
        <span>
          {startDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}
          , {formatEventTime(event.start)} -{' '}
          {endDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}
          , {formatEventTime(event.end)}
        </span>
      )
    } else {
      return (
        <span>
          {startDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}
          , {formatEventTime(event.start)}
        </span>
      )
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

  const formatNewsDate = (dateString) => {
    if (!dateString) return 'Recently'
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      'teacher-support': 'bg-blue-500',
      fundraising: 'bg-green-500',
      events: 'bg-purple-500',
      community: 'bg-orange-500',
      default: 'bg-gray-500',
    }
    return colors[category] || colors.default
  }

  const handleVolunteerClick = (opportunity) => {
    // TODO: Open modal with signup form
    console.log('Volunteer opportunity clicked:', opportunity)
  }

  return (
    <section className="relative w-full overflow-hidden">
      <div className="flex flex-col md:flex-row h-full min-h-[70vh]">
        {heroPanels.map((panel) => (
          <div
            key={panel.id}
            className={`relative group transition-all duration-500 ease-in-out overflow-hidden ${
              expandedPanel === panel.id
                ? 'md:flex-[3] z-20 ring-4 ring-white/30 shadow-2xl'
                : 'md:flex-1 opacity-75 cursor-pointer'
            } ${expandedPanel === panel.id ? 'flex-1' : 'flex-1'}`}
            onClick={() => handlePanelClick(panel.id)}
          >
            <div className="absolute inset-0">
              <Image
                src={panel.bgImage}
                alt={panel.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover w-full h-full"
                priority={panel.id === 'pto-branding'}
              />
              <div className={`absolute inset-0 ${panel.bgColor} opacity-85`} />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-center p-4 lg:p-6">
              {expandedPanel === panel.id ? (
                <div className="h-full flex flex-col justify-center items-center">
                  <div className="w-full max-w-4xl">
                    {panel.id === 'events' ? (
                      <div className="space-y-4">
                        <div className="mb-4">
                          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                            Upcoming Events
                          </h1>
                          <p className="text-white text-lg max-w-2xl">
                            Don't miss a thing!
                          </p>
                        </div>

                        {loading ? (
                          <div>
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                            <p className="text-white mt-2">Loading events...</p>
                          </div>
                        ) : events.length > 0 ? (
                          <div className="max-w-4xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                              {/* This Week */}
                              <div className="space-y-3">
                                <h3 className="text-white font-semibold text-base text-center mb-3">
                                  This Week
                                </h3>
                                {events
                                  .filter((event) => {
                                    const eventDate = new Date(event.start)
                                    const today = new Date()
                                    const weekFromNow = new Date(
                                      today.getTime() + 7 * 24 * 60 * 60 * 1000
                                    )
                                    return (
                                      eventDate >= today &&
                                      eventDate <= weekFromNow
                                    )
                                  })
                                  .slice(0, 3)
                                  .map((event) => (
                                    <div
                                      key={event.id}
                                      className="bg-white/15 backdrop-blur-sm rounded-lg p-3 border border-white/20"
                                    >
                                      <div className="text-white font-medium text-sm mb-2">
                                        {event.title}
                                      </div>
                                      {event.description && (
                                        <div className="text-white/90 text-xs mb-2 leading-relaxed">
                                          {event.description}
                                        </div>
                                      )}
                                      {event.location && (
                                        <div className="flex items-center text-white text-xs mb-1">
                                          <MapPinIcon className="h-3 w-3 mr-1 text-green-200" />
                                          <span>{event.location}</span>
                                        </div>
                                      )}
                                      <div className="text-white text-xs">
                                        {formatEventDateTime(event)}
                                      </div>
                                    </div>
                                  ))}
                                {events.filter((event) => {
                                  const eventDate = new Date(event.start)
                                  const today = new Date()
                                  const weekFromNow = new Date(
                                    today.getTime() + 7 * 24 * 60 * 60 * 1000
                                  )
                                  return (
                                    eventDate >= today &&
                                    eventDate <= weekFromNow
                                  )
                                }).length === 0 && (
                                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 text-center">
                                    <div className="text-white/60 text-xs">
                                      No events this week
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Next Week */}
                              <div className="space-y-3">
                                <h3 className="text-white font-semibold text-base text-center mb-3">
                                  Next Week
                                </h3>
                                {events
                                  .filter((event) => {
                                    const eventDate = new Date(event.start)
                                    const today = new Date()
                                    const weekFromNow = new Date(
                                      today.getTime() + 7 * 24 * 60 * 60 * 1000
                                    )
                                    const twoWeeksFromNow = new Date(
                                      today.getTime() + 14 * 24 * 60 * 60 * 1000
                                    )
                                    return (
                                      eventDate > weekFromNow &&
                                      eventDate <= twoWeeksFromNow
                                    )
                                  })
                                  .slice(0, 3)
                                  .map((event) => (
                                    <div
                                      key={event.id}
                                      className="bg-white/15 backdrop-blur-sm rounded-lg p-3 border border-white/20"
                                    >
                                      <div className="text-white font-medium text-sm mb-2">
                                        {event.title}
                                      </div>
                                      {event.description && (
                                        <div className="text-white/90 text-xs mb-2 leading-relaxed">
                                          {event.description}
                                        </div>
                                      )}
                                      {event.location && (
                                        <div className="flex items-center text-white text-xs mb-1">
                                          <MapPinIcon className="h-3 w-3 mr-1 text-green-200" />
                                          <span>{event.location}</span>
                                        </div>
                                      )}
                                      <div className="text-white text-xs">
                                        {formatEventDateTime(event)}
                                      </div>
                                    </div>
                                  ))}
                                {events.filter((event) => {
                                  const eventDate = new Date(event.start)
                                  const today = new Date()
                                  const weekFromNow = new Date(
                                    today.getTime() + 7 * 24 * 60 * 60 * 1000
                                  )
                                  const twoWeeksFromNow = new Date(
                                    today.getTime() + 14 * 24 * 60 * 60 * 1000
                                  )
                                  return (
                                    eventDate > weekFromNow &&
                                    eventDate <= twoWeeksFromNow
                                  )
                                }).length === 0 && (
                                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 text-center">
                                    <div className="text-white/60 text-xs">
                                      No events next week
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Upcoming */}
                              <div className="space-y-3">
                                <h3 className="text-white font-semibold text-base text-center mb-3">
                                  Upcoming
                                </h3>
                                {events
                                  .filter((event) => {
                                    const eventDate = new Date(event.start)
                                    const today = new Date()
                                    const twoWeeksFromNow = new Date(
                                      today.getTime() + 14 * 24 * 60 * 60 * 1000
                                    )
                                    return eventDate > twoWeeksFromNow
                                  })
                                  .slice(0, 3)
                                  .map((event) => (
                                    <div
                                      key={event.id}
                                      className="bg-white/15 backdrop-blur-sm rounded-lg p-3 border border-white/20"
                                    >
                                      <div className="text-white font-medium text-sm mb-2">
                                        {event.title}
                                      </div>
                                      {event.description && (
                                        <div className="text-white/90 text-xs mb-2 leading-relaxed">
                                          {event.description}
                                        </div>
                                      )}
                                      {event.location && (
                                        <div className="flex items-center text-white text-white/90 text-xs mb-1">
                                          <MapPinIcon className="h-3 w-3 mr-1 text-green-200" />
                                          <span>{event.location}</span>
                                        </div>
                                      )}
                                      <div className="text-white text-xs">
                                        {formatEventDateTime(event)}
                                      </div>
                                    </div>
                                  ))}
                                {events.filter((event) => {
                                  const eventDate = new Date(event.start)
                                  const today = new Date()
                                  const twoWeeksFromNow = new Date(
                                    today.getTime() + 14 * 24 * 60 * 60 * 1000
                                  )
                                  return eventDate > twoWeeksFromNow
                                }).length === 0 && (
                                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 text-center">
                                    <div className="text-white/60 text-xs">
                                      No upcoming events
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="text-white/80 text-lg">
                              No upcoming events this week
                            </p>
                          </div>
                        )}

                        <div className="mt-4">
                          <a
                            href="/events"
                            className="inline-flex items-center border-2 border-white bg-transparent text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-all duration-300"
                          >
                            VIEW FULL CALENDAR
                          </a>
                        </div>
                      </div>
                    ) : panel.id === 'volunteer' ? (
                      <div className="space-y-4">
                        <div className="mb-4">
                          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                            Volunteer Opportunities
                          </h1>
                          <p className="text-white text-lg max-w-2xl">
                            Your help is needed right now. Join our community of
                            volunteers.
                          </p>
                        </div>

                        {volunteerLoading ? (
                          <div>
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                            <p className="text-white mt-2">
                              Loading opportunities...
                            </p>
                          </div>
                        ) : volunteerOpportunities.length > 0 ? (
                          <div className="max-w-4xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {volunteerOpportunities
                                .slice(0, 6)
                                .map((opportunity) => (
                                  <div
                                    key={opportunity.id}
                                    className="bg-white/15 backdrop-blur-sm rounded-lg p-3 border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-200"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleVolunteerClick(opportunity)
                                    }}
                                  >
                                    <div className="mb-2">
                                      <h3 className="text-white font-semibold text-sm leading-tight">
                                        {opportunity.title}
                                      </h3>
                                    </div>

                                    {opportunity.description && (
                                      <div className="text-white/90 text-xs mb-2 leading-relaxed line-clamp-2">
                                        {opportunity.description}
                                      </div>
                                    )}

                                    <div className="space-y-1.5">
                                      {opportunity.date && (
                                        <div className="flex items-center text-white/80 text-xs">
                                          <ClockIcon className="h-3 w-3 mr-2 text-green-200" />
                                          <span>
                                            {formatVolunteerDate(
                                              opportunity.date
                                            )}
                                          </span>
                                          {opportunity.time && (
                                            <span className="ml-1">
                                              • {opportunity.time}
                                            </span>
                                          )}
                                        </div>
                                      )}

                                      {opportunity.location && (
                                        <div className="flex items-center text-white/80 text-xs">
                                          <MapPinIcon className="h-3 w-3 mr-2 text-green-200" />
                                          <span>{opportunity.location}</span>
                                        </div>
                                      )}

                                      <div className="flex items-center text-white/80 text-xs">
                                        <UserGroupIcon className="h-3 w-3 mr-2 text-green-200" />
                                        <span>
                                          {opportunity.spots} spots available
                                        </span>
                                      </div>
                                    </div>

                                    <div className="mt-2 pt-2 border-t border-white/20">
                                      <button className="w-full bg-white/20 hover:bg-white/30 text-white text-xs font-medium py-1.5 px-3 rounded transition-colors duration-200">
                                        Sign Up
                                      </button>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="text-white/80 text-lg">
                              No volunteer opportunities available at the moment
                            </p>
                          </div>
                        )}

                        <div className="mt-4">
                          <a
                            href="/volunteer"
                            className="inline-flex items-center border-2 border-white bg-transparent text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300"
                          >
                            VIEW ALL OPPORTUNITIES
                          </a>
                        </div>
                      </div>
                    ) : panel.id === 'news' ? (
                      <div className="space-y-4">
                        <div className="mb-4">
                          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                            Latest News & Updates
                          </h1>
                          <p className="text-white text-lg max-w-2xl">
                            Stay connected with our community and learn about
                            the latest achievements.
                          </p>
                        </div>

                        {newsLoading ? (
                          <div>
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                            <p className="text-white mt-2">Loading news...</p>
                          </div>
                        ) : newsArticles.length > 0 ? (
                          <div className="max-w-4xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                              {newsArticles.slice(0, 6).map((article) => (
                                <div
                                  key={article.id}
                                  className="bg-white/15 backdrop-blur-sm rounded-lg overflow-hidden border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer"
                                  onClick={() =>
                                    window.open(
                                      `/news/${article.slug}`,
                                      '_blank'
                                    )
                                  }
                                >
                                  {article.featuredImage && (
                                    <div className="relative h-32 w-full">
                                      <Image
                                        src={article.featuredImage}
                                        alt={article.imageAlt || article.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover"
                                      />
                                      <div className="absolute inset-0 bg-black/20" />
                                    </div>
                                  )}

                                  <div className="p-4">
                                    <h3 className="text-white font-semibold text-sm leading-tight mb-2 line-clamp-2">
                                      {article.title}
                                    </h3>

                                    {article.excerpt && (
                                      <div className="text-white/90 text-xs mb-2 leading-relaxed line-clamp-3">
                                        {article.excerpt}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="text-white/80 text-lg">
                              No news articles available at the moment
                            </p>
                          </div>
                        )}

                        <div className="mt-4">
                          <a
                            href="/news"
                            className="inline-flex items-center border-2 border-white bg-transparent text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300"
                          >
                            VIEW ALL NEWS
                          </a>
                        </div>
                      </div>
                    ) : (
                      panel.content
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center text-white h-full flex flex-col justify-center items-center">
                  <div className="space-y-3">
                    <h2 className="text-xl lg:text-2xl font-bold drop-shadow-lg">
                      {panel.title}
                    </h2>
                    <p className="text-sm lg:text-base opacity-90 drop-shadow-md px-2">
                      {panel.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
