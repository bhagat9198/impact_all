import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function Modal(props) {
  const { isModalOpen, children, modalHandler } = props;

  return (
    <>
      {isModalOpen  && <div className='absolute  top-0 left-0 w-full h-screen flex justify-center items-center bg-orange-400 bg-opacity-60' >
      <div className={` bg-sky-700 p-4 text-white`} style={{minWidth: '50%', minHeight: '50%'}}>
        <div className='flex justify-end'>
          <AiOutlineCloseCircle onClick={() => modalHandler(false)} className='text-3xl cursor-pointer ' />
        </div>
        <div>
          {children}
        </div>
      </div>

    </div>}
    </>
  )
}
