import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BodyLayout from '../components/Layouts/BodyLayout'
import Signin from '../components/Auth/Signin';
import Signup from '../components/Auth/Signup';
import {useUserStore} from './../services/store';
import { getUserDetails } from '../services/auth';

export default function Auth() {
  const [authState, setAuthState] = useState('signin');
  // const [userAuthenticated, setUserAuthenticated] = useState(false);
  const navigate = useNavigate();
  const userAuthenticated = useUserStore(state => state.userAuthenticated);
  const updateAuthState = useUserStore(state => state.updateAuthState);
  const updateUserDetails = useUserStore(state => state.updateUserDetails);

  async function checkToken(token) {
    const res = await getUserDetails(token)
    if(res.status) {
      updateAuthState(true)
      updateUserDetails(res.data)
    }
  }

  useEffect(() => {
    let impactallToken = localStorage.getItem('impact_user');
    if (impactallToken) {
      checkToken(impactallToken)
    }
  }, [])
  
  if (userAuthenticated) {
    return navigate(`/dashboard`)
  }

  return (
    <BodyLayout>
      <div className='flex items-center justify-center h-full' >
        <div className='' >
          <div className='flex text-orange-500 justify-around border-b-2 border-orange-500 cursor-pointer'>
            <div onClick={() => setAuthState('signin')} className={`px-2 py-4 justify-center w-full text-lg items-center ${authState === 'signin' ? 'bg-sky-600' : ''}`} >Sign In</div>
            <div onClick={() => setAuthState('signup')} className={`px-2 py-4 justify-center w-full text-lg items-center ${authState === 'signin' ? '' : 'bg-sky-600'}`} >Sign Up/Add Course</div>
          </div>
          <div className='p-4 bg-sky-600 w-96'>
            {authState == 'signin' ? <Signin /> : <Signup />}
          </div>
        </div>
      </div>
    </BodyLayout>
  )
}
