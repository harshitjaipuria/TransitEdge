'use client'

import React, { useState } from 'react'
import { BrokerFormProps, BrokerFormData, BrokerFormErrors } from '../types'

const BrokerForm: React.FC<BrokerFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<BrokerFormData>({
    name: initialData?.name || '',
    contactNumber: initialData?.contactNumber || '',
    email: initialData?.email || '',
    address: initialData?.address || ''
  })

  // Local state for Broker Branch selection (not part of formData types yet)
  const [branch, setBranch] = useState<string>('')

  const [errors, setErrors] = useState<BrokerFormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: BrokerFormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Broker name is required'
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required'
    }

    // Contact person (reusing email field for storage) must not be empty
    if (!formData.email.trim()) {
      newErrors.email = 'Contact person is required'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (field: keyof BrokerFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Broker Branch *
        </label>
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-600 dark:text-white ${
            errors.name ? 'border-red-500' : 'border-gray-300 dark:border-dark-600'
          }`}
          disabled={isLoading}
        >
          <option value="">Select a branch</option>
          <option value="Main Branch">Main Branch</option>
          <option value="North Branch">North Branch</option>
          <option value="South Branch">South Branch</option>
          <option value="East Branch">East Branch</option>
          <option value="West Branch">West Branch</option>
        </select>
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Broker Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-600 dark:text-white ${
            errors.name ? 'border-red-500' : 'border-gray-300 dark:border-dark-600'
          }`}
          placeholder="Enter Broker Name"
          disabled={isLoading}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Contact Person *
        </label>
        <input
          type="text"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-600 dark:text-white ${
            errors.email ? 'border-red-500' : 'border-gray-300 dark:border-dark-600'
          }`}
          placeholder="Enter contact person"
          disabled={isLoading}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          value={formData.contactNumber}
          onChange={(e) => handleChange('contactNumber', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-600 dark:text-white ${
            errors.contactNumber ? 'border-red-500' : 'border-gray-300 dark:border-dark-600'
          }`}
          placeholder="Enter phone number"
          disabled={isLoading}
        />
        {errors.contactNumber && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.contactNumber}</p>
        )}
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Address *
        </label>
        <textarea
          rows={3}
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-600 dark:text-white ${
            errors.address ? 'border-red-500' : 'border-gray-300 dark:border-dark-600'
          }`}
          placeholder="Enter full address"
          disabled={isLoading}
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.address}</p>
        )}
      </div>

      <div className="md:col-span-2 flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          {isLoading ? 'Saving...' : 'Save Broker'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default BrokerForm
