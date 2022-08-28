import React from 'react'
import { BiUserCircle } from 'react-icons/bi';

export default function Navbar() {
  return (
    <section className='flex p-4 bg-sky-700 text-white'>
      <div className='w-40'>
        <img src='https://app.impactall.co.in/80e027905d47f154e899fc4a28616cc8.png' />
      </div>
      <div className='flex-grow'></div>
      <div className='flex items-center justify-center'>
        <p className='px-2 text-xl' >Hi, Alex</p>
        <BiUserCircle className='text-3xl' />
      </div>
    </section>
  )
}
