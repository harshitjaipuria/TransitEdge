import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }: any) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const showingStart = (currentPage - 1) * itemsPerPage + 1
  const showingEnd = Math.min(currentPage * itemsPerPage, totalItems)

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const gotoPage = (page: number) => {
    onPageChange(page)
  }

  return (
    <div className='grid grid-cols-12 gap-5 mt-space mb-5'>
      {/* mb-5 added */}
      <div className='col-span-12 md:col-span-6'>
        <p className='text-gray-500 dark:text-dark-500'>
          Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of <b>{totalItems}</b> Results
        </p>
      </div>
      <div className='col-span-12 md:col-span-6'>
        <div className='flex justify-end pagination pagination-primary'>
          <button onClick={handlePrevPage} disabled={currentPage === 1} className='pagination-pre'>
            <ChevronLeft className='mr-1 ltr:inline-block rtl:hidden size-4'></ChevronLeft>
            <ChevronRight className='ml-1 ltr:hidden rtl:inline-block size-4'></ChevronRight>
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => gotoPage(index + 1)}
              className={`pagination-item ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className='pagination-next'
          >
            Next
            <ChevronRight className='ml-1 ltr:inline-block rtl:hidden size-4'></ChevronRight>
            <ChevronLeft className='mr-1 ltr:hidden rtl:inline-block size-4'></ChevronLeft>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pagination
