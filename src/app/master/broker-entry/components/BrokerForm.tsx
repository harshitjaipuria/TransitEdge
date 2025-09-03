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
    address: initialData?.address || '',
    panNo: initialData?.panNo || '',
    gstIn: initialData?.gstIn || ''
  })

  // Local state for Broker Branch selection (not part of formData types yet)
  const [branch, setBranch] = useState<string>('')

  const [errors, setErrors] = useState<BrokerFormErrors>({})

  const extractTenDigits = (value: string): string => {
    const digitsOnly = value.replace(/\D/g, '')
    return digitsOnly.slice(0, 10)
  }

  const getDigitsWithoutPrefix = (): string => {
    return formData.contactNumber.replace(/^\+91/, '').replace(/\D/g, '').slice(0, 10)
  }

  const validateForm = (): boolean => {
    const newErrors: BrokerFormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Broker name is required'
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required'
    } else {
      const digits = formData.contactNumber.replace(/^\+91/, '').replace(/\D/g, '')
      if (digits.length !== 10) {
        newErrors.contactNumber = 'Enter a valid 10-digit mobile number'
      }
    }

    // Contact person (reusing email field for storage) must not be empty
    if (!formData.email.trim()) {
      newErrors.email = 'Contact person is required'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    if (!formData.panNo.trim()) {
      newErrors.panNo = 'PAN No is required'
    } else if (formData.panNo.length !== 10) {
      newErrors.panNo = 'PAN No must be exactly 10 characters'
    }

    if (formData.gstIn.trim() && formData.gstIn.length !== 15) {
      newErrors.gstIn = 'GST IN must be exactly 15 characters'
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

  const handleContactChange = (raw: string) => {
    const digits = extractTenDigits(raw)
    const withPrefix = digits ? `+91${digits}` : '+91'
    handleChange('contactNumber', withPrefix)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* First Row: 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Broker Branch<span className="text-red-500">*</span>
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
            Broker Name<span className="text-red-500">*</span>
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
      </div>

      {/* Second Row: 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Contact Person<span className="text-red-500">*</span>
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
            Phone Number<span className="text-red-500">*</span>
          </label>
          <div className={`flex items-stretch w-full border rounded-md ${
            errors.contactNumber ? 'border-red-500' : 'border-gray-300 dark:border-dark-600'
          } dark:bg-dark-600`}>
            <span className="px-3 py-2 bg-gray-100 dark:bg-dark-700 border-r border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-200 select-none">
              +91
            </span>
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]{10}"
              maxLength={10}
              value={getDigitsWithoutPrefix()}
              onChange={(e) => handleContactChange(e.target.value)}
              className="flex-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-600 dark:text-white rounded-r-md"
              placeholder="10-digit mobile number"
              disabled={isLoading}
            />
          </div>
          {errors.contactNumber && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.contactNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            PAN No.<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.panNo}
            onChange={(e) => handleChange('panNo', e.target.value.toUpperCase())}
            maxLength={10}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-600 dark:text-white ${
              errors.panNo ? 'border-red-500' : 'border-gray-300 dark:border-dark-600'
            }`}
            placeholder="Enter 10-character PAN number"
            disabled={isLoading}
          />
          {errors.panNo && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.panNo}</p>
          )}
        </div>
      </div>

      {/* Third Row: 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Address <span className="text-red-500">*</span>
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

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            GSTIN
          </label>
          <input
            type="text"
            value={formData.gstIn}
            onChange={(e) => handleChange('gstIn', e.target.value.toUpperCase())}
            maxLength={15}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-600 dark:text-white ${
              errors.gstIn ? 'border-red-500' : 'border-gray-300 dark:border-dark-600'
            }`}
            placeholder="Enter 15-character GST IN number"
            disabled={isLoading}
          />
          {errors.gstIn && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.gstIn}</p>
          )}
        </div>
      </div>

      {/* Button Row */}
      <div className="flex gap-3 pt-4">
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
