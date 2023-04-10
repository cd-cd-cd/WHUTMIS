import React from 'react'
import Login from '../../../components/Login'
import { adminLogin } from '../../../api/common/login'

export default function SuperLogin () {
  const title = '管理员端'
  return (
    <div>
      <Login title={title} loginApi={adminLogin}></Login>
    </div>
  )
}
