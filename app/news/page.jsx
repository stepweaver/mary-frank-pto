'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import { CalendarIcon, NewspaperIcon } from '@heroicons/react/24/outline'

export default function News() {
  const [newsArticles, setNewsArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNewsArticles()
  }, [])

  const fetchNewsArticles = async () => {
    try {
      const response = await fetch('/api/contentful/news')
      const data = await response.json()
      if (data.success) {
        setNewsArticles(data.data)
      }
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatNewsDate = (dateString) => {
    if (!dateString) return 'Recently'
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      'teacher-support': 'bg-blue-500',
      fundraising: 'bg-green-500',
      events: 'bg-purple-500',
      community: 'bg-orange-500',
      default: 'bg-gray-500',
    }
    return colors[category] || colors.default
  }

  return (
    <Container className="py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            News & Updates
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed about PTO activities, fundraising progress, and school
            news.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <span className="ml-3 text-gray-600">Loading news articles...</span>
          </div>
        ) : newsArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <article>
                  {article.featuredImage && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={article.featuredImage}
                        alt={article.imageAlt || article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                      {article.title}
                    </h2>

                    {article.excerpt && (
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 p-12 rounded-lg text-center">
            <NewspaperIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No news articles available at the moment.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Check back soon for updates!
            </p>
          </div>
        )}
      </div>
    </Container>
  )
}
