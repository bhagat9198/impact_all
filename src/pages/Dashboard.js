import React from 'react'
import BodyLayout from '../components/BodyLayout'
import CourseCard from '../components/CourseCard'

export default function Dashboard() {
  return (
    <BodyLayout>
      <div class="grid grid-cols-3 gap-4 p-4">
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </BodyLayout>
  )
}
