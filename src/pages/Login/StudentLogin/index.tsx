import React from 'react'
import Login from '../../../components/Login'
import { studentLogin } from '../../../api/common/login'

export default function StudentLogin () {
  const title = '学生端'
  return (
    <div>
      <Login title={title} loginApi={studentLogin}></Login>
    </div>
  )
}
