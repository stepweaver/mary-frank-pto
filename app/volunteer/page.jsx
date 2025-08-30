'use client'

import Container from '@/components/layout/Container'
import {
  HeartIcon,
  UserGroupIcon,
  AcademicCapIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  StarIcon,
  TrophyIcon,
  GiftIcon,
  BookOpenIcon,
  CameraIcon,
  ComputerDesktopIcon,
  PhoneIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  PlusIcon,
  ChevronRightIcon,
  SparklesIcon,
  HandRaisedIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'

// TODO: Replace with real data from CMS/API
// - Integrate with volunteer management system
// - Add real-time opportunity updates
// - Include volunteer registration/RSVP functionality
// - Add volunteer tracking and management
const volunteerOpportunities = [
  {
    id: 1,
    title: 'PTO Event Volunteers',
    description: 'Help organize and run PTO events throughout the school year',
    category: 'events',
    timeCommitment: '2-4 hours per event',
    frequency: 'As needed',
    location: 'School campus',
    icon: CalendarIcon,
    featured: true,
    currentVolunteers: 8,
    neededVolunteers: 15,
    skills: ['Organization', 'Communication', 'Event Planning'],
    impact: 'Directly supports student activities and community building',
  },
  {
    id: 2,
    title: 'Classroom Reading Helpers',
    description:
      'Assist teachers with reading activities and literacy programs',
    category: 'classroom',
    timeCommitment: '1-2 hours per week',
    frequency: 'Weekly',
    location: 'Individual classrooms',
    icon: BookOpenIcon,
    featured: true,
    currentVolunteers: 12,
    neededVolunteers: 20,
    skills: ['Patience', 'Reading Skills', 'Working with Children'],
    impact: 'Improves student reading skills and confidence',
  },
  {
    id: 3,
    title: 'Math Tutoring Support',
    description: 'Provide one-on-one or small group math assistance',
    category: 'classroom',
    timeCommitment: '1-2 hours per week',
    frequency: 'Weekly',
    location: 'Classrooms or library',
    icon: AcademicCapIcon,
    featured: false,
    currentVolunteers: 6,
    neededVolunteers: 12,
    skills: ['Math Skills', 'Teaching', 'Patience'],
    impact: 'Helps students build strong math foundations',
  },
  {
    id: 4,
    title: 'Office Support Team',
    description: 'Assist with administrative tasks and office operations',
    category: 'administrative',
    timeCommitment: '2-3 hours per week',
    frequency: 'Weekly',
    location: 'School office',
    icon: PhoneIcon,
    featured: false,
    currentVolunteers: 4,
    neededVolunteers: 8,
    skills: ['Organization', 'Computer Skills', 'Customer Service'],
    impact: 'Keeps school operations running smoothly',
  },
  {
    id: 5,
    title: 'Art & Creative Projects',
    description: 'Support art teachers and creative classroom activities',
    category: 'classroom',
    timeCommitment: '1-3 hours per project',
    frequency: 'Monthly',
    location: 'Art room and classrooms',
    icon: SparklesIcon,
    featured: false,
    currentVolunteers: 3,
    neededVolunteers: 10,
    skills: ['Creativity', 'Art Skills', 'Patience'],
    impact: 'Enhances student creativity and artistic expression',
  },
  {
    id: 6,
    title: 'Technology Support',
    description: 'Help with computer labs and technology integration',
    category: 'technical',
    timeCommitment: '2-4 hours per week',
    frequency: 'Weekly',
    location: 'Computer lab and classrooms',
    icon: ComputerDesktopIcon,
    featured: false,
    currentVolunteers: 2,
    neededVolunteers: 6,
    skills: ['Computer Skills', 'Problem Solving', 'Teaching'],
    impact: 'Prepares students for digital learning',
  },
  {
    id: 7,
    title: 'Yearbook Committee',
    description: 'Help create and organize the school yearbook',
    category: 'special',
    timeCommitment: '3-5 hours per month',
    frequency: 'Monthly',
    location: 'School and home',
    icon: CameraIcon,
    featured: false,
    currentVolunteers: 5,
    neededVolunteers: 8,
    skills: ['Photography', 'Design', 'Organization'],
    impact: 'Creates lasting memories for students and families',
  },
  {
    id: 8,
    title: 'Hospitality Committee',
    description: 'Welcome new families and organize appreciation events',
    category: 'community',
    timeCommitment: '2-3 hours per month',
    frequency: 'Monthly',
    location: 'School and community',
    icon: GiftIcon,
    featured: false,
    currentVolunteers: 4,
    neededVolunteers: 8,
    skills: ['Communication', 'Hospitality', 'Organization'],
    impact: 'Builds strong school community relationships',
  },
]

const volunteerCategories = [
  {
    category: 'events',
    label: 'PTO Events',
    color: 'bg-primary-600',
    icon: CalendarIcon,
    description: 'Help organize and run PTO activities',
  },
  {
    category: 'classroom',
    label: 'Classroom Support',
    color: 'bg-primary-500',
    icon: AcademicCapIcon,
    description: 'Direct support for teachers and students',
  },
  {
    category: 'administrative',
    label: 'Office Support',
    color: 'bg-primary-700',
    icon: PhoneIcon,
    description: 'Administrative and operational help',
  },
  {
    category: 'technical',
    label: 'Technology',
    color: 'bg-primary-400',
    icon: ComputerDesktopIcon,
    description: 'Computer and technology assistance',
  },
  {
    category: 'special',
    label: 'Special Projects',
    color: 'bg-primary-300',
    icon: StarIcon,
    description: 'Unique and seasonal opportunities',
  },
  {
    category: 'community',
    label: 'Community Building',
    color: 'bg-primary-800',
    icon: UsersIcon,
    description: 'Building school community spirit',
  },
]

const getCategoryInfo = (category) => {
  return (
    volunteerCategories.find((c) => c.category === category) ||
    volunteerCategories[0]
  )
}

const getProgressPercentage = (current, needed) => {
  return Math.min((current / needed) * 100, 100)
}

export default function Volunteer() {
  return (
    <div className="min-h-screen">
      <Container className="py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-text-primary mb-6">
              Make a Difference
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-8">
              Join our community of dedicated volunteers and help create amazing
              experiences for Mary Frank Elementary students, teachers, and
              families.
            </p>

            {/* Volunteer Impact Stats */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-surface border border-border rounded-xl p-6">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  44
                </div>
                <div className="text-text-secondary">Active Volunteers</div>
              </div>
              <div className="bg-surface border border-border rounded-xl p-6">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  200+
                </div>
                <div className="text-text-secondary">Hours This Month</div>
              </div>
              <div className="bg-surface border border-border rounded-xl p-6">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  489
                </div>
                <div className="text-text-secondary">Students Impacted</div>
              </div>
            </div>
          </div>

          {/* Volunteer Categories */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
              How You Can Help
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {volunteerCategories.map((cat) => (
                <div
                  key={cat.category}
                  className="bg-surface border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`w-12 h-12 ${cat.color} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <cat.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-text-primary text-lg mb-2">
                    {cat.label}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    {cat.description}
                  </p>
                  <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                    View Opportunities
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Opportunities */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
              Featured Volunteer Opportunities
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {volunteerOpportunities
                .filter((opp) => opp.featured)
                .map((opportunity) => (
                  <div
                    key={opportunity.id}
                    className="bg-surface border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 ${getCategoryInfo(opportunity.category).color} rounded-lg flex items-center justify-center`}
                      >
                        <opportunity.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm text-text-muted bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                        {getCategoryInfo(opportunity.category).label}
                      </span>
                    </div>

                    <h3 className="font-bold text-text-primary text-xl mb-3">
                      {opportunity.title}
                    </h3>
                    <p className="text-text-secondary mb-4">
                      {opportunity.description}
                    </p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center space-x-2 text-text-secondary text-sm">
                        <ClockIcon className="w-4 h-4" />
                        <span>{opportunity.timeCommitment}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-text-secondary text-sm">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{opportunity.frequency}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-text-secondary text-sm">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{opportunity.location}</span>
                      </div>
                    </div>

                    {/* Volunteer Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-text-secondary mb-2">
                        <span>
                          Volunteers: {opportunity.currentVolunteers}/
                          {opportunity.neededVolunteers}
                        </span>
                        <span>
                          {Math.round(
                            getProgressPercentage(
                              opportunity.currentVolunteers,
                              opportunity.neededVolunteers
                            )
                          )}
                          %
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${getProgressPercentage(opportunity.currentVolunteers, opportunity.neededVolunteers)}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                        Sign Up
                      </button>
                      <button className="flex-1 border border-primary-600 text-primary-600 py-2 px-4 rounded-lg hover:bg-primary-50 transition-colors font-medium">
                        Learn More
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* All Opportunities */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
              All Volunteer Opportunities
            </h2>
            <div className="space-y-4">
              {volunteerOpportunities.map((opportunity) => (
                <div
                  key={opportunity.id}
                  className="bg-surface border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-10 h-10 ${getCategoryInfo(opportunity.category).color} rounded-lg flex items-center justify-center flex-shrink-0`}
                        >
                          <opportunity.icon className="w-5 h-5 text-white" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-bold text-text-primary text-lg">
                              {opportunity.title}
                            </h3>
                            {opportunity.featured && (
                              <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full font-medium">
                                Featured
                              </span>
                            )}
                            <span className="text-xs text-text-muted bg-gray-100 px-2 py-1 rounded-full">
                              {getCategoryInfo(opportunity.category).label}
                            </span>
                          </div>

                          <p className="text-text-secondary text-sm mb-3">
                            {opportunity.description}
                          </p>

                          <div className="grid md:grid-cols-4 gap-4 text-sm mb-3">
                            <div className="flex items-center space-x-2 text-text-secondary">
                              <ClockIcon className="w-4 h-4" />
                              <span>{opportunity.timeCommitment}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-text-secondary">
                              <CalendarIcon className="w-4 h-4" />
                              <span>{opportunity.frequency}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-text-secondary">
                              <MapPinIcon className="w-4 h-4" />
                              <span>{opportunity.location}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-text-secondary">
                              <UserGroupIcon className="w-4 h-4" />
                              <span>
                                {opportunity.currentVolunteers}/
                                {opportunity.neededVolunteers}
                              </span>
                            </div>
                          </div>

                          {/* Skills Needed */}
                          <div className="flex flex-wrap gap-2">
                            {opportunity.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col gap-2">
                      <button className="bg-primary-600 text-white py-2 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                        Sign Up
                      </button>
                      <button className="border border-primary-600 text-primary-600 py-2 px-6 rounded-lg hover:bg-primary-50 transition-colors font-medium">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8 mb-16 border border-primary-200">
            <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
              Why Volunteer?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HeartIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">
                  Make an Impact
                </h3>
                <p className="text-text-secondary text-sm">
                  Directly help students succeed and teachers thrive
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UsersIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">
                  Build Community
                </h3>
                <p className="text-text-secondary text-sm">
                  Connect with other parents and school staff
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <StarIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">
                  Gain Experience
                </h3>
                <p className="text-text-secondary text-sm">
                  Develop new skills and leadership abilities
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrophyIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">
                  Get Recognition
                </h3>
                <p className="text-text-secondary text-sm">
                  Be celebrated for your contributions
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-surface border-2 border-primary-200 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-text-secondary mb-6 max-w-2xl mx-auto">
              Join our amazing team of volunteers and help make Mary Frank
              Elementary the best it can be for our students and community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors text-lg">
                <HandRaisedIcon className="w-6 h-6 mr-2" />
                Become a Volunteer
              </button>
              <a
                href="/events"
                className="inline-flex items-center px-8 py-4 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors text-lg"
              >
                View Upcoming Events
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-surface border border-border rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Questions About Volunteering?
            </h2>
            <p className="text-text-secondary mb-6">
              Our volunteer coordinator is here to help you find the perfect
              opportunity and answer any questions you might have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:volunteer@maryfrankpto.org"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                <EnvelopeIcon className="w-5 h-5 mr-2" />
                Email Us
              </a>
              <a
                href="tel:+15742720340"
                className="inline-flex items-center px-6 py-3 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
              >
                <PhoneIcon className="w-5 h-5 mr-2" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
