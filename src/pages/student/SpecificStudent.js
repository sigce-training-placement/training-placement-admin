import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Layout'

const StudentProfile = () => {
  const { student } = useParams()
  return (
    <>
      <Layout title={"Student"}>
        {student}
      </Layout>
    </>
  )
}

export default StudentProfile