'use client'

import { useState, useEffect } from 'react'
import Container from '@/components/layout/Container'
import {
  UserGroupIcon,
  GiftIcon,
  HeartIcon,
  StarIcon,
  AcademicCapIcon,
  SparklesIcon,
  HandRaisedIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  CreditCardIcon,
  BookOpenIcon,
  UserIcon,
  CalendarDaysIcon,
  BuildingOfficeIcon,
  BeakerIcon,
  HomeIcon,
  SunIcon,
} from '@heroicons/react/24/outline'

export default function TeacherRequestsPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/teacher-requests')
      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to fetch data')
      }

      setData(responseData)
      console.log('Received data:', responseData)
      console.log('Number of requests:', responseData.requests?.length || 0)
      console.log('Sample request:', responseData.requests?.[0])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Extract departments/grade levels from public profiles
  const getDepartments = () => {
    if (!data?.requests) return ['all']
    const departments = new Set()
    data.requests.forEach((teacher) => {
      const dept = teacher['Grade Level Taught/Department/Position'] || 'Other'
      departments.add(dept)
    })

    // Convert to array and sort logically
    const deptArray = Array.from(departments)

    // Define the logical order
    const order = [
      'all',
      'Pre-K',
      'Kindergarten',
      '1st Grade',
      '2nd Grade',
      '3rd Grade',
      '4th Grade',
      '5th Grade',
      'P.E. Department',
      'Music Department',
      'Library',
      'Administration',
      'Support Staff',
      'Other',
    ]

    // Sort departments according to the defined order
    const sortedDepts = order.filter((dept) => {
      if (dept === 'all') return true
      return deptArray.includes(dept)
    })

    // Add any departments not in our predefined list at the end
    const remainingDepts = deptArray.filter((dept) => !order.includes(dept))

    return [...sortedDepts, ...remainingDepts.sort()]
  }

  const filteredTeachers =
    data?.requests?.filter((teacher) => {
      if (filter === 'all') return true
      const dept = teacher['Grade Level Taught/Department/Position'] || 'Other'
      return dept === filter
    }) || []

  const getRandomColor = (index) => {
    const colors = [
      'from-pink-400 to-purple-500',
      'from-blue-400 to-indigo-500',
      'from-green-400 to-teal-500',
      'from-yellow-400 to-orange-500',
      'from-red-400 to-pink-500',
      'from-indigo-400 to-purple-500',
      'from-teal-400 to-green-500',
      'from-orange-400 to-red-500',
    ]
    return colors[index % colors.length]
  }

  const formatBirthday = (birthday) => {
    if (!birthday) return null
    // Handle different date formats and remove year if present
    const date = new Date(birthday + ', 2024') // Add dummy year for parsing
    if (isNaN(date)) return birthday // Return as-is if parsing fails
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Container className="py-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
            <p className="text-gray-600 mt-4 text-lg">
              Loading staff information...
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
              <h2 className="text-lg font-semibold text-red-800 mb-2">
                Something went wrong
              </h2>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchData}
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
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Show Your Support
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
                Get to know the incredible educators who make Mary Frank
                Elementary special! Learn about their favorites, celebrate their
                birthdays, and discover meaningful ways to show appreciation.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Full width container for maximum space usage */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Staff Profiles Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <UserGroupIcon className="w-8 h-8 text-primary-600 mr-3" />
                Staff Profiles ({data?.requests?.length || 0})
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get to know our amazing educators personally! Each profile
                includes their favorites, classroom needs, and fun details to
                help you connect with them.
              </p>
            </div>

            {/* Department Filter */}
            {getDepartments().length > 2 && (
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {getDepartments().map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setFilter(dept)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm cursor-pointer ${
                      filter === dept
                        ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                        : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md hover:shadow-lg border border-gray-200'
                    }`}
                  >
                    {dept === 'all' ? 'All Staff' : dept}
                  </button>
                ))}
              </div>
            )}

            {/* Teacher Profiles Grid - Wide cards using full space */}
            <div className="space-y-6">
              {filteredTeachers.map((teacher, index) => (
                <div
                  key={teacher.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  {/* Colorful header */}
                  <div
                    className={`h-4 bg-gradient-to-r ${getRandomColor(index)}`}
                  ></div>

                  <div className="p-8">
                    <div className="grid lg:grid-cols-4 gap-8">
                      {/* Column 1: Name and Basic Info */}
                      <div className="lg:col-span-1">
                        <div className="text-center lg:text-left">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {teacher['Name'] || 'Staff Member'}
                          </h3>
                          <p className="text-primary-600 font-semibold mb-3">
                            {teacher['Grade Level Taught/Department/Position']}
                          </p>
                          {teacher['Birthday'] && (
                            <div className="flex items-center justify-center lg:justify-start text-sm text-gray-500 mb-4">
                              <GiftIcon className="w-4 h-4 mr-2" />
                              Birthday:{' '}
                              {formatBirthday(teacher['Birthday']) ||
                                teacher['Birthday']}
                            </div>
                          )}

                          {/* Dietary Restrictions - prominent placement */}
                          {teacher['Dietary Restrictions'] && (
                            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                              <div className="flex items-start">
                                <ExclamationTriangleIcon className="w-4 h-4 text-yellow-600 mr-2 mt-0.5" />
                                <div>
                                  <p className="text-sm font-semibold text-yellow-800 mb-1">
                                    Dietary Restrictions
                                  </p>
                                  <p className="text-sm text-yellow-700">
                                    {teacher['Dietary Restrictions']}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Column 2: Personal Favorites */}
                      <div className="lg:col-span-1">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <HeartIcon className="w-5 h-5 mr-2 text-primary-600" />
                          Personal Favorites
                        </h4>
                        <div className="space-y-3">
                          {teacher['Favorite Color'] && (
                            <div className="flex items-center gap-3">
                              <SparklesIcon className="w-4 h-4 text-primary-500" />
                              <span className="text-sm text-gray-600">
                                <strong>Color:</strong>{' '}
                                {teacher['Favorite Color']}
                              </span>
                            </div>
                          )}

                          {teacher['Favorite Hobby'] && (
                            <div className="flex items-center gap-3">
                              <StarIcon className="w-4 h-4 text-primary-500" />
                              <span className="text-sm text-gray-600">
                                <strong>Hobby:</strong>{' '}
                                {teacher['Favorite Hobby']}
                              </span>
                            </div>
                          )}

                          {teacher['Favorite Restaurants'] && (
                            <div className="flex items-center gap-3">
                              <HomeIcon className="w-4 h-4 text-primary-500" />
                              <span className="text-sm text-gray-600">
                                <strong>Restaurant:</strong>{' '}
                                {teacher['Favorite Restaurants']}
                              </span>
                            </div>
                          )}

                          {teacher['Favorite Store'] && (
                            <div className="flex items-center gap-3">
                              <BuildingOfficeIcon className="w-4 h-4 text-primary-500" />
                              <span className="text-sm text-gray-600">
                                <strong>Store:</strong>{' '}
                                {teacher['Favorite Store']}
                              </span>
                            </div>
                          )}

                          {teacher['Favorite Coffee/tea Drink'] && (
                            <div className="flex items-center gap-3">
                              <BeakerIcon className="w-4 h-4 text-primary-500" />
                              <span className="text-sm text-gray-600">
                                <strong>Drink:</strong>{' '}
                                {teacher['Favorite Coffee/tea Drink']}
                              </span>
                            </div>
                          )}

                          {teacher['Favorite Snack'] && (
                            <div className="flex items-center gap-3">
                              <GiftIcon className="w-4 h-4 text-primary-500" />
                              <span className="text-sm text-gray-600">
                                <strong>Snack:</strong>{' '}
                                {teacher['Favorite Snack']}
                              </span>
                            </div>
                          )}

                          {teacher['Favorite Candy'] && (
                            <div className="flex items-center gap-3">
                              <HeartIcon className="w-4 h-4 text-primary-500" />
                              <span className="text-sm text-gray-600">
                                <strong>Candy:</strong>{' '}
                                {teacher['Favorite Candy']}
                              </span>
                            </div>
                          )}

                          {teacher['Favorite Candle Scent'] && (
                            <div className="flex items-center gap-3">
                              <SunIcon className="w-4 h-4 text-primary-500" />
                              <span className="text-sm text-gray-600">
                                <strong>Candle:</strong>{' '}
                                {teacher['Favorite Candle Scent']}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Column 3: Classroom Needs */}
                      <div className="lg:col-span-1">
                        {(teacher['Top Classroom Supply Wishes'] ||
                          teacher['Favorite Classroom Supplies']) && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                              <AcademicCapIcon className="w-5 h-5 mr-2 text-primary-600" />
                              Classroom Wishes
                            </h4>
                            <div className="p-4 bg-primary-50 rounded-lg border border-primary-100">
                              {teacher['Top Classroom Supply Wishes'] && (
                                <div className="mb-3">
                                  <p className="text-sm font-semibold text-gray-800 mb-1">
                                    Most Needed:
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {teacher['Top Classroom Supply Wishes']}
                                  </p>
                                </div>
                              )}
                              {teacher['Favorite Classroom Supplies'] && (
                                <div>
                                  <p className="text-sm font-semibold text-gray-800 mb-1">
                                    Always Loves:
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {teacher['Favorite Classroom Supplies']}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Column 4: Gift Card Preferences */}
                      <div className="lg:col-span-1">
                        {(teacher[
                          'If you found a gift card for $5, where would you want it to be from?'
                        ] ||
                          teacher[
                            'If you found a gift card or $20, where would you want it to be from?'
                          ]) && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                              <CreditCardIcon className="w-5 h-5 mr-2 text-primary-600" />
                              Gift Card Preferences
                            </h4>
                            <div className="space-y-3">
                              {teacher[
                                'If you found a gift card for $5, where would you want it to be from?'
                              ] && (
                                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                  <p className="text-sm font-semibold text-green-800 mb-1">
                                    $5 Gift Card
                                  </p>
                                  <p className="text-sm text-green-700">
                                    {
                                      teacher[
                                        'If you found a gift card for $5, where would you want it to be from?'
                                      ]
                                    }
                                  </p>
                                </div>
                              )}
                              {teacher[
                                'If you found a gift card or $20, where would you want it to be from?'
                              ] && (
                                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                  <p className="text-sm font-semibold text-blue-800 mb-1">
                                    $20 Gift Card
                                  </p>
                                  <p className="text-sm text-blue-700">
                                    {
                                      teacher[
                                        'If you found a gift card or $20, where would you want it to be from?'
                                      ]
                                    }
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTeachers.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No profiles found
                </h3>
                <p className="text-gray-600">
                  {filter === 'all'
                    ? 'No staff profiles are available at the moment.'
                    : `No staff found in "${filter}".`}
                </p>
              </div>
            )}
          </div>

          {/* Anonymous Wishes Section */}
          {data?.anonymousItems && data.anonymousItems.length > 0 && (
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                  <GiftIcon className="w-8 h-8 text-primary-600 mr-3" />
                  Anonymous Staff Wishes
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Some staff members prefer privacy, but their needs matter too!
                  Here are additional ways to support our educators.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Classroom Supplies */}
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpenIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Classroom Supplies
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {[
                      ...new Set(
                        data.anonymousItems
                          .filter((item) => item.type === 'classroom_supply')
                          .map((item) => item.item)
                      ),
                    ]
                      .slice(0, 8)
                      .map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <span className="text-primary-500">•</span>
                          <span className="text-sm text-gray-600">{item}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* $5 Gift Cards */}
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCardIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      $5 Gift Cards
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {[
                      ...new Set(
                        data.anonymousItems
                          .filter((item) => item.type === 'gift_card_5')
                          .map((item) => item.item)
                      ),
                    ]
                      .slice(0, 8)
                      .map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <span className="text-primary-500">•</span>
                          <span className="text-sm text-gray-600">{item}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* $20 Gift Cards */}
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <GiftIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      $20 Gift Cards
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {[
                      ...new Set(
                        data.anonymousItems
                          .filter((item) => item.type === 'gift_card_20')
                          .map((item) => item.item)
                      ),
                    ]
                      .slice(0, 8)
                      .map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <span className="text-primary-500">•</span>
                          <span className="text-sm text-gray-600">{item}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Ways to Celebrate Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <StarIcon className="w-8 h-8 text-primary-600 mr-3" />
                Ways to Celebrate Our Staff
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Show appreciation for the amazing educators who make a
                difference every day!
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Birthday Celebrations */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <GiftIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Birthday Celebrations
                </h3>
                <p className="text-gray-600 mb-6">
                  Check the staff profiles to see upcoming birthdays and
                  surprise them with their favorite treats!
                </p>
                <div className="text-sm text-gray-500">
                  Tip: Look for their favorite restaurants and stores
                </div>
              </div>

              {/* Random Acts of Kindness */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HeartIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Random Kindness
                </h3>
                <p className="text-gray-600 mb-6">
                  Surprise a teacher any day with their favorite coffee, snack,
                  or a small gift card!
                </p>
                <div className="text-sm text-gray-500">
                  Tip: Check their favorite drinks and snacks
                </div>
              </div>

              {/* Classroom Support */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AcademicCapIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Classroom Support
                </h3>
                <p className="text-gray-600 mb-6">
                  Help teachers create amazing learning environments with
                  supplies from their wish lists.
                </p>
                <div className="text-sm text-gray-500">
                  Tip: Look for "Classroom Wishes" sections
                </div>
              </div>

              {/* Holiday & Special Occasions */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <SparklesIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Holiday Treats
                </h3>
                <p className="text-gray-600 mb-6">
                  During holidays, consider their favorite candle scents,
                  candies, or gift cards.
                </p>
                <div className="text-sm text-gray-500">
                  Tip: Note any dietary restrictions
                </div>
              </div>

              {/* Team Building */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <UserGroupIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Get to Know Staff
                </h3>
                <p className="text-gray-600 mb-6">
                  Use the profiles to start conversations and build connections
                  with our educators.
                </p>
                <div className="text-sm text-gray-500">
                  Tip: Ask about their hobbies at school events
                </div>
              </div>

              {/* Show Appreciation */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <StarIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Show Appreciation
                </h3>
                <p className="text-gray-600 mb-6">
                  Write thank you notes or organize appreciation events for our
                  school community.
                </p>
                <div className="text-sm text-gray-500">
                  Tip: Personal notes mean the world to educators
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Make a Difference?
              </h3>
              <p className="text-gray-600 mb-6">
                Contact the PTO to coordinate staff appreciation efforts, or
                simply reach out directly to show your support for our amazing
                educators. Every gesture, big or small, makes a difference!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:pto@maryfrankpto.org"
                  className="inline-flex items-center bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
                >
                  <EnvelopeIcon className="w-5 h-5 mr-2" />
                  Contact PTO
                </a>
                <a
                  href="/volunteer"
                  className="inline-flex items-center bg-white text-primary-600 border-2 border-primary-600 px-8 py-3 rounded-lg hover:bg-primary-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
                >
                  <HandRaisedIcon className="w-5 h-5 mr-2" />
                  Get Involved
                </a>
              </div>

              {data?.totalTeachers && (
                <div className="mt-6 text-sm text-gray-500">
                  Supporting {data.totalTeachers} amazing staff members at Mary
                  Frank Elementary
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
