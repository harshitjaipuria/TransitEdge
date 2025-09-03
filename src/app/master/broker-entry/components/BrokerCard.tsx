'use client'

import React from 'react'
import { BrokerCardProps } from '../types'

const BrokerCard: React.FC<BrokerCardProps> = ({
  broker,
  onEdit,
  onDelete,
  onView
}) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit(broker)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (window.confirm(`Are you sure you want to delete ${broker.name}?`)) {
      onDelete(broker.id)
    }
  }

  const handleView = () => {
    onView(broker)
  }

  return (
    <div
      className="bg-white dark:bg-dark-600 p-6 rounded-lg border border-gray-200 dark:border-dark-500 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleView}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {broker.name}
          </h3>
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            broker.isActive
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {broker.isActive ? 'Active' : 'Inactive'}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title="Edit broker"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            title="Delete broker"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {broker.contactNumber}
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {broker.email}
        </div>
        
        <div className="flex items-start text-sm text-gray-600 dark:text-gray-300">
          <svg className="w-4 h-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="line-clamp-2">{broker.address}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-500">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Created: {new Date(broker.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}

export default BrokerCard
