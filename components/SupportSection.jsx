import Link from 'next/link'

export default function SupportSection() {
  return (
    <section className="pt-8 md:pt-16 pb-16 bg-gradient-to-br from-slate-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Donate Items Card */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-slate-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00b140] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Donate Supplies
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Contribute classroom essentials like paper, markers, books, and
                other materials that help teachers create inspiring learning
                environments.
              </p>
              <Link
                href="/fundraising"
                className="inline-flex items-center bg-[#00b140] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#009a38] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                See What's Needed
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Volunteer Card */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-slate-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00b140] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Give Your Time
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Share your skills and energy to help teachers and students.
                Every hour you volunteer strengthens our school community.
              </p>
              <Link
                href="/volunteer"
                className="inline-flex items-center bg-[#00b140] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#009a38] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Involved
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
