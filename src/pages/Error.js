import React from 'react'
import { useNavigate } from 'react-router-dom';

import BodyLayout from '../components/Layouts/BodyLayout'

export default function Error() {
  const navigate = useNavigate();

  const clickHandler = () => {
    return navigate('/auth');
  }

  return (
    <BodyLayout>
      <div className='flex flex-col justify-center items-center text-white text-2xl h-full'>
        <h2> 404 | Page Not Found </h2>
        <button className='my-10 p-2 px-4 rounded-lg bg-orange-500 ' onClick={clickHandler} >Go to Home Page</button>
      </div>
    </BodyLayout>
  )
}
