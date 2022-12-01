import { useRouter } from 'next/router'
import React from 'react'

const StudentProfile = () => {
  const router = useRouter()
  const { student } = router.query
  return (
    <div className='text-5xl'>{student}</div>
  )
}

export default StudentProfile