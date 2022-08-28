import React from 'react'
import Footer from './Footer';
import Navbar from './Navbar'

export default function BodyLayout(props) {
  const { children } = props;
  return (
    <section className='flex flex-col h-screen'>
      <Navbar />
      <section className='flex-grow bg-sky-900' >
        {children}
      </section>
      <Footer />
    </section>
  )
}
