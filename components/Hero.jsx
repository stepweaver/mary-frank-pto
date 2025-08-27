'use client'

import { useState } from 'react'
import Image from 'next/image'

const heroPanels = [
  {
    id: 'pto-branding',
    title: 'Mary Frank PTO',
    description: 'Connecting families, students, and staff for student success',
    bgColor: 'bg-slate-800',
    bgImage: '/slides/teacher-parent-chat.png',
    content: (
      <div className="space-y-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
          Mary Frank PTO
        </h1>
        <p className="text-white text-lg mb-4 max-w-2xl">
          We support our teachers, enhance student learning, and build strong
          partnerships.
        </p>
        <a
          href="/about"
          className="inline-flex items-center border-2 border-white bg-transparent text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-800 transition-all duration-300"
        >
          LEARN MORE
        </a>
      </div>
    ),
  },
  {
    id: 'events',
    title: 'Events',
    description:
      'Stay updated on all PTO meetings, fundraisers, and school events',
    bgColor: 'bg-teal-500',
    bgImage: '/slides/community-meeting.png',
    content: (
      <div className="space-y-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
          This Week Events
        </h1>
        <p className="text-white text-lg mb-4 max-w-2xl">
          Dont miss what is happening at Mary Frank this week.
        </p>
        <a
          href="/events"
          className="inline-flex items-center border-2 border-white bg-transparent text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-all duration-300"
        >
          VIEW CALENDAR
        </a>
      </div>
    ),
  },
  {
    id: 'volunteer',
    title: 'Volunteer',
    description:
      'Find opportunities to help and make a difference in our school',
    bgColor: 'bg-emerald-500',
    bgImage: '/slides/school-bus-arrival.png',
    content: (
      <div className="space-y-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
          Volunteer Opportunities
        </h1>
        <p className="text-white text-lg mb-4 max-w-2xl">
          Your help is needed right now. Join our community of volunteers.
        </p>
        <a
          href="/volunteer"
          className="inline-flex items-center border-2 border-white bg-transparent text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300"
        >
          GET INVOLVED
        </a>
      </div>
    ),
  },
  {
    id: 'news',
    title: 'News & Updates',
    description: 'Stay informed about PTO activities and school news',
    bgColor: 'bg-green-500',
    bgImage: '/slides/school-playground.png',
    content: (
      <div className="space-y-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
          Latest News
        </h1>
        <p className="text-white text-lg mb-4 max-w-2xl">
          Stay connected with our community and learn about the latest
          achievements.
        </p>
        <a
          href="/news"
          className="inline-flex items-center border-2 border-white bg-transparent text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300"
        >
          READ MORE
        </a>
      </div>
    ),
  },
]

export default function Hero() {
  const [expandedPanel, setExpandedPanel] = useState('pto-branding')

  const handlePanelClick = (panelId) => {
    if (expandedPanel !== panelId) {
      setExpandedPanel(panelId)
    }
  }

  return (
    <>
      <section
        className="relative w-full overflow-hidden"
        style={{ height: '70vh' }}
      >
        <div className="flex h-full">
          {heroPanels.map((panel) => (
            <div
              key={panel.id}
              className={`relative group transition-all duration-500 ease-in-out overflow-hidden ${
                expandedPanel === panel.id
                  ? 'flex-[3] z-20 ring-4 ring-white/30 shadow-2xl'
                  : 'flex-1 opacity-75 cursor-pointer'
              }`}
              onClick={() => handlePanelClick(panel.id)}
            >
              <div className="absolute inset-0">
                <Image
                  src={panel.bgImage}
                  alt={panel.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover w-full h-full"
                  priority={panel.id === 'pto-branding'}
                />
                <div
                  className={`absolute inset-0 ${panel.bgColor} opacity-85`}
                />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-center p-4 lg:p-6">
                {expandedPanel === panel.id ? (
                  <div className="h-full flex flex-col justify-center items-center">
                    <div className="w-full max-w-4xl">{panel.content}</div>
                  </div>
                ) : (
                  <div className="text-center text-white h-full flex flex-col justify-center items-center">
                    <div className="space-y-3">
                      <h2 className="text-xl lg:text-2xl font-bold drop-shadow-lg">
                        {panel.title}
                      </h2>
                      <p className="text-sm lg:text-base opacity-90 drop-shadow-md px-2">
                        {panel.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
