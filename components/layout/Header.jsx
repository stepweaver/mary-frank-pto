'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/events', label: 'Events' },
    { href: '/fundraising', label: 'Fundraising' },
    { href: '/volunteer', label: 'Volunteer' },
    { href: '/news', label: 'News' },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-4">
            <div className="h-16 w-16 relative">
              <Image
                src="/logo-with-glow.png"
                alt="Mary Frank PTO Logo"
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Mary Frank Elementary PTO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-lg font-medium transition-colors duration-200 px-3 py-2 ${
                    active
                      ? 'text-[#00b140] border-b-2 border-[#00b140] pb-2'
                      : 'text-gray-700 hover:text-[#00b140] hover:border-b-2 hover:border-[#00b140] hover:pb-2'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="text-gray-700 hover:text-[#00b140] p-3"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <nav className="py-6 space-y-3">
              {navItems.map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-6 py-4 text-lg font-medium transition-colors duration-200 ${
                      active
                        ? 'text-[#00b140] bg-[#00b140]/10 border-l-4 border-[#00b140]'
                        : 'text-gray-700 hover:text-[#00b140] hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
