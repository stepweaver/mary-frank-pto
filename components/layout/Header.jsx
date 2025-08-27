'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/events', label: 'Events' },
    { href: '/fundraising', label: 'Fundraising' },
    { href: '/volunteer', label: 'Volunteer' },
    { href: '/news', label: 'News' },
  ]

  return (
    <header className="flex items-center justify-between border-b px-5 py-3">
      <Link href="/" className="font-semibold">
        Mary Frank PTO
      </Link>
      <nav className='flex gap-4'>
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm ${active
                ? "font-medium text-black underline underline-offset-4"
                : "text-gray-700 hover:text-black hover:underline underline-offset-4"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  )
}
