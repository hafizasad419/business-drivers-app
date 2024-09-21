import React from 'react'
import { motion } from 'framer-motion'

const LoadingCard = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 p-4">
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="flex justify-between items-center mb-4">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
      <div className="h-10 bg-gray-200 rounded w-1/3 ml-auto"></div>
    </div>
  </div>
)

const LoadingComponent = ({ count = 3 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
      {[...Array(count)].map((_, index) => (
        <LoadingCard key={index} />
      ))}
    </motion.div>
  )
}

export default LoadingComponent