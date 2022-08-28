import React, { useState } from 'react'
import BodyLayout from '../components/Layouts/BodyLayout'
import Signin from '../components/Auth/Signin';
import Signup from '../components/Auth/Signup';

export default function Auth() {
  const [authState, setAuthState] = useState('signin');

  return (
    <BodyLayout>
      <div className='flex items-center justify-center h-full' >
        <div className='' >
          <div className='flex text-orange-500 justify-around border-b-2 border-orange-500 cursor-pointer'>
            <div onClick={() => setAuthState('signin')} className={`p-4 w-full text-lg items-center ${authState === 'signin' ? 'bg-sky-600' : ''}`} >Sign In</div>
            <div onClick={() => setAuthState('signup')} className={`p-4 w-full text-lg items-center ${authState === 'signin' ? '' : 'bg-sky-600'}`} >Sign Up</div>
          </div>
          <div className='p-4 bg-sky-600 w-96'>
            {authState == 'signin' ? <Signin /> : <Signup />}
          </div>
        </div>
      </div>
    </BodyLayout>
  )
}
