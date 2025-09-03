'use client'

import React, { useState } from 'react'
import Layout from '@src/layout/Layout'
import {
  BrokerHeader,
  BrokerSearch,
  BrokerList,
  BrokerForm,
  BrokerEntryCard
} from './components'
import { Broker, BrokerFormData } from './types'

const BrokerEntryPage = () => {
  // Sample data for demonstration
  const [brokers, setBrokers] = useState<Broker[]>([
    {
      id: '1',
      name: 'ABC Brokerage',
      contactNumber: '+1 234-567-8900',
      email: 'info@abcbrokerage.com',
      address: '123 Main Street, New York, NY 10001',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      isActive: true
    },
    {
      id: '2',
      name: 'XYZ Trading',
      contactNumber: '+1 234-567-8901',
      email: 'contact@xyztrading.com',
      address: '456 Business Ave, Los Angeles, CA 90210',
      createdAt: new Date('2024-02-20'),
      updatedAt: new Date('2024-02-20'),
      isActive: true
    },
    {
      id: '3',
      name: 'Global Brokers',
      contactNumber: '+1 234-567-8902',
      email: 'support@globalbrokers.com',
      address: '789 Finance Blvd, Chicago, IL 60601',
      createdAt: new Date('2024-03-10'),
      updatedAt: new Date('2024-03-10'),
      isActive: false
    }
  ])

  const [filteredBrokers, setFilteredBrokers] = useState<Broker[]>(brokers)
  const [showForm, setShowForm] = useState(false)
  const [editingBroker, setEditingBroker] = useState<Broker | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredBrokers(brokers)
    } else {
      const filtered = brokers.filter(broker =>
        broker.name.toLowerCase().includes(query.toLowerCase()) ||
        broker.email.toLowerCase().includes(query.toLowerCase()) ||
        broker.contactNumber.includes(query)
      )
      setFilteredBrokers(filtered)
    }
  }

  const handleAddNew = () => {
    setEditingBroker(null)
    setShowForm(true)
  }

  const handleEdit = (broker: Broker) => {
    setEditingBroker(broker)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setBrokers(prev => prev.filter(broker => broker.id !== id))
    setFilteredBrokers(prev => prev.filter(broker => broker.id !== id))
  }

  const handleView = (broker: Broker) => {
    console.log('Viewing broker:', broker)
    // Implement view functionality
  }

  const handleFormSubmit = async (data: BrokerFormData) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (editingBroker) {
      // Update existing broker
      const updatedBroker: Broker = {
        ...editingBroker,
        ...data,
        updatedAt: new Date()
      }
      
      setBrokers(prev => prev.map(broker => 
        broker.id === editingBroker.id ? updatedBroker : broker
      ))
      setFilteredBrokers(prev => prev.map(broker => 
        broker.id === editingBroker.id ? updatedBroker : broker
      ))
    } else {
      // Add new broker
      const newBroker: Broker = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
      }
      
      setBrokers(prev => [...prev, newBroker])
      setFilteredBrokers(prev => [...prev, newBroker])
    }
    
    setIsLoading(false)
    setShowForm(false)
    setEditingBroker(null)
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingBroker(null)
  }

  return (
    <Layout breadcrumbTitle="Broker Entry">
      <div className="container mx-auto p-6">
        <BrokerEntryCard>
          {!showForm ? (
            <>
              {/* Header Component - Only show on main page */}
              <BrokerHeader
                title="Broker Management"
                subtitle="Manage and organize your broker information"
                onAddNew={handleAddNew}
                showAddButton={true}
              />

              {/* Search Component */}
              <div className="mb-6">
                <BrokerSearch
                  onSearch={handleSearch}
                  placeholder="Search brokers by name, email, or phone..."
                />
              </div>

              {/* List Component */}
              <BrokerList
                brokers={filteredBrokers}
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
                  {editingBroker ? 'Edit Broker' : 'Add New Broker'}
                </h2>
                <BrokerForm
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                  initialData={editingBroker ? {
                    name: editingBroker.name,
                    contactNumber: editingBroker.contactNumber,
                    email: editingBroker.email,
                    address: editingBroker.address
                  } : undefined}
                  isLoading={isLoading}
                />
              </div>
            </div>
          )}
        </BrokerEntryCard>
      </div>
    </Layout>
  )
}

export default BrokerEntryPage
