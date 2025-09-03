'use client'

import React, { useState, useEffect } from 'react'
import { DriverSearchProps } from '../types'

const DriverSearch: React.FC<DriverSearchProps> = ({
  onSearch,
  placeholder = "Search drivers..."
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm)
    }, 300) // Debounce search by 300ms

    return () => clearTimeout(timer)
  }, [searchTerm, onSearch])

  const handleClear = () => {
    setSearchTerm('')
    onSearch('')
  }

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-dark-600 rounded-md leading-5 bg-white dark:bg-dark-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
      />
      
      {searchTerm && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button
            onClick={handleClear}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

export default DriverSearch
