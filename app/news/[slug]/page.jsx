'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  NewspaperIcon,
} from '@heroicons/react/24/outline'

export default function NewsArticle() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (params.slug) {
      fetchArticle(params.slug)
    }
  }, [params.slug])

  const fetchArticle = async (slug) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/contentful/news/${slug}`)
      const data = await response.json()

      if (data.success) {
        setArticle(data.data)
      } else {
        setError(data.error || 'Failed to load article')
      }
    } catch (error) {
      console.error('Error fetching article:', error)
      setError('Failed to load article')
    } finally {
      setLoading(false)
    }
  }

  const formatArticleDate = (dateString) => {
    if (!dateString) return 'Recently'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
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

  const getCategoryLabel = (category) => {
    const labels = {
      'teacher-support': 'Teacher Support',
      fundraising: 'Fundraising',
      events: 'Events',
      community: 'Community',
      default: 'News',
    }
    return labels[category] || labels.default
  }

  const calculateReadingTime = (content) => {
    if (!content) return 1
    const wordsPerMinute = 200

    let textContent = ''
    if (typeof content === 'string') {
      textContent = content
    } else if (content && typeof content === 'object') {
      // Handle Rich Text content
      textContent = documentToHtmlString(content)
    }

    if (!textContent) return 1

    const wordCount = textContent.replace(/<[^>]*>/g, '').split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  // Custom renderer for Rich Text content
  const renderRichText = (content) => {
    if (!content) return null

    if (typeof content === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: content }} />
    }

    // Use React components for better control
    const options = {
      renderNode: {
        'heading-2': (node, children) => (
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            {children}
          </h2>
        ),
        'heading-3': (node, children) => (
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            {children}
          </h3>
        ),
        paragraph: (node, children) => (
          <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
        ),
        'unordered-list': (node, children) => (
          <ul className="list-disc space-y-2 my-4 ml-6">{children}</ul>
        ),
        'list-item': (node, children) => (
          <li className="text-gray-700 leading-relaxed pl-2">{children}</li>
        ),
        'ordered-list': (node, children) => (
          <ol className="list-decimal space-y-2 my-4 ml-6">{children}</ol>
        ),
      },
    }

    return documentToReactComponents(content, options)
  }

  if (loading) {
    return (
      <Container className="py-12">
        <div className="max-w-4xl mx-auto">
          {/* Loading Skeleton */}
          <div className="animate-pulse">
            {/* Breadcrumb skeleton */}
            <div className="mb-6">
              <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
            </div>

            {/* Back button skeleton */}
            <div className="mb-6">
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>

            {/* Header skeleton */}
            <div className="mb-8">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-48"></div>
            </div>

            {/* Image skeleton */}
            <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>

            {/* Content skeleton */}
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </Container>
    )
  }

  if (error || !article) {
    return (
      <Container className="py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <NewspaperIcon className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-red-800 mb-2">
              Article Not Found
            </h1>
            <p className="text-red-600 mb-6">
              {error || 'The article you are looking for could not be found.'}
            </p>
            <button
              onClick={() => router.push('/news')}
              className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 cursor-pointer"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to News
            </button>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link
                href="/"
                className="hover:text-green-600 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <Link
                href="/news"
                className="hover:text-green-600 transition-colors duration-200"
              >
                News
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span
                className="text-gray-900 font-medium truncate max-w-xs"
                title={article.title}
              >
                {article.title}
              </span>
            </li>
          </ol>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => router.push('/news')}
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-6 transition-colors duration-200 cursor-pointer"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to News
        </button>

        {/* Article Header */}
        <header className="mb-8">
          {article.category && (
            <div className="mb-4">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white ${getCategoryColor(article.category)}`}
              >
                {getCategoryLabel(article.category)}
              </span>
            </div>
          )}

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center space-x-6 text-gray-600">
            {article.publishDate && (
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                <time dateTime={article.publishDate}>
                  {formatArticleDate(article.publishDate)}
                </time>
              </div>
            )}

            {article.content && (
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 mr-2" />
                <span>{calculateReadingTime(article.content)} min read</span>
              </div>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={article.featuredImage}
              alt={article.imageAlt || article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          {article.excerpt && (
            <div className="text-xl text-gray-600 mb-8 leading-relaxed font-medium">
              {article.excerpt}
            </div>
          )}

          {article.content ? (
            <div className="text-gray-700 leading-relaxed">
              {renderRichText(article.content)}
            </div>
          ) : (
            <div className="text-gray-700 leading-relaxed">
              <p>Content coming soon...</p>
            </div>
          )}
        </article>

        {/* Related Articles */}
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Stay Updated
              </h3>
              <p className="text-gray-600 mb-4">
                Get the latest news and updates from Mary Frank PTO delivered to
                your inbox.
              </p>
              <Link
                href="/news"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
              >
                View All News
                <ArrowLeftIcon className="h-4 w-4 ml-1 rotate-180" />
              </Link>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Get Involved
              </h3>
              <p className="text-gray-600 mb-4">
                Join our community and make a difference in our school.
              </p>
              <Link
                href="/volunteer"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
              >
                Volunteer Opportunities
                <ArrowLeftIcon className="h-4 w-4 ml-1 rotate-180" />
              </Link>
            </div>
          </div>
        </section>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="mb-4 sm:mb-0">
              <p className="text-sm text-gray-500">
                Published on {formatArticleDate(article.publishDate)}
              </p>
            </div>

            <button
              onClick={() => router.push('/news')}
              className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 cursor-pointer"
            >
              <NewspaperIcon className="h-5 w-5 mr-2" />
              View All News
            </button>
          </div>

          {/* Social Sharing */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-3">Share this article:</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  const url = window.location.href
                  const text = article.title
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
                    '_blank'
                  )
                }}
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
              >
                <svg
                  className="h-4 w-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.665 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                Share on X
              </button>

              <button
                onClick={() => {
                  const url = window.location.href
                  const text = article.title
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
                    '_blank'
                  )
                }}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
              >
                <svg
                  className="h-4 w-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Share on Facebook
              </button>
            </div>
          </div>
        </footer>
      </div>
    </Container>
  )
}
