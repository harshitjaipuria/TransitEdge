'use client'

import React from 'react'
import Layout from '@src/layout/Layout'

const BrokerEntryPage = () => {
  return (
    <Layout breadcrumbTitle="Broker Entry">
      <div className="container mx-auto p-6">
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Broker Entry
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage broker information and entries in the system.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Broker Information Form */}
            <div className="bg-gray-50 dark:bg-dark-700 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Broker Information
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Broker Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-600 dark:text-white"
                    placeholder="Enter broker name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-600 dark:text-white"
                    placeholder="Enter contact number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-600 dark:text-white"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Address
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-600 dark:text-white"
                    placeholder="Enter broker address"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                >
                  Add Broker
                </button>
              </form>
            </div>
            
            {/* Broker List */}
            <div className="bg-gray-50 dark:bg-dark-700 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Broker List
              </h2>
              <div className="space-y-3">
                <div className="bg-white dark:bg-dark-600 p-4 rounded-md border border-gray-200 dark:border-dark-500">
                  <h3 className="font-medium text-gray-800 dark:text-white">ABC Brokerage</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Contact: +1 234-567-8900</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Email: info@abcbrokerage.com</p>
                </div>
                
                <div className="bg-white dark:bg-dark-600 p-4 rounded-md border border-gray-200 dark:border-dark-500">
                  <h3 className="font-medium text-gray-800 dark:text-white">XYZ Trading</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Contact: +1 234-567-8901</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Email: contact@xyztrading.com</p>
                </div>
                
                <div className="bg-white dark:bg-dark-600 p-4 rounded-md border border-gray-200 dark:border-dark-500">
                  <h3 className="font-medium text-gray-800 dark:text-white">Global Brokers</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Contact: +1 234-567-8902</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Email: support@globalbrokers.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BrokerEntryPage
