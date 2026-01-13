import React from 'react'

const SkeletonCard = () => {
  return (
    <div className='border border-gray-100 rounded-lg bg-white overflow-hidden shadow-sm animate-pulse'>
      {/* Image Skeleton */}
      <div className='h-[195px] w-full bg-gray-200 relative'>
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
      </div>
      
      {/* Content Skeleton */}
      <div className='p-3'>
        <div className='h-3 bg-gray-200 rounded w-1/3 mb-2'></div>
        <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
        <div className='h-4 bg-gray-200 rounded w-1/2 mb-2'></div>
        <div className='h-5 bg-gray-200 rounded w-1/4 mt-2'></div>
      </div>
      
      {/* Button Skeleton */}
      <div className='p-3 pt-0'>
        <div className='h-9 bg-gray-200 rounded-lg w-full'></div>
      </div>
    </div>
  )
}

export default SkeletonCard
