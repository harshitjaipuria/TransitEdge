'use client'

import Link from 'next/link'
import React from 'react'

const Footer = () => {
  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || 'Brand'

  return (
    <React.Fragment>
      <div className='main-footer'>
        <div className='w-full'>
          <div className='grid grid-cols-1 gap-5 justify-items-end'>
            <div className='justify-self-end text-right text-gray-500 dark:text-dark-500 ltr:lg:text-right rtl:lg:text-right'>
              <div>
                &copy; {new Date().getFullYear()}TransitEdge. Crafted by
                <Link href='https://www.linkedin.com/in/harshit-jaipuria/' className='font-semibold'>
                  {brandName}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Footer
