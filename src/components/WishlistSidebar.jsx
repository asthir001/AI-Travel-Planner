import { VACATION_TYPES } from '../data/appData';
import { formatShortDate } from '../utils/holidayUtils';

export default function WishlistSidebar({ wishlist, onClose, onRemove }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      <div
        className="relative z-10 w-full max-w-sm bg-white border-l border-gray-200 h-full overflow-y-auto animate-slide-in shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-gold-gradient">Wishlist</h2>
            <p className="text-xs text-gray-400 mt-0.5">{wishlist.length} saved trip{wishlist.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-all"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">♡</div>
              <p className="text-gray-400 text-sm">No saved trips yet.</p>
              <p className="text-gray-400 text-xs mt-1">
                Click the heart icon on any destination to save it.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {wishlist.map(trip => {
                const vtData = VACATION_TYPES.find(v => v.id === trip.vacationType);
                return (
                  <div
                    key={trip.id}
                    className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{trip.emoji}</span>
                          <h3 className="font-display text-lg font-semibold text-gray-800">{trip.name}</h3>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">{trip.tagline}</p>
                      </div>
                      <button
                        onClick={() => onRemove(trip.id)}
                        className="w-7 h-7 rounded-full bg-red-50 hover:bg-red-100 border border-red-200 flex items-center justify-center text-red-400 text-xs transition-all flex-shrink-0"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {trip.dates.slice(0, 3).map(d => (
                        <span key={d} className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-600 border border-teal-200">
                          {formatShortDate(d)}
                        </span>
                      ))}
                      {trip.dates.length > 3 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                          +{trip.dates.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mt-2.5">
                      {vtData && (
                        <span className="text-[10px] text-gray-500">
                          {vtData.emoji} {vtData.label}
                        </span>
                      )}
                      <span className="text-[10px] text-gray-500">
                        {trip.totalDays} days · {trip.city}
                      </span>
                      <span className="text-[10px] text-gray-400 capitalize">
                        {trip.budget}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
