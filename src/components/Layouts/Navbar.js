import React from 'react'
import { BiUserCircle } from 'react-icons/bi';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/auth';
import {useUserStore} from './../../services/store';

export default function Navbar() {
  const userAuthenticated = useUserStore(state => state.userAuthenticated);
  const userDetails = useUserStore(state => state.userDetails);
  const updateAuthState = useUserStore(state => state.updateAuthState);
  const updateUserDetails = useUserStore(state => state.updateUserDetails);
  const navigate = useNavigate();

  const logoutHandler = async() => {
    let impactallToken = localStorage.getItem('impact_user');
    if (!impactallToken) {
      // toast.error('Something went wrong')
    }
    const res = await logoutUser(impactallToken);
    if(!res.status) {
      toast.error(res.message);
      return;
    }
    updateAuthState(false)
    updateUserDetails({})
    localStorage.removeItem('impact_user');
    return navigate(`/auth`)
  }

  return (
    <section className='flex p-4 bg-sky-700 text-white'>
      <div className='w-40'>
        <img src='https://app.impactall.co.in/80e027905d47f154e899fc4a28616cc8.png' />
      </div>
      <div className='flex-grow'></div>
      {userAuthenticated && <div className='userinfo'>
        <div className='flex items-center justify-center'>
          <p className='px-2 text-sm' >Hi, {userDetails.username}</p>
          <BiUserCircle className='' />
        </div>
        <div className='flex items-center justify-center py-1 mt-1 bg-red-600 text-white font-bold uppercase text-xs cursor-pointer' onClick={logoutHandler} >
          Logout
        </div>
      </div>}
    </section>
  )
}
