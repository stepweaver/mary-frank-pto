import { CalendarIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import ProgressMeter from './ProgressMeter'

export default function FundraiserCard({ fundraiser }) {
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const handleClick = () => {
    // Open PDF in new tab
    window.open(fundraiser.pdfUrl, '_blank')
  }

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {fundraiser.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {fundraiser.description}
          </p>
        </div>
        <div className="ml-4">
          <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
            {fundraiser.category}
          </span>
        </div>
      </div>

      {/* Progress Meter */}
      <div className="mb-6">
        <ProgressMeter
          raised={fundraiser.raised}
          goal={fundraiser.goal}
          fundraiserType={fundraiser.fundraiserType}
          unit={fundraiser.unit}
        />
      </div>

      {/* Dates */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-1">
          <CalendarIcon className="w-4 h-4" />
          <span>Started {formatDate(fundraiser.startDate)}</span>
        </div>
        {fundraiser.endDate && (
          <div className="flex items-center space-x-1">
            <CalendarIcon className="w-4 h-4" />
            <span>Ends {formatDate(fundraiser.endDate)}</span>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="flex items-center justify-center space-x-2 text-primary-600 font-medium">
        <DocumentTextIcon className="w-5 h-5" />
        <span>Click to view details</span>
      </div>
    </div>
  )
}
