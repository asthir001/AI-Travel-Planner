export default function Header({ wishlistCount, onWishlistOpen, onInspireMe }) {
  return (
    <header className="relative overflow-hidden">
      {/* Warm gradient band */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-50 via-white to-orange-50" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md shadow-amber-200">
              <span className="text-xl">✈</span>
            </div>
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold leading-none tracking-wide text-gold-gradient">
              AI Tour Planner
            </h1>
            <p className="text-[11px] text-gray-400 uppercase tracking-[0.2em] mt-0.5">
              Discover your perfect escape
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onInspireMe}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-amber-300 text-amber-700 text-sm hover:bg-amber-50 transition-all duration-200 group"
          >
            <span className="text-base group-hover:animate-spin" style={{ display: 'inline-block' }}>✨</span>
            Inspire Me
          </button>

          <button
            onClick={onWishlistOpen}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-300 text-amber-700 text-sm hover:bg-amber-100 transition-all duration-200"
          >
            <span>♡</span>
            <span className="hidden sm:inline">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
