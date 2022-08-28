import React from 'react'

export default function CourseCard() {
  return (
    <div className='rounded-3xl border-2 border-orange-500 py-2 px-4 text-white' onClick={() => console.log('aa')}>
      <div className='flex justify-between uppercase font-bold py-2 items-center' >
        <div className=''>class vi</div>
        <div className='rounded-3xl  px-3 text-yellow-600 border-2 border-yellow-500'>gold</div>
      </div>
      <div className='flex justify-between py-2'>
        <div>Chemistry</div>
        <div>
          <span className='text-gray-500'>Subscription</span>
          <span className='font-semibold pl-2' >1 Year</span>
        </div>
      </div>
      <div className='my-2 border-x-4 border-l-white border-r-orange-500 flex h-5 items-center'>
        <div className='bg-gray-800 border-y-2 border-sky-700 h-3.5  relative w-full'  >
          <div className='absolute left-0 h-3.5 rounded-r-full' style={{ width: '25%', backgroundImage: 'linear-gradient(to right, #383CC1 , #1B98F5)', top: -2 }} >
          </div>
        </div>
      </div>
      <div className='flex justify-between py-2 mb-1'>
        <div className='justify-start'>
          <p className='text-gray-500'>Start Date</p>
          <p className='font-bold '>21 Hun 2022</p>
        </div>
        <div className='flex flex-col items-end' >
          <p className='text-gray-500'>Expiry Date</p>
          <p className='text-orange-500 font-bold '>21 Hun 2022</p>
        </div>
      </div>
    </div>
  )
}
