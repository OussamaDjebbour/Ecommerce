export function Header() {
  return (
    <header className="fixed left-64 right-0 top-0 z-50 border-b bg-white px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Headphones</h1>
          <p className="text-sm text-gray-600">From top brands</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <input
              type="search"
              placeholder="Search Product"
              className="w-80 rounded-lg border bg-gray-50 py-2 pl-10 pr-4"
            />
            <svg
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <button className="p-2">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </button>

          <button className="p-2">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          <button className="h-10 w-10 rounded-full bg-gray-200">
            <img
              src="/avatar.jpg"
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
