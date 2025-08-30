import Container from '@/components/layout/Container'
import {
  MapPinIcon,
  PhoneIcon,
  AcademicCapIcon,
  StarIcon,
  UserGroupIcon,
  CalendarIcon,
  HeartIcon,
  BuildingOfficeIcon,
  FlagIcon,
  ChartBarIcon,
  GlobeAltIcon,
  BookOpenIcon,
  TrophyIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'

export default function About() {
  return (
    <div className="min-h-screen">
      <Container className="py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-text-primary mb-6">
              About Mary Frank PTO
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              We are a dedicated group of parents, teachers, and staff working
              together to enhance the educational experience at Mary Frank
              Elementary School.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8 mb-16 border border-primary-200">
            <div className="text-center">
              <HeartIcon className="w-16 h-16 text-primary-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                "Learning for Life" - We support our teachers, enhance student
                learning, and build strong partnerships between families and our
                school community.
              </p>
            </div>
          </div>

          {/* School Information Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center">
                <BuildingOfficeIcon className="w-8 h-8 text-primary-600 mr-3" />
                School Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <AcademicCapIcon className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      School Name
                    </h3>
                    <p className="text-text-secondary">
                      Mary Frank Elementary School (also referred to as Mary
                      Frank Harris Elementary)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPinIcon className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      Location
                    </h3>
                    <p className="text-text-secondary">
                      13111 Adams Rd, Granger, Indiana 46530
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <PhoneIcon className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-text-primary">Phone</h3>
                    <p className="text-text-secondary">(574) 272-0340</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <FlagIcon className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      School Mascot
                    </h3>
                    <p className="text-text-secondary">Mustangs</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <SparklesIcon className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      School Colors
                    </h3>
                    <p className="text-text-secondary">Kelly Green & White</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <GlobeAltIcon className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      District
                    </h3>
                    <p className="text-text-secondary">
                      Penn-Harris-Madison School Corporation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Demographics & Performance */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center">
                <ChartBarIcon className="w-8 h-8 text-primary-600 mr-3" />
                School Performance
              </h2>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <UserGroupIcon className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      Student Population
                    </h3>
                    <p className="text-text-secondary">
                      489 students in Pre-K through 5th grade
                    </p>
                    <p className="text-sm text-text-muted">
                      Student/Teacher Ratio: 27.2:1
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <StarIcon className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      State Rating
                    </h3>
                    <p className="text-text-secondary">
                      Consistently earns an "A" rating
                    </p>
                    <p className="text-sm text-text-muted">
                      Designated a Four Star School by IDOE
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <TrophyIcon className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      State Ranking
                    </h3>
                    <p className="text-text-secondary">
                      #32 in Indiana Elementary Schools
                    </p>
                    <p className="text-sm text-text-muted">
                      77% math proficiency, 68% reading proficiency
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* School History */}
          <div className="bg-surface-secondary rounded-2xl p-8 mb-16">
            <div className="text-center mb-8">
              <BookOpenIcon className="w-16 h-16 text-primary-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                School History
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-3">
                <div className="text-4xl font-bold text-primary-600">1958</div>
                <h3 className="font-semibold text-text-primary">Established</h3>
                <p className="text-text-secondary">School was founded</p>
              </div>

              <div className="space-y-3">
                <div className="text-4xl font-bold text-primary-600">
                  "Learning for Life"
                </div>
                <h3 className="font-semibold text-text-primary">
                  School Motto
                </h3>
                <p className="text-text-secondary">Our guiding principle</p>
              </div>

              <div className="space-y-3">
                <div className="text-4xl font-bold text-primary-600">
                  Community
                </div>
                <h3 className="font-semibold text-text-primary">Named After</h3>
                <p className="text-text-secondary">
                  Local educator who believed in community involvement
                </p>
              </div>
            </div>
          </div>

          {/* PTO Activities */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
              PTO Activities & Fundraising
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-surface border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <CalendarIcon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">
                  Spirit Wear Sales
                </h3>
                <p className="text-text-secondary text-sm">
                  Partnership with Paige's Lettering for spirit wear sales,
                  delivered to Mary Frank PTO for distribution.
                </p>
              </div>

              <div className="bg-surface border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <UserGroupIcon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">
                  Meet & Greet Events
                </h3>
                <p className="text-text-secondary text-sm">
                  PTO table at school meet and greet events to collect classroom
                  information and welcome new families.
                </p>
              </div>

              <div className="bg-surface border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <HeartIcon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">
                  Teacher Welcome
                </h3>
                <p className="text-text-secondary text-sm">
                  Welcoming new teachers to our community, such as Mrs. Harcus
                  as our new 3rd grade teacher.
                </p>
              </div>

              <div className="bg-surface border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <TrophyIcon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">
                  Running is Elementary
                </h3>
                <p className="text-text-secondary text-sm">
                  Annual one mile run for 4th and 5th grade students to promote
                  fitness and school spirit.
                </p>
              </div>

              <div className="bg-surface border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <StarIcon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">
                  Give Back Nights
                </h3>
                <p className="text-text-secondary text-sm">
                  Community partnership events like Beef O'Brady's PTO Give Back
                  Night to support our school.
                </p>
              </div>

              <div className="bg-surface border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <AcademicCapIcon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">
                  Picture Day
                </h3>
                <p className="text-text-secondary text-sm">
                  School picture day events organized and supported by our PTO
                  volunteers.
                </p>
              </div>
            </div>
          </div>

          {/* Online Presence */}
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8 mb-16 border border-primary-200">
            <h2 className="text-3xl font-bold text-text-primary mb-6 text-center">
              Connect With Us
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GlobeAltIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">
                  Facebook Page
                </h3>
                <p className="text-text-secondary mb-3">
                  Mary Frank PTO has 471 likes with active community engagement
                </p>
                <a
                  href="https://www.facebook.com/MaryFrankPTO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Visit Facebook
                </a>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AcademicCapIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">
                  PTO Website
                </h3>
                <p className="text-text-secondary mb-3">
                  Google Sites page with current PTO information and updates
                </p>
                <a
                  href="https://sites.google.com/view/maryfrankelementarypto/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Visit Website
                </a>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-surface border-2 border-primary-200 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Get Involved Today
            </h2>
            <p className="text-lg text-text-secondary mb-6 max-w-2xl mx-auto">
              Join our community of dedicated parents, teachers, and staff
              working together to make Mary Frank Elementary School the best it
              can be.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/volunteer"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                Volunteer Now
              </a>
              <a
                href="/events"
                className="inline-flex items-center px-6 py-3 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
              >
                View Events
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
