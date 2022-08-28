import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BodyLayout from '../components/Layouts/BodyLayout'
import Card from '../components/Miscellaneous/Card'
import Modal from '../components/Miscellaneous/Modal';
import { getUserDetails } from '../services/auth';
import { useUserStore } from './../services/store';

export default function Course() {
  const [isModalOpen, setModalOpen] = useState(false);
  const updateAuthState = useUserStore(state => state.updateAuthState);
  const updateUserDetails = useUserStore(state => state.updateUserDetails);
  const userAuthenticated = useUserStore(state => state.userAuthenticated);
  const navigate = useNavigate();

  async function checkToken(token) {
    const res = await getUserDetails(token)
    if (res.status) {
      updateAuthState(true)
      updateUserDetails(res.data)
    }
  }

  useEffect(() => {
    if (userAuthenticated) return;

    let impactallToken = localStorage.getItem('impact_user');
    if (impactallToken) {
      checkToken(impactallToken)
    } else {
      navigate('/auth')
    }
  }, [])

  const modalHandler = (val) => {
    console.log('Course :: modalHandler :: val :: ', val);
    setModalOpen(val)
  };
  
  return (
    <BodyLayout >
      <div className="grid grid-cols-4 gap-4 p-4">
        <Card modalHandler={modalHandler} />
        <Card modalHandler={modalHandler} />
        <Card modalHandler={modalHandler} />
      </div>
      <Modal isModalOpen={isModalOpen} modalHandler={val => modalHandler(val)} >
        <div className="sketchfab-embed-wrapper h-full w-full" > <iframe className='h-full w-full h-96' title="Parts of a cell" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/cd9d5d3599204882a019bd10a0ab3f22/embed"> </iframe> <p > <a href="https://sketchfab.com/3d-models/parts-of-a-cell-cd9d5d3599204882a019bd10a0ab3f22?utm_medium=embed&utm_campaign=share-popup&utm_content=cd9d5d3599204882a019bd10a0ab3f22" target="_blank" > Parts of a cell </a> by <a href="https://sketchfab.com/Legatobach?utm_medium=embed&utm_campaign=share-popup&utm_content=cd9d5d3599204882a019bd10a0ab3f22" target="_blank" > Legatobach </a> on <a href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=cd9d5d3599204882a019bd10a0ab3f22" target="_blank" >Sketchfab</a></p></div>
        
      </Modal>
    </BodyLayout >
  )
}
