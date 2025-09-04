'use client'

import React, { useState } from 'react'
import { DriverFormProps, DriverFormData, DriverFormErrors } from '../types'

const DriverForm: React.FC<DriverFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<DriverFormData>({
    name: initialData?.name || '',
    contactNumber: initialData?.contactNumber || '',
    fatherName: initialData?.fatherName || '',
    address: initialData?.address || '',
    licenseNumber: initialData?.licenseNumber || '',
    validUpto: initialData?.validUpto || '',
    issuedBy: initialData?.issuedBy || ''
  })



  const [errors, setErrors] = useState<DriverFormErrors>({})

  const extractTenDigits = (value: string): string => {
    const digitsOnly = value.replace(/\D/g, '')
    return digitsOnly.slice(0, 10)
  }

  const getDigitsWithoutPrefix = (): string => {
    return formData.contactNumber.replace(/^\+91/, '').replace(/\D/g, '').slice(0, 10)
  }

  const validateForm = (): boolean => {
    const newErrors: DriverFormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Driver name is required'
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required'
    } else {
      const digits = formData.contactNumber.replace(/^\+91/, '').replace(/\D/g, '')
      if (digits.length !== 10) {
        newErrors.contactNumber = 'Enter a valid 10-digit mobile number'
      }
    }

    // Father name must not be empty yes its true
    if (!formData.fatherName.trim()) {
      newErrors.fatherName = 'Father name is required'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = 'License number is required'
    }

    if (!formData.validUpto.trim()) {
      newErrors.validUpto = 'Valid upto date is required'
    }

    if (!formData.issuedBy.trim()) {
      newErrors.issuedBy = 'Issued by is required'
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

  const handleChange = (field: keyof DriverFormData, value: string) => {
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
            Driver Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-600 dark:text-white ${
              errors.name ? 'border-red-500' : 'border-gray-300 dark:border-dark-600'
            }`}
            placeholder="Enter Driver Name"
            disabled={isLoading}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Father Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.fatherName}
            onChange={(e) => handleChange('fatherName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-600 dark:text-white ${
              errors.fatherName ? 'border-red-500' : 'border-gray-300 dark:border-dark-600'
            }`}
            placeholder="Enter Father Name"
            disabled={isLoading}
          />
          {errors.fatherName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fatherName}</p>
          )}
        </div>
      </div>

      {/* Second Row: 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            License Number<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.licenseNumber}
            onChange={(e) => handleChange('licenseNumber', e.target.value.toUpperCase())}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-600 dark:text-white ${
              errors.licenseNumber ? 'border-red-500' : 'border-gray-300 dark:border-dark-600'
            }`}
            placeholder="Enter license number"
            disabled={isLoading}
          />
          {errors.licenseNumber && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.licenseNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Valid Upto<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.validUpto}
            onChange={(e) => handleChange('validUpto', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-600 dark:text-white ${
              errors.validUpto ? 'border-red-500' : 'border-gray-300 dark:border-dark-600'
            }`}
            disabled={isLoading}
          />
          {errors.validUpto && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.validUpto}</p>
          )}
        </div>
      </div>

      {/* Third Row: 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Address<span className="text-red-500">*</span>
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
            Issued By<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.issuedBy}
            onChange={(e) => handleChange('issuedBy', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-600 dark:text-white ${
              errors.issuedBy ? 'border-red-500' : 'border-gray-300 dark:border-dark-600'
            }`}
            placeholder="Enter issuing authority"
            disabled={isLoading}
          />
          {errors.issuedBy && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.issuedBy}</p>
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
          {isLoading ? 'Saving...' : 'Save Driver'}
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

export default DriverForm
