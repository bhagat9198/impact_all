import React from 'react'
import { AiOutlineCopyrightCircle, AiFillGithub } from 'react-icons/ai';

export default function Footer() {
  return (
    <section className='bg-sky-700 flex px-2 py-4 text-white' >
      <div className='flex items-center justify-center'>
        <AiOutlineCopyrightCircle  className='text-3xl ' />
        <span className='px-2 text-xl'>
          2022
        </span>
      </div>
      <div className='flex-grow'></div>
      <div className='flex items-center justify-center'>
        <AiFillGithub className='text-3xl ' />
        <a href='https://github.com/bhagat9198/impact_all' className='px-2'>Source Code</a>
      </div>
    </section>
  )
}
