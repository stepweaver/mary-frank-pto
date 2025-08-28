import Link from 'next/link'

export default function BoxTopsSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Support Our School with Box Tops
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Help us earn money for our school by collecting Box Tops for Education. 
            Every Box Top counts towards classroom supplies and educational resources.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                How It Works
              </h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">•</span>
                  <span>Look for the Box Tops for Education logo on participating products</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">•</span>
                  <span>Cut out the Box Top and bring it to school</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">•</span>
                  <span>Each Box Top is worth 10¢ for our school</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">•</span>
                  <span>We use the money for classroom supplies and programs</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Drop-off Locations
              </h3>
              <div className="space-y-3 text-slate-600">
                <p><strong>Main Office:</strong> Drop Box Tops in the labeled container</p>
                <p><strong>Classroom:</strong> Give to your child's teacher</p>
                <p><strong>PTO Meetings:</strong> Bring to monthly PTO meetings</p>
              </div>
            </div>
          </div>

          {/* Right side - Visual and CTA */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100 text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl text-green-600">📦</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Start Collecting Today!
              </h3>
              <p className="text-slate-600 mb-6">
                Every Box Top helps provide essential resources for our students and teachers.
              </p>
              <Link
                href="/volunteer"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Get Involved
              </Link>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white text-center">
              <h4 className="text-xl font-bold mb-2">Current Goal</h4>
              <p className="text-2xl font-bold mb-2">$500</p>
              <p className="text-green-100">Raised this school year</p>
              <div className="w-full bg-green-400 rounded-full h-2 mt-3">
                <div className="bg-white h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-sm text-green-100 mt-2">65% of goal reached</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-4">
            Questions about Box Tops? Contact our PTO coordinator
          </p>
          <Link
            href="/about"
            className="text-green-600 hover:text-green-700 font-medium underline"
          >
            Learn More About Our PTO
          </Link>
        </div>
      </div>
    </section>
  )
}
