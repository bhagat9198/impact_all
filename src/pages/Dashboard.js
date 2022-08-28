import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import BodyLayout from '../components/Layouts/BodyLayout'
import CourseCard from '../components/Miscellaneous/CourseCard'
import { getUserDetails } from '../services/auth';
import {useUserStore} from './../services/store';

export default function Dashboard() {
  const userAuthenticated = useUserStore(state => state.userAuthenticated);
  const userDetails = useUserStore(state => state.userDetails);
  const updateAuthState = useUserStore(state => state.updateAuthState);
  const updateUserDetails = useUserStore(state => state.updateUserDetails);
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

  return (
    <BodyLayout>
      <div className="grid grid-cols-3 gap-4 p-4">
        {userAuthenticated && userDetails?.courses.map(courseData => <CourseCard courseData={courseData} />)}
      </div>
    </BodyLayout>
  )
}
