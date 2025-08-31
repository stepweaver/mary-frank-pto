import Link from 'next/link'
import Container from '@/components/layout/Container'
import { NewspaperIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function NewsNotFound() {
  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <NewspaperIcon className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-800 mb-2">
            News Article Not Found
          </h1>
          <p className="text-red-600 mb-6">
            The news article you are looking for could not be found.
          </p>
          <Link
            href="/news"
            className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to News
          </Link>
        </div>
      </div>
    </Container>
  )
}

