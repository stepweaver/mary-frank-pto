import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative mt-20">
      {/* Background with large logo */}
      <div
        className="relative bg-contain bg-left bg-no-repeat py-16"
        style={{
          backgroundImage: `url('/logo-with-glow.png')`,
          backgroundSize: 'contain',
          backgroundPosition: '25% center',
        }}
      >
        {/* Enhanced overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

        {/* Content container */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Mary Frank PTO Section - Enhanced */}
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Mary Frank PTO
              </h3>
              <div className="space-y-3">
                <p className="text-lg text-gray-100 font-medium">
                  Mary Frank Elementary School
                </p>
                <p className="text-base text-gray-200">13111 Adams Rd</p>
                <p className="text-base text-gray-200">Granger, IN 46530</p>
                <div className="pt-2">
                  <p className="text-sm text-green-400 font-medium">
                    Building Community Together
                  </p>
                </div>
              </div>
            </div>

            {/* Links Section - Improved */}
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Quick Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="https://maryfrank.phmschools.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-gray-200 hover:text-green-400 transition-colors duration-200 flex items-center group"
                  >
                    Mary Frank Website
                  </a>
                </li>
                <li>
                  <a
                    href="https://phmschools.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-gray-200 hover:text-green-400 transition-colors duration-200 flex items-center group"
                  >
                    PHM Website
                  </a>
                </li>
                <li>
                  <a
                    href="tel:574-272-0340"
                    className="text-base text-gray-200 hover:text-green-400 transition-colors duration-200 flex items-center group"
                  >
                    Contact: (574) 272-0340
                  </a>
                </li>
              </ul>
            </div>

            {/* PTO Board Section - Enhanced */}
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-6 text-white">
                2025-2026 PTO Board
              </h3>
              <div className="space-y-3">
                <div className="text-base text-gray-200">
                  <p className="font-medium text-white">President: Lynn Yoder</p>
                  <p className="font-medium text-white">
                    Vice President: [Name]
                  </p>
                  <p className="font-medium text-white">Secretary: [Name]</p>
                  <p className="font-medium text-white">Treasurer: [Name]</p>
                  <p className="font-medium text-white">
                    Member at Large: [Name]
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced bottom section */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-base text-gray-200">
                © 2025 Mary Frank PTO. All rights reserved.
              </p>
              <p className="text-md text-gray-300">
                Built by{' '}
                <a
                  href="https://stepweaver.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-green-400 hover:text-green-300 transition-colors"
                >
                  λstepweaver
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
