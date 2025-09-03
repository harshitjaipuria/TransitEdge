'use client'

import type { PropsWithChildren } from 'react'

function BrokerEntryCard({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-full bg-white dark:bg-dark-800 rounded-lg shadow-lg p-8">
      {children}
    </div>
  )
}

export default BrokerEntryCard
