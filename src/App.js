import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './pages/Auth';
import Course from './pages/Course';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';


export default function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/courses' element={<Course />} />
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </>
  )
}

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    return navigate(`/auth`)
  })

}