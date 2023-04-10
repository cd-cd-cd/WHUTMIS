import React from 'react'
import Login from '../../components/Login'

export default function SuperLogin () {
  const title = '管理员端'
  return (
    <div>
      <Login title={title}></Login>
    </div>
  )
}
