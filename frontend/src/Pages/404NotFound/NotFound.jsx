import React from 'react'
import { Link } from 'react-router-dom'
import { FaExclamationTriangle, FaHome } from 'react-icons/fa'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <FaExclamationTriangle className="mx-auto h-12 w-12 text-orange" />
          <h2 className="mt-6 text-3xl font-extrabold text-darkBlue">
            404 - Page Not Found
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Oops! The page you're looking for doesn't exist.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <p className="text-md text-gray-500">
            It seems you've ventured into uncharted territory. Let's get you back on track!
          </p>
          <Link
            to="/"
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-lightBlue hover:bg-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightBlue transition-colors duration-200"
          >
            <FaHome className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}