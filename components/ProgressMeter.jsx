export default function ProgressMeter({ raised, goal, fundraiserType, unit }) {
  const progress = goal > 0 ? (raised / goal) * 100 : 0

  const formatDisplay = (amount, unit) => {
    if (fundraiserType === 'Money') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount)
    } else if (fundraiserType === 'Items') {
      return `${amount.toLocaleString()} ${unit}`
    } else {
      return `${amount.toLocaleString()} ${unit || ''}`
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Progress</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-primary-600 h-3 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">
          Raised:{' '}
          <span className="font-semibold text-gray-900">
            {formatDisplay(raised, unit)}
          </span>
        </span>
        <span className="text-gray-600">
          Goal:{' '}
          <span className="font-semibold text-gray-900">
            {formatDisplay(goal, unit)}
          </span>
        </span>
      </div>
    </div>
  )
}
