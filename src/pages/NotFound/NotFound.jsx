import React from 'react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Page Not Found</p>
      <p className="text-gray-500 dark:text-gray-500">The page you're looking for doesn't exist in Tasneem.</p>
    </div>
  )
}
