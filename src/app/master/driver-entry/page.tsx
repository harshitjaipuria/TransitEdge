'use client'

import React, { useState } from 'react'
import Layout from '@src/layout/Layout'
import {
  DriverHeader,
  DriverSearch,
  DriverList,
  DriverForm,
  DriverEntryCard
} from './components'
import { Driver, DriverFormData } from './types'

const DriverEntryPage = () => {
  // Sample data for demonstration
  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: '1',
      name: 'John Smith',
      contactNumber: '+91 9876543210',
      fatherName: 'Robert Smith',
      address: '123 Main Street, Mumbai, Maharashtra 400001',
      licenseNumber: 'DL1234567890',
      validUpto: '2025-12-31',
      issuedBy: 'RTO Mumbai',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      isActive: true
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      contactNumber: '+91 9876543211',
      fatherName: 'Suresh Kumar',
      address: '456 Business Ave, Delhi, Delhi 110001',
      licenseNumber: 'DL0987654321',
      validUpto: '2026-06-30',
      issuedBy: 'RTO Delhi',
      createdAt: new Date('2024-02-20'),
      updatedAt: new Date('2024-02-20'),
      isActive: true
    },
    {
      id: '3',
      name: 'Amit Patel',
      contactNumber: '+91 9876543212',
      fatherName: 'Rajesh Patel',
      address: '789 Finance Blvd, Bangalore, Karnataka 560001',
      licenseNumber: 'DL1122334455',
      validUpto: '2025-09-15',
      issuedBy: 'RTO Bangalore',
      createdAt: new Date('2024-03-10'),
      updatedAt: new Date('2024-03-10'),
      isActive: false
    }
  ])

  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>(drivers)
  const [showForm, setShowForm] = useState(false)
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredDrivers(drivers)
    } else {
      const filtered = drivers.filter(driver =>
        driver.name.toLowerCase().includes(query.toLowerCase()) ||
        driver.fatherName.toLowerCase().includes(query.toLowerCase()) ||
        driver.contactNumber.includes(query) ||
        driver.licenseNumber.toLowerCase().includes(query.toLowerCase()) ||
        driver.validUpto.includes(query) ||
        driver.issuedBy.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredDrivers(filtered)
    }
  }

  const handleAddNew = () => {
    setEditingDriver(null)
    setShowForm(true)
  }

  const handleEdit = (driver: Driver) => {
    setEditingDriver(driver)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setDrivers(prev => prev.filter(driver => driver.id !== id))
    setFilteredDrivers(prev => prev.filter(driver => driver.id !== id))
  }

  const handleView = (driver: Driver) => {
    console.log('Viewing driver:', driver)
    // Implement view functionality
  }

  const handleFormSubmit = async (data: DriverFormData) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (editingDriver) {
      // Update existing driver
      const updatedDriver: Driver = {
        ...editingDriver,
        ...data,
        updatedAt: new Date()
      }
      
      setDrivers(prev => prev.map(driver => 
        driver.id === editingDriver.id ? updatedDriver : driver
      ))
      setFilteredDrivers(prev => prev.map(driver => 
        driver.id === editingDriver.id ? updatedDriver : driver
      ))
    } else {
      // Add new driver
      const newDriver: Driver = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
      }
      
      setDrivers(prev => [...prev, newDriver])
      setFilteredDrivers(prev => [...prev, newDriver])
    }
    
    setIsLoading(false)
    setShowForm(false)
    setEditingDriver(null)
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingDriver(null)
  }

  return (
    <Layout breadcrumbTitle="Driver Entry">
      <div className="container mx-auto p-6">
        <DriverEntryCard>
          {!showForm ? (
            <>
              {/* Header Component - Only show on main page */}
              <DriverHeader
                title="Driver Management"
                subtitle="Manage and organize your driver information"
                onAddNew={handleAddNew}
                showAddButton={true}
              />

              {/* Search Component */}
              <div className="mb-6">
                <DriverSearch
                  onSearch={handleSearch}
                  placeholder="Search drivers by name, father name, phone, license, valid upto date, or issued by..."
                />
              </div>

              {/* List Component */}
              <DriverList
                drivers={filteredDrivers}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            </>
          ) : (
            /* Form Component */
            <div className="mx-auto">
              <div className="bg-gray-50 dark:bg-dark-700 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  {editingDriver ? 'Edit Driver' : 'Add New Driver'}
                </h2>
                <DriverForm
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                  initialData={editingDriver ? {
                    name: editingDriver.name,
                    contactNumber: editingDriver.contactNumber,
                    fatherName: editingDriver.fatherName,
                    address: editingDriver.address,
                    licenseNumber: editingDriver.licenseNumber,
                    validUpto: editingDriver.validUpto,
                    issuedBy: editingDriver.issuedBy
                  } : undefined}
                  isLoading={isLoading}
                />
              </div>
            </div>
          )}
        </DriverEntryCard>
      </div>
    </Layout>
  )
}

export default DriverEntryPage
