import React from 'react'
import { mainMenu } from '../../../libs/data'
import Home from '../../../components/Home'
import { mainLogout } from '../../../api/common/logout'

export default function MainHome () {
  return (
    <>
      <Home role={0} menuData={mainMenu} logoutApi={mainLogout}></Home>
    </>
  )
}
