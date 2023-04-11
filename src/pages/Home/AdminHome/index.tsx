import React from 'react'
import Home from '../../../components/Home'
import { adminMenu } from '../../../libs/data'
import { adminLogout } from '../../../api/common/logout'

export default function MainHome () {
  return (
    <>
      <Home role={-1} menuData={adminMenu} logoutApi={adminLogout}></Home>
    </>
  )
}
