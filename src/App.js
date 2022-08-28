import React from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
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
        <Route path='/course' element={<Course />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
    </>
  )
}
