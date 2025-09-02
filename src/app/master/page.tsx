'use client'

import React from 'react'
import Layout from '@src/layout/Layout'

const MasterPage = () => {
  return (
    <Layout breadcrumbTitle="Master">
      <div className="container mx-auto p-6">
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Master Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Welcome to the Master section. This is your main dashboard for managing all master data.
            </p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  Data Management
                </h3>
                <p className="text-blue-600 dark:text-blue-300">
                  Manage your master data entries and configurations.
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
                  System Settings
                </h3>
                <p className="text-green-600 dark:text-green-300">
                  Configure system-wide settings and preferences.
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-2">
                  User Management
                </h3>
                <p className="text-purple-600 dark:text-purple-300">
                  Manage users, roles, and permissions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MasterPage
