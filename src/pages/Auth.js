import React, { useState } from 'react'
import BodyLayout from '../components/BodyLayout'

export default function Auth() {
  const [authState, setAuthState] = useState('signin');

  function siginUi() {
    return (<>
      <div className='flex mb-3 items-end'>
        <label className=''>User Name</label>
        <span className='flex-grow'></span>
        <input className='bg-transparent outline-none text-lg border-b-2 border-white' />
      </div>
      <div className='flex mb-3 items-end'>
        <label className=''>Password</label>
        <span className='flex-grow'></span>
        <input className='bg-transparent outline-none text-lg border-b-2 border-white' />
      </div>
    </>)
  }

  function signupUi() {
    return (<>
      <div className='flex mb-3 items-end'>
        <label className=''>User Name</label>
        <span className='flex-grow'></span>
        <input className='bg-transparent outline-none text-lg border-b-2 border-white' />
      </div>
      <div className='flex mb-3 items-end'>
        <label className=''>Password</label>
        <span className='flex-grow'></span>
        <input className='bg-transparent outline-none text-lg border-b-2 border-white' />
      </div>
      <div className='flex mb-3 items-end'>
        <label className=''>License Start Date</label>
        <span className='flex-grow'></span>
        <input className='bg-transparent outline-none text-lg border-b-2 border-white' />
      </div>
      <div className='flex mb-3 items-end'>
        <label className=''>License End Date</label>
        <span className='flex-grow'></span>
        <input className='bg-transparent outline-none text-lg border-b-2 border-white' />
      </div>
    </>)
  }

  return (
    <BodyLayout>
      <div className='flex items-center justify-center h-full' >
        <div className='bg-sky-600 w-96' >
          <div className='flex p-4 text-orange-500 justify-around border-b-2 border-orange-500 cursor-pointer'>
            <div onClick={() => setAuthState('signin')} className='text-lg items-center' >Sign In</div>
            <div onClick={() => setAuthState('signup')} className='text-lg items-center' >Sign Up</div>
          </div>
          <div className='p-4'>
            {authState == 'signin' ? siginUi() : signupUi()}
            <div className='mx-4 mt-8 mb-4'>
              <button className='bg-orange-500 text-lg text-sky-600 w-full py-2 rounded-md font-bold'>{authState == 'signin' ? 'SignIn' : 'Signup'}</button>
            </div>
          </div>
        </div>
      </div>
    </BodyLayout>
  )
}
