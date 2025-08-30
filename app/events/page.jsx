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

// TODO: Replace with real data from CMS/API
// - Integrate with Contentful, Strapi, or custom API
// - Add real-time event updates
// - Implement event filtering and search
// - Add pagination for large event lists
// - Include event registration/RSVP functionality
const upcomingEvents = [
  {
    id: 1,
    title: 'PTO General Meeting',
    date: '2024-01-15',
    time: '6:30 PM - 8:00 PM',
    location: 'School Library',
    type: 'meeting',
    description:
      'Monthly PTO meeting to discuss upcoming events, budget updates, and volunteer opportunities. All parents are welcome to attend.',
    icon: UserGroupIcon,
    featured: true,
    // TODO: Add real event fields:
    // - registrationRequired: boolean
    // - maxAttendees: number
    // - currentAttendees: number
    // - eventImage: string (URL)
    // - contactPerson: string
    // - contactEmail: string
    // - contactPhone: string
    // - eventUrl: string (external link)
    // - tags: string[]
    // - category: string
    // - ageGroup: string
    // - cost: number
    // - isRecurring: boolean
    // - recurrencePattern: string
  },
  {
    id: 2,
    title: 'Spirit Wear Sales',
    date: '2024-01-20',
    time: 'All Day',
    location: 'Online & School Office',
    type: 'fundraiser',
    description:
      'Order your Mary Frank Mustangs spirit wear! Hoodies, t-shirts, and accessories available. Orders delivered to school for pickup.',
    icon: ShoppingBagIcon,
    featured: false,
  },
  {
    id: 3,
    title: 'Teacher Appreciation Week',
    date: '2024-02-05',
    time: 'All Week',
    location: 'School-wide',
    type: 'appreciation',
    description:
      'Show our amazing teachers how much we care! Daily themes and activities to celebrate our dedicated staff.',
    icon: HeartIcon,
    featured: true,
  },
  {
    id: 4,
    title: 'Book Fair',
    date: '2024-02-12',
    time: '8:00 AM - 4:00 PM',
    location: 'School Gymnasium',
    type: 'fundraiser',
    description:
      "Scholastic Book Fair featuring the latest children's books. Proceeds benefit our school library and literacy programs.",
    icon: BookOpenIcon,
    featured: false,
  },
  {
    id: 5,
    title: 'Family Fun Night',
    date: '2024-02-23',
    time: '6:00 PM - 8:00 PM',
    location: 'School Cafeteria & Gym',
    type: 'social',
    description:
      'Join us for an evening of games, activities, and fun for the whole family! Food trucks, face painting, and more.',
    icon: MusicalNoteIcon,
    featured: true,
  },
  {
    id: 6,
    title: 'Spring Picture Day',
    date: '2024-03-08',
    time: 'During School Hours',
    location: 'School Auditorium',
    type: 'school',
    description:
      'Spring portrait sessions for all students. Professional photography with multiple background options.',
    icon: CameraIcon,
    featured: false,
  },
  {
    id: 7,
    title: 'Running is Elementary',
    date: '2024-04-15',
    time: '2:00 PM - 3:00 PM',
    location: 'School Track',
    type: 'fitness',
    description:
      'Annual one-mile run for 4th and 5th grade students. Promote fitness and school spirit!',
    icon: TrophyIcon,
    featured: true,
  },
  {
    id: 8,
    title: "Beef O'Brady's Give Back Night",
    date: '2024-04-22',
    time: '5:00 PM - 9:00 PM',
    location: "Beef O'Brady's Granger",
    type: 'fundraiser',
    description:
      "Dine at Beef O'Brady's and 20% of your bill goes to Mary Frank PTO! Mention our school when ordering.",
    icon: FireIcon,
    featured: false,
  },
  {
    id: 9,
    title: 'Volunteer Appreciation Luncheon',
    date: '2024-05-10',
    time: '11:30 AM - 1:00 PM',
    location: 'School Cafeteria',
    type: 'appreciation',
    description:
      'Special luncheon to thank all our amazing volunteers for their dedication throughout the school year.',
    icon: GiftIcon,
    featured: false,
  },
  {
    id: 10,
    title: 'End of Year Celebration',
    date: '2024-05-24',
    time: '5:00 PM - 7:00 PM',
    location: 'School Playground',
    type: 'social',
    description:
      'Celebrate the end of another great school year with games, food, and fun activities for all families.',
    icon: StarIcon,
    featured: true,
  },
]

// TODO: Move event types to CMS/API configuration
// - Allow PTO admins to add/edit event types
// - Support custom colors and icons
// - Add type descriptions and usage guidelines
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

// TODO: Implement proper event type lookup with error handling
// - Add validation for event types
// - Handle missing event types gracefully
// - Add fallback icon and color
const getEventTypeInfo = (type) => {
  return eventTypes.find((t) => t.type === type) || eventTypes[0]
}

// TODO: Enhance date formatting and timezone handling
// - Add timezone support for events
// - Format relative dates (e.g., "Tomorrow", "Next Week")
// - Handle recurring events
// - Add date validation
// - Support multiple date formats
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

// TODO: Add state management for events
// - Implement loading states
// - Add error handling for failed API calls
// - Add event filtering and search
// - Implement event pagination
// - Add event sorting options
export default function Events() {
  // TODO: Add React hooks for data management
  // const [events, setEvents] = useState([])
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(null)
  // const [filterType, setFilterType] = useState('all')
  // const [searchQuery, setSearchQuery] = useState('')
  // const [currentPage, setCurrentPage] = useState(1)

  // TODO: Add useEffect for data fetching
  // useEffect(() => {
  //   fetchEvents()
  // }, [])

  // TODO: Implement data fetching function
  // const fetchEvents = async () => {
  //   try {
  //     setLoading(true)
  //     const response = await fetch('/api/events')
  //     const data = await response.json()
  //     setEvents(data)
  //   } catch (err) {
  //     setError(err.message)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // TODO: Add event filtering function
  // const filteredEvents = events.filter(event => {
  //   if (filterType !== 'all' && event.type !== filterType) return false
  //   if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
  //   return true
  // })

  // TODO: Add event search and filter UI
  // - Search input field
  // - Type filter dropdown
  // - Date range picker
  // - Featured events toggle

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

          {/* TODO: Add search and filter controls */}
          {/* <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search events..."
                className="flex-1 px-4 py-2 border border-border rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg"
              >
                <option value="all">All Types</option>
                {eventTypes.map(type => (
                  <option key={type.type} value={type.type}>{type.label}</option>
                ))}
              </select>
            </div>
          </div> */}

          {/* Event Type Legend */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">
              Event Types
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {eventTypes.map((eventType) => (
                <div
                  key={eventType.type}
                  className="flex items-center space-x-2 bg-surface border border-border rounded-lg px-4 py-2"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${eventType.color}`}
                  ></div>
                  <span className="text-text-secondary text-sm font-medium">
                    {eventType.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* TODO: Add loading state */}
          {/* {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-text-secondary">Loading events...</p>
            </div>
          )} */}

          {/* TODO: Add error state */}
          {/* {error && (
            <div className="text-center py-12">
              <p className="text-red-600">Error loading events: {error}</p>
              <button onClick={fetchEvents} className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg">
                Try Again
              </button>
            </div>
          )} */}

          {/* Featured Events */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
              Featured Events
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents
                .filter((event) => event.featured)
                .map((event) => (
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

                    {/* TODO: Implement event detail modal/page */}
                    <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                      Learn More
                    </button>
                  </div>
                ))}
            </div>
          </div>

          {/* All Events List */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
              All Upcoming Events
            </h2>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-surface border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-10 h-10 ${getEventTypeInfo(event.type).color} rounded-lg flex items-center justify-center flex-shrink-0`}
                        >
                          <event.icon className="w-5 h-5 text-white" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-bold text-text-primary text-lg">
                              {event.title}
                            </h3>
                            {event.featured && (
                              <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full font-medium">
                                Featured
                              </span>
                            )}
                          </div>

                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center space-x-2 text-text-secondary">
                              <CalendarIcon className="w-4 h-4" />
                              <span>{formatDate(event.date)}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-text-secondary">
                              <ClockIcon className="w-4 h-4" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-text-secondary">
                              <MapPinIcon className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                          </div>

                          <p className="text-text-secondary text-sm mt-3">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      {/* TODO: Implement event detail modal/page */}
                      <button className="bg-primary-600 text-white py-2 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TODO: Add pagination for large event lists */}
          {/* <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <button className="px-3 py-2 border border-border rounded-lg hover:bg-primary-50">
                Previous
              </button>
              <span className="px-3 py-2">Page 1 of 3</span>
              <button className="px-3 py-2 border border-border rounded-lg hover:bg-primary-50">
                Next
              </button>
            </div>
          </div> */}

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
            {/* TODO: Implement event submission form */}
            {/* - Add form modal/page */}
            {/* - Include fields: title, description, suggested date, contact info */}
            {/* - Add form validation */}
            {/* - Send to PTO email or CMS */}
            {/* - Add success/error feedback */}
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
