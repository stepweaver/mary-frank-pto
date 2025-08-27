import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative mt-20">
      {/* Background image with overlay */}
      <div
        className="relative bg-contain bg-left bg-no-repeat py-12"
        style={{
          backgroundImage: `url('/logo-with-glow.png')`,
          backgroundSize: 'contain',
          backgroundPosition: '30% center',
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content container */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mary Frank PTO Section */}
            <div className="text-white">
              <h3 className="text-xl font-semibold mb-4">Mary Frank PTO</h3>
              <p className="text-sm text-gray-200 mb-2">
                Mary Frank Elementary School
              </p>
              <p className="text-sm text-gray-200 mb-2">13111 Adams Rd</p>
              <p className="text-sm text-gray-200">Granger, IN 46530</p>
            </div>

            {/* Links Section */}
            <div className="text-white">
              <h3 className="text-xl font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://maryfrank.phmschools.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-200 hover:text-white transition-colors"
                  >
                    Mary Frank Website
                  </a>
                </li>
                <li>
                  <a
                    href="https://phmschools.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-200 hover:text-white transition-colors"
                  >
                    PHM Website
                  </a>
                </li>
                <li>
                  <a
                    href="tel:574-272-0340"
                    className="text-sm text-gray-200 hover:text-white transition-colors"
                  >
                    Contact: (574) 272-0340
                  </a>
                </li>
              </ul>
            </div>

            {/* PTO Board Section */}
            <div className="text-white">
              <h3 className="text-xl font-semibold mb-4">
                2025-2026 PTO Board
              </h3>
              <ul className="space-y-2 text-sm text-gray-200">
                <li>President: [Name]</li>
                <li>Vice President: [Name]</li>
                <li>Secretary: [Name]</li>
                <li>Treasurer: [Name]</li>
                <li>Member at Large: [Name]</li>
              </ul>
            </div>
          </div>

          {/* Bottom border */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
              <p className="text-sm text-gray-300">
                © 2025 Mary Frank PTO. All rights reserved.
              </p>
              <p className="text-sm text-gray-400">
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
