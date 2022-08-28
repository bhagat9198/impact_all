import React, { useState } from 'react'
import BodyLayout from '../components/BodyLayout'
import Card from '../components/Card'
import Modal from '../components/Modal';
import { AiFillStar } from 'react-icons/ai';

export default function Course() {
  const [isModalOpen, setModalOpen] = useState(false);

  const modalHandler = (val) => {
    console.log('Course :: modalHandler :: val :: ', val);
    setModalOpen(val)
  };
  console.log('Course :: isModalOpen :: ', isModalOpen);

  return (
    <BodyLayout >
      <div className="grid grid-cols-4 gap-4 p-4">
        <Card modalHandler={modalHandler} />
        <Card modalHandler={modalHandler} />
        <Card modalHandler={modalHandler} />
      </div>
      <Modal isModalOpen={isModalOpen} modalHandler={val => modalHandler(val)} >
        gfhfg
      </Modal>
    </BodyLayout >
  )
}
