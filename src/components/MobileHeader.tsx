import React from 'react';

export function MobileHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 px-4 py-3 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Soundix" className="h-8" />
          <h1 className="text-xl font-bold">Soundix.</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-200">
            <img src="/avatar.jpg" alt="Profile" className="w-full h-full rounded-full object-cover" />
          </button>
        </div>
      </div>
    </header>
  );
}