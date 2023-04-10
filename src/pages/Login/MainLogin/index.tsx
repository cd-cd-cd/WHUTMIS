import React from 'react'
import Login from '../../../components/Login'
import { mainLogin } from '../../../api/common/login'
export default function AdminLogin () {
  const title = '主管理员端'
  const pushForm = () => {
    return <div></div>
  }
  return (
    <Login title={title} loginApi={mainLogin}></Login>
  )
}
