import React from 'react'
import { AiFillStar } from 'react-icons/ai';

export default function Card(props) {
  const { modalHandler } = props;

  const clickHandler = () => {
    modalHandler(true)
  }

  return (
    <div className='rounded-lg flex justify-center items-center flex-grow h-36 w-full bg-purple-700 cursor-pointer' onClick={clickHandler}  >
      <AiFillStar className='text-6xl text-white ' />
    </div>
  )
}
